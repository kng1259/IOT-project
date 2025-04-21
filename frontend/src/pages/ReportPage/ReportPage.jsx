import { Table } from 'antd'

import { useEffect, useState } from 'react'

import Header from '../../components/Header/Header'
import { getUserLogsAPI, getDeviceLogsAPI } from '~/apis'
import { useSelector } from 'react-redux'
import { selectActiveAreaId } from '~/redux/dashboard/dashboardSlice'

function ReportPage() {
    const [tab, setTab] = useState('userLog')
    const [userLogs, setUserLogs] = useState([])
    const [deviceLogs, setDeviceLogs] = useState([])
    const areaId = useSelector(selectActiveAreaId)

    const columns = [
        {
            title: 'Công việc',
            dataIndex: 'action',
            key: 'action',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Thời gian',
            dataIndex: 'timestamp',
            key: 'timestamp',
        },
    ]

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        return `${hours}:${minutes} ${day}/${month}/${year} `
    }

    const toggleTab = (e, value) => {
        document.querySelectorAll('.tab').forEach((tab) => {
            tab.classList.replace('bg-primary', 'bg-white')
            tab.classList.remove('text-white')
        })

        e.target.classList.replace('bg-white', 'bg-primary')
        e.target.classList.add('text-white')

        setTab(value)
    }

    useEffect(() => {
        const getDeviceLogs = async () => {
            try {
                const res = await getDeviceLogsAPI(areaId)
                console.log(res)
                if (res) {
                    const result = res.map((item) => {
                        return {
                            action: item.action,
                            description: item.note,
                            timestamp: formatDate(item.timestamp),
                        }
                    })

                    setDeviceLogs(result)
                }
            } catch (error) {
                console.log(error)
            }
        }
        const getUserLog = async () => {
            try {
                const res = await getUserLogsAPI(areaId)
                console.log(res)
                if (res) {
                    const result = res.map((item) => {
                        return {
                            action: item.action,
                            description: item.description,
                            timestamp: formatDate(item.timestamp),
                        }
                    })

                    setUserLogs(result)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getUserLog()
        getDeviceLogs()
    }, [areaId])

    return (
        <div className=''>
            <Header />

            <div className='mt-12 flex gap-6'>
                <div
                    className='tab cursor-pointer select-none rounded-xl bg-primary px-4 py-2 text-white shadow'
                    onClick={(e) => toggleTab(e, 'userLog')}
                >
                    User logs{' '}
                </div>
                <div
                    className='tab cursor-pointer select-none rounded-xl bg-white px-4 py-2 shadow'
                    onClick={(e) => toggleTab(e, 'deviceLog')}
                >
                    Device Logs{' '}
                </div>
            </div>
            <div className='overflow-x-auto pt-6'>
                {tab === 'userLog' && (
                    <div className='max-w-[1100px] rounded-lg bg-white px-6 py-4 shadow'>
                        <Table dataSource={userLogs} columns={columns} scroll={{ y: 75 * 5 }} />
                    </div>
                )}
                {tab === 'deviceLog' && (
                    <div className='max-w-[1100px] rounded-lg bg-white px-6 py-4 shadow'>
                        <Table dataSource={deviceLogs} columns={columns} scroll={{ y: 75 * 5 }} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReportPage
