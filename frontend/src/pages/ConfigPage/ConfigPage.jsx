import { GoDotFill } from 'react-icons/go'

import ModalCreateProfile from './ModalCreateProfile'
import Header from '../../components/Header/Header'
import { fetchSchedulesAPI, createScheduleAPI, deleteScheduleAPI } from '~/apis'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectActiveAreaId } from '~/redux/dashboard/dashboardSlice'
import { Table } from 'antd'
import { toast } from 'react-toastify'

function ConfigPage() {
    const areaId = useSelector(selectActiveAreaId)

    const [tab, setTab] = useState('pump')
    const [pumpSchedules, setPumpSchedules] = useState([])
    const [lightSchedules, setLightSchedules] = useState([])

    const columns = [
        {
            title: 'Bắt đầu',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'Kết thúc',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: 'Tần suất',
            dataIndex: 'frequency',
            key: 'frequency',
        },
        {
            title: 'Thao tác',
            dataIndex: 'button',
            key: 'button',
        },
    ]

    const toggleModal = () => {
        const modal = document.getElementById('modalCreateProfile')
        modal.classList.toggle('hidden')
        modal.classList.toggle('flex')
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

    const handlScheduleData = (data) => {
        const pumpDataTemp = data.filter((schedule) => schedule.activity === 'Tưới nước')
        const lightDataTemp = data.filter((schedule) => schedule.activity === 'Chiếu đèn')

        const pumpSchedules = pumpDataTemp.map((schedule) => {
            return {
                key: schedule.id,
                startTime: schedule.startTime,
                endTime: schedule.endTime,
                frequency: schedule.frequency.join(', '),
                button: (
                    <button
                        onClick={() => handleDeleteSchedule(schedule.id)}
                        className='rounded-lg bg-primary px-6 py-2 text-white shadow hover:shadow-inner hover:shadow-white'
                    >
                        Xóa
                    </button>
                ),
            }
        })

        const lightSchedules = lightDataTemp.map((schedule) => {
            return {
                key: schedule.id,
                startTime: schedule.startTime,
                endTime: schedule.endTime,
                frequency: schedule.frequency.join(', '),
                button: (
                    <button
                        onClick={() => handleDeleteSchedule(schedule.id)}
                        className='rounded-lg bg-primary px-6 py-2 text-white shadow hover:shadow-inner hover:shadow-white'
                    >
                        Xóa
                    </button>
                ),
            }
        })

        setPumpSchedules(pumpSchedules)
        setLightSchedules(lightSchedules)
    }

    const handleCreateSchedule = async (scheduleData) => {
        try {
            const schedule = {
                ...scheduleData,
                areaId: areaId,
            }
            const response = await createScheduleAPI(schedule)

            if (response) {
                toast.success('Tạo lịch thành công')
            }

            fetchSchedules()
        } catch (error) {
            console.error('Error creating schedule:', error)
        }
    }

    const handleDeleteSchedule = async (scheduleId) => {
        try {
            await deleteScheduleAPI(scheduleId)

            fetchSchedules()

            toast.success('Xóa lịch thành công')
        } catch (error) {
            console.error('Error deleting schedule:', error)
        }
    }

    const fetchSchedules = async () => {
        try {
            const response = await fetchSchedulesAPI(areaId)

            if (response) {
                handlScheduleData(response)
            }
        } catch (error) {
            console.error('Error fetching schedules:', error)
        }
    }

    useEffect(() => {
        fetchSchedules()
    }, [tab])

    return (
        <div className=''>
            <Header />

            <button className='btn-primary ml-12 mt-8 shadow' onClick={toggleModal}>
                {' '}
                Tạo hồ sơ
            </button>

            <div className='mt-12 flex gap-6'>
                <div
                    className='tab cursor-pointer select-none rounded-xl bg-primary px-4 py-2 text-white shadow'
                    onClick={(e) => toggleTab(e, 'pump')}
                >
                    Tưới nước
                </div>
                <div
                    className='tab cursor-pointer select-none rounded-xl bg-white px-4 py-2 shadow'
                    onClick={(e) => toggleTab(e, 'light')}
                >
                    Chiếu đèn
                </div>
            </div>

            <div className='mt-12 h-[400px] overflow-x-auto'>
                {tab == 'pump' && (
                    <div className='rounded-lg bg-white px-6 py-4 shadow'>
                        <Table dataSource={pumpSchedules} columns={columns} />
                    </div>
                )}
                {tab == 'light' && (
                    <div className='rounded-lg bg-white px-6 py-4 shadow'>
                        <Table dataSource={lightSchedules} columns={columns} />
                    </div>
                )}
            </div>

            <div
                id='modalCreateProfile'
                className='m absolute bottom-0 left-0 right-0 top-0 hidden items-center justify-center bg-gray-700 bg-opacity-70'
            >
                <ModalCreateProfile toggleModal={toggleModal} handleCreateSchedule={handleCreateSchedule} />
            </div>
        </div>
    )
}

export default ConfigPage
