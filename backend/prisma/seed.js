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
  for (const table of tables.filter(t => t !== "PlantedCrop")) {
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

  console.log("Seed dữ liệu thành công!")
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
