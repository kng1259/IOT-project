/* eslint-disable no-console */
import { Client } from 'azure-iothub'
import { env } from '../helpers/environment.js'

export const waterPlants = async (farmId, areaId) => {
    const client = Client.fromConnectionString(env.IOT_HUB_CONNECTION_STRING)
    const methodParams = {
        methodName: 'waterPlants',
        payload: {
            areaId
        },
        timeoutInSeconds: 60
    }
    try {
        const result = await client.invokeDeviceMethod(farmId, methodParams)
        console.log(result.statusCode)
        console.log(result.result)
        // console.log(result.status)
        // console.log(result.payload)
    } catch (err) {
        console.error(err.message)
    } finally {
        client.close()
    }
}
