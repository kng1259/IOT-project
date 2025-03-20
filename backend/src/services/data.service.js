import prisma from '../prisma.js';

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

export default { getLatest7Records };

