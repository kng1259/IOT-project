import { StatusCodes } from 'http-status-codes'
import { userRepo } from '../repositories/user.repo.js'
import ApiError from '../helpers/ApiError.js'
import bcryptjs from 'bcryptjs'
import { JwtProvider } from '../providers/JwtProvider.js'
import { filterFieldsUser } from '../helpers/formatters.js'

const login = async (reqBody) => {
  const existUser = await userRepo.findOneByEmail(reqBody.email)

  if (!existUser) throw new ApiError(StatusCodes.NOT_FOUND, 'Tài khoản không tồn tại!')
  if (!bcryptjs.compareSync(reqBody.password, existUser.password))
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Mật khẩu không khớp!')

  const userInfo = {
    id: existUser.user_id,
    email: existUser.email
  }

  const accessToken = await JwtProvider.generateToken(
    userInfo,
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    '1h'
  )

  const refreshToken = await JwtProvider.generateToken(
    userInfo,
    process.env.REFRESH_TOKEN_PRIVATE_KEY,
    '14 days'
  )

  return { ...filterFieldsUser(existUser), accessToken, refreshToken }
}

const register = async (reqBody) => {
  const existUser = await userRepo.findOneByEmail(reqBody.email)

  if (existUser) throw new ApiError(StatusCodes.NOT_FOUND, 'Tài khoản đã tồn tại!')

  const userData = {
    email: existUser.email,
    password: bcryptjs.hashSync(reqBody.password, 8)
  }

  const createdUser = await userRepo.createNewUser(userData)
  return filterFieldsUser(createdUser)
}

const refreshToken = async (clientRefreshToken) => {
  const refreshTokenDecoded = await JwtProvider.verifyToken(
    clientRefreshToken,
    process.env.REFRESH_TOKEN_PRIVATE_KEY
  )

  const userInfo = {
    id: refreshTokenDecoded.id,
    email: refreshTokenDecoded.email
  }

  const accessToken = await JwtProvider.generateToken(
    userInfo,
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    '1h'
  )

  return { accessToken }
}

export const userService = {
  login,
  register,
  refreshToken
}