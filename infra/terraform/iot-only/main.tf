resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}

resource "random_pet" "main" {
  length    = 2
  separator = "-"

}

resource "azurerm_virtual_network" "main" {
  name                = "vnet-lola"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  address_space       = var.vnet_address_space
}

data "azurerm_client_config" "current" {}

resource "azurerm_role_assignment" "contributor" {
  scope                = azurerm_resource_group.main.id
  role_definition_name = "Contributor"
  principal_id         = data.azurerm_client_config.current.object_id
}

module "key_vault" {
  source              = "../modules/key_vault"
  resource_group_name = azurerm_resource_group.main.name
  resource_group_id   = azurerm_resource_group.main.id
  location            = azurerm_resource_group.main.location
  random_suffix       = random_pet.main.id
}

module "iothub" {
  source              = "../modules/iothub"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  key_vault_id        = module.key_vault.key_vault_id
}
