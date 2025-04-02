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

export const recordRepo = {
    findLatestRecordByAreaId,
    getAverageRecordsForLast8Hours
}
