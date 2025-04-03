import { recordService } from '../services/record.service.js'

export const fetchStatisticsSocket = async (socket, areaId) => {
    try {
        const record = await recordService.getLatestRecordByArea(areaId)
        socket.emit('BE_DASHBOARD_FETCH_STATISTICS', record)
    } catch (error) {
        socket.emit('BE_DASHBOARD_FETCH_STATISTICS', error)
    }
}

export const fetchChartDataSocket = async (socket, areaId) => {
    try {
        const record = await recordService.getChartData(areaId)
        socket.emit('BE_DASHBOARD_FETCH_CHART_DATA', record)
    } catch (error) {
        socket.emit('BE_DASHBOARD_FETCH_CHART_DATA', error)
    }
}
