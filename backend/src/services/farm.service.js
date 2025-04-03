import { StatusCodes } from 'http-status-codes'
import { farmRepo } from '../repositories/farm.repo.js'
import ApiError from '../helpers/ApiError.js'

const getFarmsByUser = async (userId) => {
    if (!userId) throw new ApiError(StatusCodes.BAD_REQUEST, 'Thiếu userId')

    return await farmRepo.findFarmsByUserId(userId)
}

export const farmService = {
    getFarmsByUser
}
