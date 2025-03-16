variable "resource_group_name" {
}

variable "location" {
  default = "South East Asia"
}

variable "random_suffix" {
  default = "lola"
}

variable "key_vault_id" {
  description = "The ID of the Key Vault to store the connection string"
}
