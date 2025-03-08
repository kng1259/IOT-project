output "dps_id_scope" {
  value     = module.iothub.dps_id_scope
  sensitive = true
}

output "dps_enrollment_group_sym_key" {
  value     = module.iothub.group_sym_key
  sensitive = true
}
