import { IoFilter } from 'react-icons/io5';

function ConfigPage() {
    return (
        <div className="min-h-dvh w-full px-12 py-8">
            <div className="flex gap-4">
                <IoFilter className="text-3xl" />
                <select className="cursor-pointer rounded-lg px-4 py-1 shadow outline-none">
                    <option value="volvo">Khu bí ngô</option>
                    <option value="saab">Khu thanh long</option>
                    <option value="opel">Khu khoai lang</option>
                    <option value="audi">Khu sà lách</option>
                </select>
            </div>

            <button className="btn-primary ml-12 mt-8"> Tạo hồ sơ</button>

            {/*  */}
            <div className="mt-8 w-fit text-center">
                <p className="text-xl font-semibold">Tần suất thu thập dữ liệu</p>
                <p className="text-second">5 phút</p>
                <progress id="file" value="32" max="100">
                    {' '}
                    32%{' '}
                </progress>
            </div>
        </div>
    );
}

export default ConfigPage;
