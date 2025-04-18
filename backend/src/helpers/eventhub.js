import { EventHubConsumerClient } from '@azure/event-hubs'
import { recordRepo } from '../repositories/record.repo.js'
import { sendMail } from './sendMail.js'
import { areaRepo } from '../repositories/area.repo.js'
import { farmRepo } from '../repositories/farm.repo.js'
import { userRepo } from '../repositories/user.repo.js'

let consumerClient
let io = null
export const initSocket = (mainSocket) => (io = mainSocket)

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
            io.emit('BE_ALERT_NOTIFICATION')

            const areaId = parseInt(event.body.areaId)
            const farmId = event.body.farmId
            const area = await areaRepo.findAreaById(areaId)
            const farm = await farmRepo.findFarmById(farmId)
            const user = await userRepo.findUserById(farm.userId)

            const sensorName = event.body.alert
            const measuredValue = event.body.measuredValue
            const limitedValue = event.body.limitedValue
            const measuredTime = new Date(event.body.timestamp)

            const customSubject = 'IOT Smart Farm: Cảnh báo vượt ngưỡng!'
            const htmlContent = `
                <!DOCTYPE html>
                <html lang="vi">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <title>Cảnh báo hệ thống IOT Smart Farm</title>
                    <style>
                        body {
                            margin: 0;
                            padding: 0;
                            background-color: #f9f9f9;
                            font-family: Arial, sans-serif;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            border-radius: 8px;
                            overflow: hidden;
                            box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        }
                        .header {
                            background-color: #d32f2f;
                            padding: 20px;
                            color: #ffffff;
                            text-align: center;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 24px;
                        }
                        .content {
                            padding: 20px;
                            color: #333333;
                        }
                        .content p {
                            margin-bottom: 12px;
                            font-size: 16px;
                            line-height: 1.5;
                        }
                        .alert-box {
                            background-color: #fdecea;
                            border-left: 5px solid #d32f2f;
                            padding: 15px;
                            margin: 20px 0;
                            color: #b71c1c;
                            font-weight: bold;
                        }
                        .footer {
                            background-color: #eeeeee;
                            text-align: center;
                            font-size: 12px;
                            color: #777777;
                            padding: 10px 20px;
                        }
                    </style>
                </head>
                <body>
                <div class="container">
                    <div class="header">
                        <h1>CẢNH BÁO VƯỢT NGƯỠNG</h1>
                        <p>Hệ thống IOT Smart Farm</p>
                    </div>
                    <div class="content">
                        <p>Xin chào,</p>
                        <p>Hệ thống vừa ghi nhận một giá trị vượt ngưỡng cho phép.</p>
                        <div class="alert-box">
                            Nông trại: <strong>${farm.name}</strong><br/>
                            Khu vực: <strong>${area.name}</strong><br/>
                            Cảm biến: <strong>${sensorName}</strong><br/>
                            Giá trị đo: <strong>${measuredValue}</strong><br/>
                            Ngưỡng cho phép: <strong>${limitedValue}</strong><br/>
                            Thời gian: <strong>${measuredTime}</strong>
                        </div>
                        <p>Vui lòng kiểm tra hệ thống sớm nhất có thể để đảm bảo hoạt động ổn định.</p>
                        <p>Trân trọng,<br>Hệ thống IOT Smart Farm</p>
                    </div>
                    <div class="footer">
                        <p>Đây là email tự động. Vui lòng không trả lời email này.</p>
                    </div>
                </div>
                </body>
                </html>

            `
            sendMail(user.email, customSubject, htmlContent)
        }
    }
}
