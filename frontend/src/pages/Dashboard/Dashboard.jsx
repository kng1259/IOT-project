import { IoFilter } from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';
import { CiTempHigh } from 'react-icons/ci';
import { LuSun } from 'react-icons/lu';
import { BsMoisture } from 'react-icons/bs';
import { WiHumidity } from 'react-icons/wi';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import bg from '../../assets/images/bgFarm.png';

function Dashboard() {
    const data = [
        { name: 'Page A', uv: 400 },
        { name: 'Page B', uv: 300 },
        { name: 'Page C', uv: 200 },
        { name: 'Page D', uv: 278 },
        { name: 'Page E', uv: 189 },
        { name: 'Page F', uv: 239 },
        { name: 'Page G', uv: 349 },
    ];

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
    ];

    return (
        <div className="min-h-dvh w-full px-12 py-8">
            <header className="flex items-center justify-between">
                <div className="flex gap-4">
                    <IoFilter className="text-3xl" />
                    <select className="cursor-pointer rounded-lg px-4 py-1 shadow outline-none">
                        <option value="volvo">Khu bí ngô</option>
                        <option value="saab">Khu thanh long</option>
                        <option value="opel">Khu khoai lang</option>
                        <option value="audi">Khu sà lách</option>
                    </select>
                </div>

                {/* avatar */}
                <div className="flex items-center gap-6">
                    <IoNotificationsOutline className="rounded-full p-2 text-[40px] hover:cursor-pointer hover:shadow-inner hover:shadow-black" />
                    <div
                        className="size-11 rounded-full border shadow-sm shadow-slate-500"
                        style={{
                            backgroundImage: `url(${bg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>
                </div>
            </header>

            {/* show parameters of each farm */}
            <div className="mt-8 flex justify-between">
                {parameters.map((param, index) => {
                    return (
                        <div key={index} className="flex w-[23%] items-center gap-12 rounded-lg bg-white p-6 shadow">
                            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
                                <param.icon className={`${param.size}`} />
                            </div>
                            <div className="">
                                <span className="text-2xl font-semibold text-textColor1">{param.value}</span>
                                <p className="mt-2 text-second">{param.name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* buttons handle activities */}
            <div className="mt-8 flex gap-10">
                <button className="btn-primary">Cập nhật</button>
                <button className="btn-primary">
                    <span>Bật </span>
                    <span> / </span>
                    <span className="text-[#5CB338]">Tắt </span>
                    <span>máy bơm</span>
                </button>
                {/* light */}
                <button className="btn-primary">
                    <span className="text-[#5CB338]">Bật </span>
                    <span> / </span>
                    <span>Tắt </span>
                    <span>bóng đèn</span>
                </button>
            </div>

            {/* graph */}
            <div className="mb-12 mt-8 flex justify-between">
                <h2 className="text-2xl font-semibold">Biểu đồ</h2>
                <div className="flex gap-4">
                    <IoFilter className="text-3xl" />
                    <select className="h-fit cursor-pointer rounded-lg px-4 py-1 shadow outline-none">
                        <option value="volvo">Khu bí ngô</option>
                        <option value="saab">Khu thanh long</option>
                        <option value="opel">Khu khoai lang</option>
                        <option value="audi">Khu sà lách</option>
                    </select>
                </div>
            </div>
            <LineChart
                className="ml-28"
                width={900}
                height={300}
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </div>
    );
}

export default Dashboard;
