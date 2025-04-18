import { EventHubConsumerClient } from '@azure/event-hubs'
import { recordRepo } from '../repositories/record.repo.js'

let consumerClient

const initClient = async () => {
    consumerClient = new EventHubConsumerClient('$Default', process.env.EVENT_HUB_CONNECTION_STRING)
    consumerClient.subscribe({
        processEvents: eventProcessor,
        processError: async (error, context) => {
            console.error('Error processing event:', error)
        }
    })
    console.log('Consumer client initialized and subscribed to event hub')
}

export const startEventHub = async () => {
    if (!consumerClient) {
        await initClient()
    }
}

export const stopEventHub = async () => {
    if (consumerClient) {
        await consumerClient.close()
        consumerClient = null
        console.log('Consumer client closed')
    }
}

const eventProcessor = async (events, context) => {
    for (const event of events) {
        if (event.properties.type === 'telemetry') {
            const sensorData = {
                timestamp: new Date(event.body.timestamp),
                temperature: event.body.temperature,
                humidity: event.body.humidity,
                light: event.body.light,
                soilMoisture: event.body.soilMoisture
            }
            await recordRepo.createSensorRecord({
                sensorData,
                areaId: parseInt(event.body.areaId),
                note: ''
            })
        } else if (event.properties.type === 'alert') {
            // Handle warning event
            console.log('Alert event:', event.data)
        }
    }
}
