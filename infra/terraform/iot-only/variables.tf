variable "resource_group_name" {
  description = "The name of the resource group."
  default     = "iot-only-rg"
}

variable "location" {
  description = "The location for the resource group."
  default     = "South East Asia"
}

variable "vnet_address_space" {
  description = "The address space for the virtual network."
  default     = ["10.0.0.0/16"]
}

variable "postgres_subnet_address_prefix" {
  description = "The address prefix for the PostgreSQL subnet."
  default     = ["10.0.0.0/24"]
}

variable "iot_to_db_subnet_address_prefix" {
  description = "The address prefix for the IoT to DB subnet."
  default     = ["10.0.1.0/24"]
}

variable "subscription_id" {
  description = "The subscription ID."
  sensitive   = true
}
