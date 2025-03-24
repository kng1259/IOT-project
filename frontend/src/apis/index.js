import axiosInstance from '~/utils/axiosConfig'
import { env } from '~/utils/environment'

export const refreshTokenAPI = async () => {
    const response = await axiosInstance.get(`${env.API_ROOT}/api/v1/user/refresh-token`)
    return response.data
}

export const registerUserAPI = async (data) => {
    const response = await axiosInstance.post(`${env.API_ROOT}/api/v1/user/register`, data)
    return response.data
}

export const testAPI = async () => {
    const response = await axiosInstance.get(`${env.API_ROOT}/api/v1`)
    return response.data
}

export const fetchListFarmsAPI = async (userId) => {
    const response = await axiosInstance.get(`${env.API_ROOT}/api/v1/farms?userId=${userId}`)
    return response.data
}

export const fetchListAreasAPI = async (farmId) => {
    const response = await axiosInstance.get(`${env.API_ROOT}/api/v1/areas?farmId=${farmId}`)
    return response.data
}

export const fetchLatestRecordOfAreaPI = async (areaId) => {
    const response = await axiosInstance.get(`${env.API_ROOT}/api/v1/records/latest?areaId=${areaId}`)
    return response.data
}

export const fetchChartData = async (areaId) => {
    const response = await axiosInstance.get(`${env.API_ROOT}/api/v1/records/chart-data?areaId=${areaId}`)
    return response.data
}
