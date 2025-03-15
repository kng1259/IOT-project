import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const findOneByEmail = async (email) => {
  const user = await prisma.User.findUnique({ where: { email: email } })
  return user
}

const createNewUser = async (userData) => {
  const createUser = await prisma.User.create({ data: userData })
  return createUser
}

export const userRepo = {
  findOneByEmail,
  createNewUser
}