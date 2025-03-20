import { CiTempHigh } from 'react-icons/ci'
import { LuSun } from 'react-icons/lu'
import { BsMoisture } from 'react-icons/bs'
import { WiHumidity } from 'react-icons/wi'
import { IoFilter } from 'react-icons/io5'

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import Header from '../../components/Header/Header'
import { useEffect, useState } from 'react'
import { testAPI } from '~/apis'

function Dashboard() {
    const [tab, setTab] = useState('chart')

    useEffect(() => {
        testAPI()
    })
    const data = [
        { name: 'Page A', uv: 400 },
        { name: 'Page B', uv: 300 },
        { name: 'Page C', uv: 200 },
        { name: 'Page D', uv: 278 },
        { name: 'Page E', uv: 189 },
        { name: 'Page F', uv: 239 },
        { name: 'Page G', uv: 349 },
    ]

    const parameters = [
        {
            icon: CiTempHigh,
            size: 'text-4xl',
            name: 'Nhiệt độ',
            value: '20 °C',
        },
        {
            icon: LuSun,
            size: 'text-3xl',
            name: 'Ánh sáng',
            value: '21 °C',
        },
        {
            icon: BsMoisture,
            size: 'text-3xl',
            name: 'Độ ẩm đất',
            value: '22 °C',
        },
        {
            icon: WiHumidity,
            size: 'text-[50px]',
            name: 'Độ ẩm không khí',
            value: '23 °C',
        },
    ]

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
            {/* show parameters of each farm */}
            <div className='mt-8 flex justify-between'>
                {parameters.map((param, index) => {
                    return (
                        <div key={index} className='flex w-[23%] items-center gap-12 rounded-lg bg-white p-6 shadow'>
                            <div className='flex size-12 items-center justify-center rounded-full bg-primary text-white'>
                                <param.icon className={`${param.size}`} />
                            </div>
                            <div className=''>
                                <span className='text-2xl font-semibold text-textColor1'>{param.value}</span>
                                <p className='mt-2 text-second'>{param.name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* buttons handle activities */}
            <div className='mt-8 flex gap-10'>
                <button className='btn-primary'>Cập nhật</button>
                <button className='btn-primary'>
                    <span>Bật </span>
                    <span> / </span>
                    <span className='text-[#5CB338]'>Tắt </span>
                    <span>máy bơm</span>
                </button>
                {/* light */}
                <button className='btn-primary'>
                    <span className='text-[#5CB338]'>Bật </span>
                    <span> / </span>
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
                    <select className='h-fit cursor-pointer rounded-lg px-4 py-1 shadow outline-none'>
                        <option value='volvo'>Khu bí ngô</option>
                        <option value='saab'>Khu thanh long</option>
                        <option value='opel'>Khu khoai lang</option>
                        <option value='audi'>Khu sà lách</option>
                    </select>
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
