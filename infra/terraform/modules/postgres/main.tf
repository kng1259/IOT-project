resource "azurerm_subnet" "postgres" {
  name                            = "postgres-subnet"
  resource_group_name             = var.resource_group_name
  virtual_network_name            = var.virtual_network_name
  address_prefixes                = var.postgres_subnet_address_prefix
  default_outbound_access_enabled = false
  delegation {
    name = "PostgresDelegation"
    service_delegation {
      name = "Microsoft.DBforPostgreSQL/flexibleServers"
    }
  }
}

resource "azurerm_private_dns_zone" "postgres" {
  name                = "privatelink.postgres.database.azure.com"
  resource_group_name = var.resource_group_name
}

resource "azurerm_private_dns_zone_virtual_network_link" "main" {
  name                  = "dns-vnet-link"
  resource_group_name   = var.resource_group_name
  private_dns_zone_name = azurerm_private_dns_zone.postgres.name
  virtual_network_id    = var.virtual_network_id
}

resource "azurerm_postgresql_flexible_server" "main" {
  name                = "psql-server-${var.random_suffix}"
  resource_group_name = var.resource_group_name
  location            = var.location

  sku_name = "B_Standard_B1ms"

  storage_mb = 32768

  administrator_login    = var.pg_admin_login
  administrator_password = var.pg_admin_password
  version                = "16"
  delegated_subnet_id    = azurerm_subnet.postgres.id
  private_dns_zone_id    = azurerm_private_dns_zone.postgres.id

  public_network_access_enabled = false

  lifecycle {
    ignore_changes = [zone, high_availability[0].standby_availability_zone]
  }
}

resource "azurerm_postgresql_flexible_server_configuration" "postgres" {
  name      = "require_secure_transport"
  server_id = azurerm_postgresql_flexible_server.main.id
  value     = var.ssl
}

resource "azurerm_key_vault_secret" "postgres_connection_string" {
  name         = "postgres-connection-string"
  key_vault_id = var.key_vault_id
  value        = "postgresql://${azurerm_postgresql_flexible_server.main.administrator_login}:${azurerm_postgresql_flexible_server.main.administrator_password}@${azurerm_postgresql_flexible_server.main.fqdn}:5432/mobiledev?schema=public"
}

resource "azurerm_subnet" "iot_to_db" {
  name                            = "iot-to-db-subnet"
  resource_group_name             = var.resource_group_name
  virtual_network_name            = var.virtual_network_name
  address_prefixes                = var.iot_to_db_subnet_address_prefix
  default_outbound_access_enabled = true

  delegation {
    name = "IotToDbDelegation"
    service_delegation {
      name = "Microsoft.App/environments"
    }
  }
}

resource "azurerm_role_assignment" "subnet_contributor" {
  scope                = azurerm_subnet.iot_to_db.id
  role_definition_name = "Network Contributor"
  principal_id         = data.azurerm_client_config.current.object_id
}


resource "azurerm_storage_account" "iot_to_db_func" {
  name                          = "iottodb${var.random_suffix}"
  resource_group_name           = var.resource_group_name
  location                      = var.location
  account_kind                  = "StorageV2"
  account_tier                  = "Standard"
  account_replication_type      = "LRS"
  access_tier                   = "Hot"
  public_network_access_enabled = false
}

data "azurerm_client_config" "current" {}

resource "azurerm_storage_container" "iot_to_db_func" {
  name                  = "iot-to-db"
  storage_account_id    = azurerm_storage_account.iot_to_db_func.id
  container_access_type = "private"
}

resource "azurerm_role_assignment" "storage_account_contributor" {
  scope                = azurerm_storage_account.iot_to_db_func.id
  role_definition_name = "Contributor"
  principal_id         = data.azurerm_client_config.current.object_id
}

resource "azurerm_role_assignment" "storage_container_contributor" {
  scope                = azurerm_storage_container.iot_to_db_func.id
  role_definition_name = "Contributor"
  principal_id         = data.azurerm_client_config.current.object_id
}

resource "azurerm_service_plan" "iot_to_db" {
  name                = "iot-to-db"
  resource_group_name = var.resource_group_name
  location            = var.function_location
  os_type             = "Linux"
  sku_name            = "FC1"
}

resource "azurerm_function_app_flex_consumption" "iot_to_db" {
  name                = "iot-to-db-${var.random_suffix}"
  resource_group_name = var.resource_group_name
  location            = var.function_location
  service_plan_id     = azurerm_service_plan.iot_to_db.id

  storage_container_type      = "blobContainer"
  storage_container_endpoint  = azurerm_storage_container.iot_to_db_func.id
  storage_authentication_type = "StorageAccountConnectionString"
  storage_access_key          = azurerm_storage_account.iot_to_db_func.primary_access_key

  runtime_name           = "python"
  runtime_version        = "3.11"
  maximum_instance_count = 40
  instance_memory_in_mb  = 2048
  # virtual_network_subnet_id = azurerm_subnet.iot_to_db.id

  site_config {}

  app_settings = {
    "IOT_HUB_CONECTION_STRING" = var.iot_hub_connection_string
    "DATABASE_URL"             = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=${azurerm_key_vault_secret.postgres_connection_string.name})"
  }

  identity {
    type = "SystemAssigned"
  }
}

// Integrate using az cli because direct integration got timeout
resource "null_resource" "function_vnet_integration" {
  provisioner "local-exec" {
    command = <<EOT
      az functionapp vnet-integration add \
        --name "${azurerm_function_app_flex_consumption.iot_to_db.name}" \
        --resource-group "${var.resource_group_name}" \
        --vnet "${var.virtual_network_name}" \
        --subnet "${azurerm_subnet.iot_to_db.name}" \
        > log
    EOT
  }
}

resource "azurerm_role_assignment" "secrets_user" {
  scope                = var.key_vault_id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_function_app_flex_consumption.iot_to_db.identity[0].principal_id
}
