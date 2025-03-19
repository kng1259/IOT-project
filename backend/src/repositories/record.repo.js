import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const findLatestRecordByAreaId = async (areaId) => {
  return await prisma.Record.findFirst({
    where: { areaId },
    orderBy: { timestamp: 'desc' } // Sắp xếp giảm dần để lấy bản ghi mới nhất
  });
};

export const recordRepo = {
  findLatestRecordByAreaId
};
