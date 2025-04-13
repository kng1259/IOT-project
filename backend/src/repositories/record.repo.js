import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const findLatestRecordByAreaId = async (areaId) => {
    return await prisma.Record.findFirst({
        where: { areaId },
        orderBy: { timestamp: 'desc' } // Sắp xếp giảm dần để lấy bản ghi mới nhất
    })
}

const getAverageRecordsForLast8Hours = async (areaId) => {
    return await prisma.$queryRaw`
    SELECT 
      DATE_TRUNC('hour', timestamp) + INTERVAL '30 minutes' * (EXTRACT(MINUTE FROM timestamp)::int / 30) AS time_slot,
      AVG(light) AS avg_light,
      AVG(temperature) AS avg_temperature,
      AVG(humidity) AS avg_humidity,
      AVG("soilMoisture") AS avg_soil_moisture
    FROM "Record"
    WHERE "areaId" = ${areaId} 
      AND timestamp >= NOW() - INTERVAL '8 hours'
    GROUP BY time_slot
    ORDER BY time_slot DESC;
  `
}

const createSensorRecord = async ({ sensorData, areaId, note }) => {
    const area = await prisma.area.findUnique({
        where: { id: areaId }
    })

    if (!area) {
        throw new Error(`Khu vực area với id ${areaId} không tồn tại`)
    }

    console.log(sensorData)

    const record = await prisma.record.create({
        data: {
            ...sensorData,
            areaId
        }
    })

    // Có cần log hoạt động sensor không nhỉ?
    // await prisma.deviceLog.create({
    //     data: {
    //         action: 'collect_sensor',
    //         deviceType: 'sensor',
    //         areaId,
    //         timestamp: new Date(),
    //         note:
    //             note ||
    //             `Sensor values: Temp ${temperature}°C, Humid ${humidity}%, Light ${light}lux, Soil ${soilMoisture}%`
    //     }
    // })

    return record
}

export const recordRepo = {
    findLatestRecordByAreaId,
    getAverageRecordsForLast8Hours,
    createSensorRecord
}
