export const filterFieldsUser = (user) => {
  if (!user) return {}
  return {
    user_id: user.user_id,
    email: user.email,
    username: user.username,
    phone_number: user.phone_number,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at
  }
}