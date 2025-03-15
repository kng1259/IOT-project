import { StatusCodes } from 'http-status-codes'
import ApiError from '../helpers/ApiError.js'
import { JwtProvider } from '../providers/JwtProvider.js'
import { env } from '../helpers/environment.js'

const isAuthorized = async (req, res, next) => {
  const clientAccessToken = req.cookies?.accessToken

  if (!clientAccessToken) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized! (Token not found)'))
    return
  }

  try {
    const accessTokenDecoded = await JwtProvider.verifyToken(
      clientAccessToken,
      env.ACCESS_TOKEN_PRIVATE_KEY
    )
    req.jwtDecoded = accessTokenDecoded
    next()
  } catch (error) {
    if (error?.message?.includes('jwt expired')) {
      next(new ApiError(StatusCodes.GONE, 'Need to refresh token.'))
      return
    }
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized! Please Login.'))
  }
}
export const authMiddleware = {
  isAuthorized
}