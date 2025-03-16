variable "resource_group_name" {
  description = "The name of the resource group."
  default     = "dev-rg"
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

variable "backend_address_prefixes" {
  description = "The address prefixes for the backend subnet."
  default     = ["10.0.2.0/23"]
}

variable "image_url" {
  description = "The URL for the container image."
  default     = "mcr.microsoft.com/k8se/quickstart:latest"
}

variable "init_image_url" {
  description = "The URL for the init container image."
  default     = "mcr.microsoft.com/k8se/quickstart:latest"
}

variable "app_allow_http" {
  description = "Allow HTTP traffic to the app."
  default     = false
}

variable "subscription_id" {
  description = "The subscription ID."
  sensitive   = true
}
