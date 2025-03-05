import { StatusCodes } from 'http-status-codes'

import ms from 'ms'
import { userService } from '../services/userService.js'

const login = async (req, res) => {
  const result = await userService.login(req.body)

  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ms('14 days')
  })

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ms('14 days')
  })

  res.status(StatusCodes.OK).json(result)
}

const register = async (req, res) => {
  const result = await userService.register(req.body)
  res.status(StatusCodes.CREATED).json(result)
}

const refreshToken = async (req, res) => {
  const clientRefreshToken = req.cookies?.refreshToken
  const result = await userService.refreshToken(clientRefreshToken)

  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ms('14 days')
  })

  res.status(StatusCodes.OK).json()
}


export const userController = {
  login,
  register,
  refreshToken
}