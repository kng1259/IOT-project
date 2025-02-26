output "postgres_fqdn" {
  description = "Value of the postgres fqdn"
  value       = azurerm_postgresql_flexible_server.main.fqdn
}

output "postgres_username" {
  description = "Value of the postgres username"
  value       = azurerm_postgresql_flexible_server.main.administrator_login
  sensitive   = true
}

output "postgres_password" {
  description = "Value of the postgres password"
  value       = azurerm_postgresql_flexible_server.main.administrator_password
  sensitive   = true
}

output "postgres_subnet_id" {
  description = "Value of the postgres subnet id"
  value       = azurerm_subnet.postgres.id
}

output "postgres_private_dns_zone_id" {
  description = "Value of the postgres private dns zone id"
  value       = azurerm_private_dns_zone.postgres.id
}
