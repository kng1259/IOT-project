variable "resource_group_name" {
  description = "The name of the resource group in which the key vault will be created."
  type        = string
}

variable "location" {
  description = "The location/region where the key vault will be created."
  type        = string
}

variable "random_suffix" {
  description = "A random suffix to append to the key vault name."
  type        = string
}
