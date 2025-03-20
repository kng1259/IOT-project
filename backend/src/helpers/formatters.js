export const filterFieldsUser = (user) => {
  if (!user) return {}
  return {
    user_id: user.id,
    fullName: user.fullName,         
    username: user.username,         
    email: user.email,               
    phone_number: user.phone_number, 
    farms: user.farms ?? [], 
  }
}