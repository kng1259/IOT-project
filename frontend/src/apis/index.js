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

export const toggleDeviceAPI = async (data) => {
    const response = await axiosInstance.post(`${env.API_ROOT}/api/v1/device/control`, data)
    return response.data
}

export const fetchSchedulesAPI = async (areaId) => {
    const response = await axiosInstance.get(`${env.API_ROOT}/api/v1/schedule/get?areaId=${areaId}`)
    return response.data
}

export const createScheduleAPI = async (data) => {
    const response = await axiosInstance.post(`${env.API_ROOT}/api/v1/schedule/create`, data)
    return response.data
}

export const deleteScheduleAPI = async (scheduleId) => {
    const response = await axiosInstance.delete(`${env.API_ROOT}/api/v1/schedule/delete/${scheduleId}`)
    return response.data
}

export const getUserLogsAPI = async (areaId) => {
    const response = await axiosInstance.get(`${env.API_ROOT}/api/v1/action-logs/get?areaId=${areaId}`)
    return response.data
}

export const getDeviceLogsAPI = async (areaId) => {
    const response = await axiosInstance.get(`${env.API_ROOT}/api/v1/device/sync?areaId=${areaId}`)
    return response.data
}
