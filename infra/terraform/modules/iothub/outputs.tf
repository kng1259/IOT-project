output "service_primary_connection_string" {
  value     = azurerm_iothub_shared_access_policy.service_access.primary_connection_string
  sensitive = true
}

output "device_primary_connection_string" {
  value     = azurerm_iothub_shared_access_policy.device_access.primary_connection_string
  sensitive = true
}

output "device_provisioning_host_name" {
  value = azurerm_iothub_dps.main.device_provisioning_host_name
}

output "dps_id_scope" {
  value = azurerm_iothub_dps.main.id_scope
}

output "group_sym_key" {
  value = local.group_sym_key
}

output "iothub_connection_string_secret_id" {
  value = azurerm_key_vault_secret.iothub_connection_string.id
}

output "iothub_eventhub_connection_string_secret_id" {
  value = azurerm_key_vault_secret.iothub_eventhub_connection_string.id
}