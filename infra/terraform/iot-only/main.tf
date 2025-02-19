resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}

resource "random_pet" "main" {
  length    = 2
  separator = "-"

}

module "iothub" {
  source              = "../modules/iothub"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  iothub_name         = "iot-hub-${random_pet.main.id}"
  dps_name            = "dps-${random_pet.main.id}"
}
