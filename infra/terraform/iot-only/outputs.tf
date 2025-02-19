output "device_primary_connection_string" {
  value = module.iothub.device_primary_connection_string
  sensitive = true
}

output "device_provisioning_host_name" {
  value = module.iothub.device_provisioning_host_name
}

output "dps_id_scope" {
  value = module.iothub.dps_id_scope
}