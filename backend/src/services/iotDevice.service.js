/* eslint-disable no-console */
import { Client } from 'azure-iothub'
import { env } from '../helpers/environment.js'
import ApiError from '../helpers/ApiError.js'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'

const methodNames = new Map([
    ['START_Chiếu đèn', 'startLighting'],
    ['STOP_Chiếu đèn', 'stopLighting'],
    ['START_Tưới nước', 'startWatering'],
    ['STOP_Tưới nước', 'stopWatering'],
    ['Lấy dữ liệu', 'fetchLatestData']
])

/**
 * Calls a method on an IoT device
 *
 * @param {string} method - The method identifier to call on the device, details in methodNames map
 * @param {string} farmId - The ID of the farm (used as device ID)
 * @param {string} areaId - The ID of the area within the farm
 * @returns {Promise<object>} The result from the device method call
 * @throws {ApiError} When method name is invalid, device returns error, or connection fails
 */
export const callDeviceMethod = async (method, farmId, areaId) => {
    const client = Client.fromConnectionString(env.IOT_HUB_CONNECTION_STRING)
    const methodName = methodNames.get(method)
    if (!methodName) {
        throw new ApiError(INTERNAL_SERVER_ERROR, 'Invalid method name', true)
    }
    const methodParams = {
        methodName,
        payload: {
            areaId
        },
        timeoutInSeconds: 60
    }
    try {
        const res = await client.invokeDeviceMethod(farmId, methodParams)
        const result = res.result
        if (result.status !== 200) {
            console.log(result.status)
            throw new ApiError(result.statusCode, 'Device method returned error', true)
        }
        return result
    } catch (err) {
        console.error(err.message)
        throw new ApiError(INTERNAL_SERVER_ERROR, 'Failed to call device method', true)
    } finally {
        client.close()
    }
}
