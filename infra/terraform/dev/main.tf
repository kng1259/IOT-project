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

module "key_vault" {
  source              = "../modules/key_vault"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  random_suffix       = random_pet.main.id
}

module "iothub" {
  source              = "../modules/iothub"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  iothub_name         = "iot-hub-${random_pet.main.id}"
  dps_name            = "dps-${random_pet.main.id}"
}

module "postgres" {
  source                         = "../modules/postgres"
  resource_group_name            = azurerm_resource_group.main.name
  location                       = azurerm_resource_group.main.location
  function_location              = azurerm_resource_group.main.location
  iot_hub_connection_string      = module.iothub.service_primary_connection_string
  virtual_network_name           = azurerm_virtual_network.main.name
  virtual_network_id             = azurerm_virtual_network.main.id
  postgres_subnet_address_prefix = var.postgres_subnet_address_prefix
  key_vault_id                   = module.key_vault.key_vault_id
  key_vault_name                 = module.key_vault.key_vault_name
}

module "webapp" {
  source                   = "../modules/webapp"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  virtual_network_name     = azurerm_virtual_network.main.name
  container_app_name       = "container-app-${random_pet.main.id}"
  image_url                = var.image_url
  app_allow_http           = var.app_allow_http
  db_url_secret_id         = module.postgres.postgres_url_secret_id
  backend_address_prefixes = var.backend_address_prefixes
  key_vault_id             = module.key_vault.key_vault_id
}
