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

resource "azurerm_network_security_rule" "backend" {
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

resource "azurerm_container_app" "backend" {
  name                         = var.container_app_name
  container_app_environment_id = azurerm_container_app_environment.backend.id
  resource_group_name          = var.resource_group_name
  revision_mode                = "Single"
  template {
    max_replicas = 2
    min_replicas = 1
    container {
      name   = "quickstart"
      cpu    = 0.5
      memory = "1Gi"
      image  = "mcr.microsoft.com/k8se/quickstart:latest"
      env {
        name        = "DATABASE_URL"
        secret_name = "database-url"
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
  body = jsonencode({
    properties = {
      backendResourceId = azurerm_container_app.backend.id
      region            = var.location
    }
  })
}
