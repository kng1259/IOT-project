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
  location            = var.resource_group_location

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

resource "azurerm_storage_account" "iot_to_db_func" {
  name                     = "iot-to-db-${var.random_suffix}"
  resource_group_name      = var.resource_group_name
  location                 = var.resource_group_location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  access_tier              = "Hot"
}

resource "azurerm_linux_function_app" "iot_to_db" {
  name                = "iot-to-db-${var.random_suffix}"
  resource_group_name = var.resource_group_name
  location            = var.resource_group_location

  service_plan_id = ""
  storage_account {
    name         = "funcappstorage"
    account_name = azurerm_storage_account.iot_to_db_func.name
    type         = "AzureFiles"
    share_name   = "iot-to-db-files"
    access_key   = azurerm_storage_account.iot_to_db_func.primary_access_key
  }
  app_settings = {
    "IOT_HUB_CONECTION_STRING" = var.iot_hub_connection_string
    "DATABASE_URL"             = azurerm_key_vault_secret.postgres_connection_string.id
  }
  site_config {
    app_scale_limit = 3
    application_stack {
      python_version = 3.12
    }
  }
}
