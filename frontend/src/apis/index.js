import axiosInstance from '~/utils/axiosConfig'
import { API_ROOT } from '~/utils/constants'

export const refreshTokenAPI = async () => {
  const response = await axiosInstance.get(`${API_ROOT}/api/v1/user/refresh-token`)
  return response.data
}

export const registerUserAPI = async (data) => {
  const response = await axiosInstance.post(`${API_ROOT}/api/v1/user/register`, data)
  return response.data
}

export const testAPI = async () => {
  const response = await axiosInstance.get(`${API_ROOT}/api/v1`)
  return response.data
}