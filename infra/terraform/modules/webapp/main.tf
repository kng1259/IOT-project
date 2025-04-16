resource "azurerm_subnet" "backend" {
  name                            = var.container_app_name
  resource_group_name             = var.resource_group_name
  virtual_network_name            = var.virtual_network_name
  address_prefixes                = var.backend_address_prefixes
  default_outbound_access_enabled = false
}

resource "azurerm_network_security_group" "backend" {
  name                = var.container_app_name
  location            = var.location
  resource_group_name = var.resource_group_name
}

resource "azurerm_network_security_rule" "backend_https" {
  name                        = "https-inbound"
  priority                    = 110
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "443"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = var.resource_group_name
  network_security_group_name = azurerm_network_security_group.backend.name
}

resource "azurerm_network_security_rule" "backend_ssh" {
  name                        = "ssh-inbound"
  priority                    = 120
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = var.resource_group_name
  network_security_group_name = azurerm_network_security_group.backend.name
}


resource "azurerm_container_app_environment" "backend" {
  name                     = var.container_app_name
  location                 = var.location
  resource_group_name      = var.resource_group_name
  infrastructure_subnet_id = azurerm_subnet.backend.id
}

resource "random_password" "jwt_access_token" {
  length           = 32
  special          = true
  override_special = "!@#$%^&*()-_=+[]{}<>:?"
}

resource "azurerm_key_vault_secret" "jwt_access_token" {
  name         = "jwt-access-token"
  value        = base64encode(random_password.jwt_access_token.result)
  key_vault_id = var.key_vault_id
}

resource "random_password" "jwt_refresh_token" {
  length           = 32
  special          = true
  override_special = "!@#$%^&*()-_=+[]{}<>:?"
}

resource "azurerm_key_vault_secret" "jwt_refresh_token" {
  name         = "jwt-refresh-token"
  value        = base64encode(random_password.jwt_refresh_token.result)
  key_vault_id = var.key_vault_id
}


resource "azurerm_container_app" "backend" {
  name                         = var.container_app_name
  container_app_environment_id = azurerm_container_app_environment.backend.id
  resource_group_name          = var.resource_group_name
  revision_mode                = "Single"
  template {
    max_replicas = 2
    min_replicas = 1
    init_container {
      name   = "backend-init"
      cpu    = 0.25
      memory = "0.5Gi"
      image  = var.init_image_url
      env {
        name        = "DATABASE_URL"
        secret_name = "database-url"
      }
    }
    container {
      name   = "backend"
      cpu    = 0.5
      memory = "1Gi"
      image  = var.image_url
      env {
        name  = "NODE_ENV"
        value = "production"
      }
      env {
        name        = "DATABASE_URL"
        secret_name = "database-url"
      }
      env {
        name  = "PORT"
        value = "8080"
      }
      env {
        name  = "WHITELIST_DOMAINS"
        value = "\"https://${azurerm_static_web_app.frontend.default_host_name},\""
      }
      env {
        name        = "ACCESS_TOKEN_PRIVATE_KEY"
        secret_name = "jwt-access-token"
      }
      env {
        name        = "REFRESH_TOKEN_PRIVATE_KEY"
        secret_name = "jwt-refresh-token"
      }
      env {
        name = "IOT_HUB_CONNECTION_STRING"
        secret_name = "iothub-connection-string"
      }
      env {
        name = "EVENT_HUB_CONNECTION_STRING"
        secret_name = "eventhub-connection-string"
      }
      env {
        name = "EVENT_HUB_NAME"
        value = var.event_hub_name
      }
    }
  }

  ingress {
    external_enabled           = true
    allow_insecure_connections = var.app_allow_http
    target_port                = 8080
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  secret {
    name                = "database-url"
    identity            = "System"
    key_vault_secret_id = var.db_url_secret_id
  }

  secret {
    name                = "jwt-access-token"
    identity            = "System"
    key_vault_secret_id = azurerm_key_vault_secret.jwt_access_token.id
  }

  secret {
    name                = "jwt-refresh-token"
    identity            = "System"
    key_vault_secret_id = azurerm_key_vault_secret.jwt_refresh_token.id
  }

  secret {
    name = "iothub-connection-string"   
    identity = "System"
    key_vault_secret_id = var.iothub_constring_secret_id
  }

  secret {
    name = "eventhub-connection-string"   
    identity = "System"
    key_vault_secret_id = var.eventhub_constring_secret_id
  }

  identity {
    type = "SystemAssigned"
  }
}

resource "azurerm_role_assignment" "container_app" {
  scope                = var.key_vault_id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_container_app.backend.identity[0].principal_id
}

locals {
  backend_latest_revision_https_url = "https://${azurerm_container_app.backend.latest_revision_fqdn}"
  backend_latest_revision_http_url  = "http://${azurerm_container_app.backend.latest_revision_fqdn}"
}

resource "azurerm_static_web_app" "frontend" {
  name                = var.static_web_app_name
  location            = var.frontend_location
  resource_group_name = var.resource_group_name

  sku_size = "Standard"
  sku_tier = "Standard"

}

resource "azapi_resource" "linked_backend" {
  type      = "Microsoft.Web/staticSites/linkedBackends@2024-04-01"
  name      = "linkedBackend"
  parent_id = azurerm_static_web_app.frontend.id
  body = {
    properties = {
      backendResourceId = azurerm_container_app.backend.id
      region            = var.location
    }
  }
}
