variable "location" {
  description = "The location/region where the resources will be created."
  type        = string
}

variable "resource_group_name" {
  description = "The name of the resource group in which the resources will be created."
  type        = string
}

variable "virtual_network_name" {
  description = "The name of the virtual network."
  type        = string
}

variable "backend_address_prefixes" {
  description = "The address prefixes of the backend subnet."
  type        = list(string)
}

variable "container_app_name" {
  description = "The name of the container app."
  type        = string
  default     = "backend"
}

variable "image_url" {
  description = "The URL of the container image."
  type        = string
}

variable "app_allow_http" {
  description = "Whether HTTP traffic is allowed."
  type        = bool
  default     = false
}

variable "key_vault_secret_id" {
  description = "The ID of the Key Vault secret."
  type        = string
}

variable "static_web_app_name" {
  description = "The name of the static web app."
  type        = string
  default     = "frontend"
}
