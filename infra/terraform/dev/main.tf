resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}

resource "random_pet" "main" {
  length    = 2
  separator = "-"
}

resource "azurerm_virtual_network" "main" {
  name                = "vnet-${random_pet.main.id}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  address_space       = var.vnet_address_space
}

data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "main_kv" {
  name                            = "kv-${random_pet.main.id}"
  resource_group_name             = azurerm_resource_group.main.name
  location                        = azurerm_resource_group.main.location
  tenant_id                       = data.azurerm_client_config.current.tenant_id
  sku_name                        = "standard"
  enabled_for_disk_encryption     = true
  enabled_for_deployment          = true
  enabled_for_template_deployment = true
  purge_protection_enabled        = false
}

resource "azurerm_role_assignment" "user_kv_admin" {
  scope                = azurerm_key_vault.main_kv.id
  role_definition_name = "Key Vault Administrator"
  principal_id         = data.azurerm_client_config.current.object_id
}

resource "azurerm_role_assignment" "user_kv_secrets_officer" {
  scope                = azurerm_key_vault.main_kv.id
  role_definition_name = "Key Vault Secrets Officer"
  principal_id         = data.azurerm_client_config.current.object_id
}

module "iothub" {
  source              = "../modules/iothub"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  iothub_name         = "iot-hub-${random_pet.main.id}"
  dps_name            = "dps-${random_pet.main.id}"
}

# module "postgres" {
#   source                         = "../modules/postgres"
#   resource_group_name            = azurerm_resource_group.main.name
#   location                       = azurerm_resource_group.main.location
#   iot_hub_connection_string      = module.iothub.service_primary_connection_string
#   virtual_network_name           = azurerm_virtual_network.main.name
#   virtual_network_id             = azurerm_virtual_network.main.id
#   postgres_subnet_address_prefix = var.postgres_subnet_address_prefix
#   key_vault_id                   = azurerm_key_vault.main_kv.id
# }

module "webapp" {
  source                   = "../modules/webapp"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  virtual_network_name     = azurerm_virtual_network.main.name
  container_app_name       = "container-app-${random_pet.main.id}"
  image_url                = var.image_url
  app_allow_http           = var.app_allow_http
  key_vault_secret_id      = azurerm_key_vault.main_kv.id
  backend_address_prefixes = var.backend_address_prefixes
}
