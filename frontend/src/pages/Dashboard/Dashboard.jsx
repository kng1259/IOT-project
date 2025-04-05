import { CiTempHigh } from 'react-icons/ci'
import { LuSun } from 'react-icons/lu'
import { BsMoisture } from 'react-icons/bs'
import { WiHumidity } from 'react-icons/wi'
import { IoFilter } from 'react-icons/io5'

import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
    Line,
    LineChart,
} from 'recharts'

import Header from '../../components/Header/Header'
import { useEffect, useState } from 'react'

import { fetchChartData, toggleDeviceAPI } from '~/apis'
import { cloneDeep } from 'lodash'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { selectActiveAreaId } from '~/redux/dashboard/dashboardSlice'
import { socketIoInstance } from '~/socketClient'

const initialParameters = [
    {
        icon: CiTempHigh,
        size: 'text-4xl',
        name: 'Nhiệt độ',
        value: 0,
        unit: '°C',
    },
    {
        icon: LuSun,
        size: 'text-3xl',
        name: 'Ánh sáng',
        value: 0,
        unit: '%',
    },
    {
        icon: BsMoisture,
        size: 'text-3xl',
        name: 'Độ ẩm đất',
        value: 0,
        unit: '%',
    },
    {
        icon: WiHumidity,
        size: 'text-[50px]',
        name: 'Độ ẩm không khí',
        value: 0,
        unit: '%',
    },
]

