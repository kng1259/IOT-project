variable "postgres_subnet_address_prefix" {
  description = "The address prefix for the PostgreSQL Server subnet."
}

variable "iot_to_db_subnet_address_prefix" {
  description = "The address prefix for the PostgreSQL Server subnet."
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
  default     = "lola"
}

variable "resource_group_name" {
  description = "The name of the resource group in which to create the PostgreSQL Server."
}

variable "location" {
  description = "The location of the resource group in which to create the PostgreSQL Server."
}

variable "function_location" {
  description = "The location of the resource group in which to create the Storage Account."
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

variable "key_vault_name" {
  description = "The name of the Key Vault in which to store the PostgreSQL Server connection string."
}

variable "iothub_eventhub_connection_string_secret_name" {
  description = "The name of the Key Vault secret containing the IoT Hub Event Hub connection string."
}
