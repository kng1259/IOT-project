import axiosInstance from '~/utils/axiosConfig'
import { API_ROOT } from '~/utils/constants'

export const refreshTokenAPI = async () => {
  const response = await axiosInstance.get(`${API_ROOT}/api/v1/user/refresh-token`)
  return response.data
}