function Dashboard() {
    const [tab, setTab] = useState('chart')

    const areaId = useSelector(selectActiveAreaId)

    const [avgLight, setAvgLight] = useState([])
    const [avgTemp, setAvgTemp] = useState([])
    const [avgHumidity, setAvgHumidity] = useState([])
    const [avgSoilMoisture, setAvgSoilMoisture] = useState([])

    const [typeDateChart, setTypeDateChart] = useState('avgLight')

    const [parameters, setParameters] = useState(initialParameters)

    let chartDataOrigin = []

    const getTime = (timestamp) => {
        const date = new Date(timestamp)
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${hours}:${minutes}`
    }

    const toggleDevice = async (deviceType, action) => {
        const data = {
            areaId: areaId,
            action: action,
            deviceType: deviceType,
        }
        try {
            await toggleDeviceAPI(data)
            toast.success(`${action} ${deviceType} thành công!`)
        } catch (error) {
            console.error('Error toggling device:', error)
            toast.error('Cập nhật thất bại!')
        }
    }

    const handleClassifyData = (data) => {
        const avgLight = []
        const avgTemp = []
        const humidity = []
        const soilMoisture = []

        data.forEach((item) => {
            avgLight.push({ name: getTime(item.time_slot), data: item.avg_light.toFixed(2) })
            avgTemp.push({ name: getTime(item.time_slot), data: item.avg_temperature.toFixed(2) })
            humidity.push({ name: getTime(item.time_slot), data: item.avg_humidity.toFixed(2) })
            soilMoisture.push({ name: getTime(item.time_slot), data: item.avg_soil_moisture.toFixed(2) })
        })

        setAvgLight(avgLight)
        setAvgTemp(avgTemp)
        setAvgHumidity(humidity)
        setAvgSoilMoisture(soilMoisture)
    }

    const updateParameters = (data) => {
        setParameters((prevParameters) => {
            const newParameters = cloneDeep(prevParameters)
            newParameters[0].value = data?.temperature?.toFixed(2) || 0
            newParameters[1].value = data?.light?.toFixed(2) || 0
            newParameters[2].value = data?.soilMoisture?.toFixed(2) || 0
            newParameters[3].value = data?.humidity?.toFixed(2) || 0
            return newParameters
        })
    }

    const updateChartData = (data) => handleClassifyData(data.slice(0, 10).reverse())

    useEffect(() => {
        socketIoInstance.emit('FE_DASHBOARD_FETCH_STATISTICS', areaId)
        socketIoInstance.emit('FE_DASHBOARD_FETCH_CHART_DATA', areaId)
    }, [areaId])

    useEffect(() => {
        socketIoInstance.on('BE_DASHBOARD_FETCH_STATISTICS', updateParameters)
        socketIoInstance.on('BE_DASHBOARD_FETCH_CHART_DATA', updateChartData)

        return () => {
            socketIoInstance.off('BE_DASHBOARD_FETCH_STATISTICS', updateParameters)
            socketIoInstance.off('BE_DASHBOARD_FETCH_CHART_DATA', updateChartData)
        }
    }, [])

    const toggleTab = (e, value) => {
        document.querySelectorAll('.tab').forEach((tab) => {
            tab.classList.replace('bg-primary', 'bg-white')
            tab.classList.remove('text-white')
        })

        e.target.classList.replace('bg-white', 'bg-primary')
        e.target.classList.add('text-white')

        setTab(value)
    }

    const handleChangeChartDataType = (e) => {
        setTypeDateChart(e.target.value)
    }

    return (
        <div className=''>
            <Header />

            {/* show parameters of each farm */}
            <div className='mt-8 flex justify-between'>
                {parameters.map((param, index) => {
                    return (
                        <div key={index} className='flex w-[23%] items-center gap-12 rounded-lg bg-white p-6 shadow'>
                            <div className='flex size-12 items-center justify-center rounded-full bg-primary text-white'>
                                <param.icon className={`${param.size}`} />
                            </div>
                            <div className=''>
                                <span className='text-2xl font-semibold text-textColor1'>
                                    {param.value} {param.unit}
                                </span>
                                <p className='mt-2 text-second'>{param.name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* buttons handle activities */}
            <div className='mt-8 flex gap-10'>
                <button
                    className='btn-primary'
                    onClick={() => {
                        // fetchLatestRecord(areaId)
                        toast.success('Cập nhật thành công!')
                    }}
                >
                    Cập nhật
                </button>
                {/* pump */}
                <button
                    onClick={() => {
                        toggleDevice('Máy bơm', 'START')
                    }}
                    className='btn-primary'
                >
                    <span>Bật </span>
                    <span>máy bơm</span>
                </button>
                <button
                    onClick={() => {
                        toggleDevice('Máy bơm', 'STOP')
                    }}
                    className='btn-primary'
                >
                    <span>Tắt </span>
                    <span>máy bơm</span>
                </button>
                {/* light */}
                <button
                    onClick={() => {
                        toggleDevice('Đèn', 'START')
                    }}
                    className='btn-primary'
                >
                    <span>Bật </span>
                    <span>bóng đèn</span>
                </button>
                <button
                    onClick={() => {
                        toggleDevice('Đèn', 'STOP')
                    }}
                    className='btn-primary'
                >
                    <span>Tắt </span>
                    <span>bóng đèn</span>
                </button>
            </div>

            {/* graph or more information */}

            <div className='mt-12 flex gap-6'>
                <div
                    className='tab cursor-pointer select-none rounded-xl bg-primary px-4 py-2 text-white shadow'
                    onClick={(e) => toggleTab(e, 'chart')}
                >
                    Biểu đồ{' '}
                </div>
                <div
                    className='tab cursor-pointer select-none rounded-xl bg-white px-4 py-2 shadow'
                    onClick={(e) => toggleTab(e, 'infor')}
                >
                    Lịch sử{' '}
                </div>
                <div className='ml-auto flex gap-4'>
                    <IoFilter className='text-3xl' />
                    <select
                        onChange={handleChangeChartDataType}
                        className='h-fit cursor-pointer rounded-lg px-4 py-1 shadow outline-none'
                    >
                        <option value='avgLight'>Ánh sáng</option>
                        <option value='avgTemp'>Nhiệt độ</option>
                        <option value='avgHumidity'>Độ ẩm đất</option>
                        <option value='avgSoilMoisture'>Độ ẩm không khí</option>
                    </select>
                </div>
            </div>
            <div className='h-[400px] overflow-x-auto pt-12'>
                {tab == 'chart' && (
                    <ResponsiveContainer width='100%' height='100%'>
                        <LineChart
                            width={500}
                            height={300}
                            data={
                                {
                                    avgLight,
                                    avgTemp,
                                    avgHumidity,
                                    avgSoilMoisture,
                                }[typeDateChart] || chartDataOrigin
                            }
                        >
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='name' />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type='monotone' dataKey='data' fill='#82ca9d' stroke='none' fillOpacity={0.3} />
                            <Line type='monotone' dataKey='data' stroke='#82ca9d' strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
                {tab == 'infor' && (
                    <div className='rounded-lg bg-white px-6 py-4 shadow'>
                        <div className=''>thoong tin them</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
