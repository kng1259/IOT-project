import { PrismaClient } from '@prisma/client'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const prisma = new PrismaClient()

const main = async () => {
  const tables = ['user']
  for (const table of tables.slice().reverse()) {
    await prisma[table].deleteMany()
  }

  for (const table of tables) {
    await prisma[table].createMany({
      data: require(`./data/${table}.json`)
    })
  }
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
