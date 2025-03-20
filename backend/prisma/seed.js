import { PrismaClient } from '@prisma/client'
import { createRequire } from 'module'
import { v4 as uuidv4 } from 'uuid'

const require = createRequire(import.meta.url)
const prisma = new PrismaClient()

const main = async () => {
  const tables = ['User', 'Farm', 'Area', 'Crop', 'PlantedCrop', 'DeviceLog', 'Record', 'Schedule']
  for (const table of tables.slice().reverse()) {
    await prisma[table].deleteMany({})
  }

  for (const table of tables.slice().reverse()) {
    await prisma[table].deleteMany({})
  }

  const uuidMap = {}

  // Tạo UUID cho tất cả bảng *ngoại trừ* PlantedCrop
  for (const table of tables.filter(t => t !== "PlantedCrop")) {
    uuidMap[table] = {}
    const data = require(`./data/${table}.json`)

    for (const item of data) {
      const newId = uuidv4()
      uuidMap[table][item.id] = newId
      item.id = newId
    }
  }

  // Cập nhật ID trong dữ liệu (bỏ qua PlantedCrop)
  for (const table of tables.filter(t => t !== "PlantedCrop" && t!=="Record")) {
    const data = require(`./data/${table}.json`).map(item => {
      if (uuidMap[table][item.id]) item.id = uuidMap[table][item.id]

      if (item.userId) item.userId = uuidMap["User"][item.userId]
      if (item.farmId) item.farmId = uuidMap["Farm"][item.farmId]
      if (item.areaId) item.areaId = uuidMap["Area"][item.areaId]
      if (item.cropId) item.cropId = uuidMap["Crop"][item.cropId]

      return item
    })
    await prisma[table].createMany({ data })
  }

  // Xử lý riêng PlantedCrop
  const plantedCropData = require(`./data/PlantedCrop.json`)
  for (const item of plantedCropData) {
    const newAreaId = uuidMap["Area"][item.areaId]
    const newCropId = uuidMap["Crop"][item.cropId]

    await prisma.plantedCrop.create({
      data: {
        areaId: newAreaId,
        cropId: newCropId,
        quantity: item.quantity
      }
    })
  }

  // Xử lý riêng Record (do khóa chính tổng hợp không hỗ trợ createMany)
  const recordData = require(`./data/Record.json`);
  for (const record of recordData) {
    try {
      await prisma.record.upsert({
        where: {
          timestamp_areaId: {
            timestamp: record.timestamp,  // No conversion needed
            areaId: uuidMap["Area"][record.areaId]
          }
        },
        update: {}, // Không cập nhật, chỉ insert nếu chưa có
        create: {
          timestamp: record.timestamp,  // Use as is
          light: record.light,
          temperature: record.temperature,
          humidity: record.humidity,
          soilMoisture: record.soilMoisture,
          areaId: uuidMap["Area"][record.areaId]
        }
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  console.log("Seed dữ liệu thành công!")
}


main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })