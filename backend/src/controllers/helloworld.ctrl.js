import * as helloworldService from '../services/helloworld.service.js'
import ApiError from '../helpers/ApiError.js'
import { StatusCodes } from 'http-status-codes'

export const helloworld = async (req, res) => {
  const result = await helloworldService.helloworld().catch((err) => {
    throw new ApiError(500, err)
  })
  res.status(StatusCodes.OK).json(result)
}
