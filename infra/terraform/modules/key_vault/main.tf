data "azurerm_client_config" "current" {}

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
}

resource "azurerm_role_assignment" "user_kv_admin" {
  scope                = azurerm_key_vault.main_kv.id
  role_definition_name = "Key Vault Administrator"
  principal_id         = data.azurerm_client_config.current.object_id
}

resource "azurerm_role_assignment" "user_kv_secrets_officer" {
  scope                = azurerm_key_vault.main_kv.id
  role_definition_name = "Key Vault Secrets Officer"
  principal_id         = data.azurerm_client_config.current.object_id
}

resource "azurerm_role_assignment" "user_kv_purge_operator" {
  scope                = azurerm_key_vault.main_kv.id
  role_definition_name = "Key Vault Purge Operator"
  principal_id         = data.azurerm_client_config.current.object_id
}
