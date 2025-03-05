import pkg from 'lodash'
const pick = pkg

export const filterFieldsUser = (user) => {
  if (!user) return {}
  return pick(user, ['user_id', 'email', 'username', 'phone_number', 'role', 'created_at', 'updated_at'])
}