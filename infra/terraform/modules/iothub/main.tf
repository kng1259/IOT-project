# Create IoT Hub
resource "azurerm_iothub" "main" {
  name                = "iot-hub-${var.random_suffix}"
  resource_group_name = var.resource_group_name
  location            = var.location

  event_hub_partition_count = 2

  sku {
    name     = "F1"
    capacity = 1
  }
}

resource "azurerm_iothub_shared_access_policy" "service_access" {
  name                = "service_access"
  resource_group_name = var.resource_group_name
  iothub_name         = azurerm_iothub.main.name

  service_connect = true
  registry_read   = true
  registry_write  = true
}

resource "azurerm_iothub_shared_access_policy" "device_access" {
  name                = "device_access"
  resource_group_name = var.resource_group_name
  iothub_name         = azurerm_iothub.main.name

  device_connect = true
}

resource "azurerm_key_vault_secret" "iothub_eventhub_connection_string" {
  key_vault_id = var.key_vault_id
  name         = "iothub-eventhub-connection-string"
  value        = "Endpoint=${azurerm_iothub.main.event_hub_events_endpoint};SharedAccessKeyName=${azurerm_iothub_shared_access_policy.service_access.name};SharedAccessKey=${azurerm_iothub_shared_access_policy.service_access.primary_key};EntityPath=${azurerm_iothub.main.event_hub_events_path}"
}

resource "azurerm_iothub_dps" "main" {
  name                = "iot-dps-${var.random_suffix}"
  resource_group_name = var.resource_group_name
  location            = var.location

  sku {
    name     = "S1"
    capacity = 1
  }

  linked_hub {
    connection_string       = azurerm_iothub_shared_access_policy.service_access.primary_connection_string
    location                = var.location
    apply_allocation_policy = true
  }
}

resource "azurerm_iothub_dps_certificate" "main" {
  name                = "main-cert"
  resource_group_name = var.resource_group_name
  iot_dps_name        = azurerm_iothub_dps.main.name

  certificate_content = filebase64("keys/cert.crt")
}

resource "null_resource" "create_new_enrollment_group" {
  provisioner "local-exec" {
    command = <<EOT
      az iot dps enrollment-group create \
        --dps-name ${azurerm_iothub_dps.main.name}\
        --resource-group ${var.resource_group_name}\
        --enrollment-id "main_eg" \
        --provisioning-status "enabled" \
        | jq -r '.attestation.symmetricKey.primaryKey' > keys/enrollment_group_sym.key
    EOT
  }
  depends_on = [azurerm_iothub_dps.main]
}

locals {
  group_sym_key = trimspace(file("keys/enrollment_group_sym.key"))
  depends_on    = [null_resource.create_new_enrollment_group]
}
