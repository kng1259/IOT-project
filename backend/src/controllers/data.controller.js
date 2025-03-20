import dataService from '../services/data.service.js';

export const getChartData = async (req, res, next) => {
    try {
        const { range, areaId } = req.query; // '7d' or '7h', optional areaId filter

        if (!range || (range !== '7d' /*&& range !== '7h'*/)) {
            return res.status(400).json({ success: false, error: "Invalid range." });
        }

        const data = await dataService.getChartData(range, areaId);
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};
