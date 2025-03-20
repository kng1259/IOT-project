import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Table } from 'antd'

import { useState } from 'react'

import Header from '../../components/Header/Header'

function ReportPage() {
    const [tab, setTab] = useState('chart')

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ]

    const columns = [
        {
            title: 'Công việc',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'address',
            key: 'address',
        },
    ]

    const data = Array.from({ length: 8 }, (_, i) => {
        return {
            name: ` ${i + 1}`,
            uv: Math.floor(Math.random() * 400),
        }
    })

    const toggleTab = (e, value) => {
        document.querySelectorAll('.tab').forEach((tab) => {
            tab.classList.replace('bg-primary', 'bg-white')
            tab.classList.remove('text-white')
        })

        e.target.classList.replace('bg-white', 'bg-primary')
        e.target.classList.add('text-white')

        setTab(value)
    }

    return (
        <div className=''>
            <Header />
            <div className='ml-12 mt-6 flex gap-6'>
                <select className='cursor-pointer rounded-lg px-4 py-1 shadow outline-none'>
                    <option value='1'>Nhiệt độ</option>
                    <option value='2'>Độ ẩm đất</option>
                    <option value='3'>Độ ẩm không khí</option>
                    <option value='4'>Ánh sáng</option>
                </select>
                <input type='date' className='cursor-pointer rounded-lg px-4 py-1 shadow outline-none' />
            </div>

            <div className='mt-12 flex gap-6'>
                <div
                    className='tab cursor-pointer select-none rounded-xl bg-primary px-4 py-2 text-white shadow'
                    onClick={(e) => toggleTab(e, 'chart')}
                >
                    Biểu đồ{' '}
                </div>
                <div
                    className='tab cursor-pointer select-none rounded-xl bg-white px-4 py-2 shadow'
                    onClick={(e) => toggleTab(e, 'history')}
                >
                    Lịch sử{' '}
                </div>
            </div>
            <div className='h-[400px] overflow-x-auto pt-12'>
                {tab == 'chart' && (
                    <ResponsiveContainer width='100%' height='100%'>
                        <BarChart
                            width={900}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 0,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray='5 3' />
                            <XAxis dataKey='name' scrollable />
                            <YAxis scrollable />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey='uv' fill='#82ca9d' activeBar={<Rectangle fill='gold' stroke='purple' />} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {tab == 'history' && (
                    <div className='rounded-lg bg-white px-6 py-4 shadow'>
                        <Table dataSource={dataSource} columns={columns} />;
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReportPage
