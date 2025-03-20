import { StatusCodes } from 'http-status-codes';
import { recordRepo } from '../repositories/record.repo.js';
import ApiError from '../helpers/ApiError.js';
import prisma from '../prisma.js';


const getLatestRecordByArea = async (areaId) => {
  if (!areaId) throw new ApiError(StatusCodes.BAD_REQUEST, 'Thiếu areaId');

  return await recordRepo.findLatestRecordByAreaId(areaId);
};

const getLatest7Records = async (areaId) => {
  let query = {
      where: areaId ? { areaId } : {},  // Lọc theo `areaId` nếu có
      orderBy: { timestamp: 'desc' },   // Lấy dữ liệu mới nhất trước
      take: 7                            // Chỉ lấy 7 bản ghi gần nhất
  };

  const records = await prisma.record.findMany(query);

  return records.map(record => ({
      timestamp: record.timestamp.toISOString(),
      light: record.light,
      temperature: record.temperature,
      humidity: record.humidity,
      soilMoisture: record.soilMoisture
  }));
};



export const recordService = {
  getLatestRecordByArea,
  getLatest7Records
};


