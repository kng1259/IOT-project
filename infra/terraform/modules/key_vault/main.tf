data "azurerm_client_config" "current" {}

resource "azurerm_role_assignment" "user_kv_admin" {
  scope                = var.resource_group_id
  role_definition_name = "Key Vault Administrator"
  principal_id         = data.azurerm_client_config.current.object_id
}

resource "azurerm_role_assignment" "user_kv_secrets_officer" {
  scope                = var.resource_group_id
  role_definition_name = "Key Vault Secrets Officer"
  principal_id         = data.azurerm_client_config.current.object_id
}

resource "azurerm_role_assignment" "user_secrets_user" {
  scope                = var.resource_group_id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = data.azurerm_client_config.current.object_id
}

resource "azurerm_role_assignment" "user_kv_purge_operator" {
  scope                = var.resource_group_id
  role_definition_name = "Key Vault Purge Operator"
  principal_id         = data.azurerm_client_config.current.object_id
}

resource "azurerm_key_vault" "main_kv" {
  name                            = "kv-${var.random_suffix}"
  resource_group_name             = var.resource_group_name
  location                        = var.location
  tenant_id                       = data.azurerm_client_config.current.tenant_id
  sku_name                        = "standard"
  enabled_for_deployment          = true
  enabled_for_template_deployment = true
  enable_rbac_authorization       = true
  purge_protection_enabled        = false

  depends_on = [
    azurerm_role_assignment.user_kv_admin,
    azurerm_role_assignment.user_kv_secrets_officer,
    azurerm_role_assignment.user_secrets_user,
    azurerm_role_assignment.user_kv_purge_operator
  ]
}
