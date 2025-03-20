import prisma from '../prisma.js';

const getChartData = async (range, areaId) => {
    let timeFilter = {};
    timeFilter = {
        timestamp: { gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
    };

    /*if (range === '7d') {
        timeFilter = {
            timestamp: { gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
        };
    } else if (range === '7h') {
        timeFilter = {
            timestamp: { gte: new Date(new Date().setHours(new Date().getHours() - 7)) }
        };
    }*/

    let query = {
        where: {
            ...timeFilter,
            ...(areaId ? { areaId } : {}) // Apply area filter if provided
        },
        orderBy: { timestamp: 'asc' } // Order data from oldest to newest
    };

    const records = await prisma.record.findMany(query);

    // Transform data into chart-ready format
    const chartData = records.map(record => ({
        timestamp: record.timestamp.toISOString(), // Convert to string for frontend compatibility
        light: record.light,
        temperature: record.temperature,
        humidity: record.humidity,
        soilMoisture: record.soilMoisture
    }));

    return chartData;
};

export default { getChartData };
