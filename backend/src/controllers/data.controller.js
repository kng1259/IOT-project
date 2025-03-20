import dataService from '../services/data.service.js';

export const getChartData = async (req, res, next) => {
    try {
        const { areaId } = req.query; // '7d' or '7h', optional areaId filter

        if (!areaId){
            return res.status(400).json({ success: false, error: "Invalid areaId."});
        }

        const data = await dataService.getChartData(areaId);
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};
