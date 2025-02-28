variable "postgres_subnet_address_prefix" {
  description = "The address prefix for the PostgreSQL Server subnet."
  default     = ["10.0.1.0/24"]
}

variable "pg_admin_login" {
  description = "The administrator login for the PostgreSQL Server."
  default     = "dbadmin"
}

variable "pg_admin_password" {
  description = "The administrator password for the PostgreSQL Server."
  default     = "P@ssw0rd"
}

variable "random_suffix" {
  description = "A random suffix to append to the PostgreSQL Server name."
  default     = "meomeo"
}

variable "resource_group_name" {
  description = "The name of the resource group in which to create the PostgreSQL Server."
}

variable "location" {
  description = "The location of the resource group in which to create the PostgreSQL Server."
}

variable "ssl" {
  description = "The SSL enforcement setting for the PostgreSQL Server."
  default     = "on"
}

variable "virtual_network_id" {
  description = "The ID of the virtual network in which to create the PostgreSQL Server."
}

variable "virtual_network_name" {
  description = "The name of the virtual network in which to create the PostgreSQL Server."
}

variable "key_vault_id" {
  description = "The ID of the Key Vault in which to store the PostgreSQL Server connection string."
}

variable "iot_hub_connection_string" {
  description = "The connection string for the IoT Hub."
}
