import { IoFilter } from 'react-icons/io5';
import { GoDotFill } from 'react-icons/go';

import ModalCreateProfile from './ModalCreateProfile';

function ConfigPage() {
    const toggleModal = () => {
        const modal = document.getElementById('modalCreateProfile');
        modal.classList.toggle('hidden');
        modal.classList.toggle('flex');
    };

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

            <button className="btn-primary ml-12 mt-8 shadow" onClick={toggleModal}>
                {' '}
                Tạo hồ sơ
            </button>

            <div className="mt-8 flex w-fit gap-4 text-center">
                <p className="flex items-center gap-2 text-xl font-semibold">
                    {' '}
                    <GoDotFill /> Tần suất thu thập dữ liệu:{' '}
                </p>
                <div className="flex">
                    <input
                        type="number"
                        className="w-16 rounded-lg py-1 text-center font-medium shadow outline-slate-200"
                    />
                    <p className="text-text ml-4">giây</p>
                </div>
            </div>

            <div className="g mt-8 w-fit">
                <p className="flex items-center gap-2 text-xl font-semibold">
                    {' '}
                    <GoDotFill /> Điều chỉnh bóng đèn:{' '}
                </p>
                <div className="ml-6 mt-4 flex">
                    <label htmlFor="">Thời gian bắt đầu: </label>
                    <input
                        type="time"
                        className="ml-4 w-16 rounded-lg py-1 pl-2 text-center font-medium shadow outline-slate-200"
                    />
                </div>
                <div className="ml-6 mt-4 flex">
                    <label htmlFor="">Thời gian tồn tại: </label>
                    <input
                        type="number"
                        className="ml-6 w-16 rounded-lg py-1 pl-2 text-center font-medium shadow outline-slate-200"
                    />
                    <p className="text-text ml-4">giây</p>
                </div>
            </div>

            <div className="g mt-8 w-fit">
                <p className="flex items-center gap-2 text-xl font-semibold">
                    {' '}
                    <GoDotFill /> Điều chỉnh máy bơm:{' '}
                </p>
                <div className="ml-6 mt-4 flex">
                    <label htmlFor="">Thời gian bắt đầu: </label>
                    <input
                        type="time"
                        className="ml-4 w-16 rounded-lg py-1 pl-2 text-center font-medium shadow outline-slate-200"
                    />
                </div>
                <div className="ml-6 mt-4 flex">
                    <label htmlFor="">Thời gian tồn tại: </label>
                    <input
                        type="number"
                        className="ml-6 w-16 rounded-lg py-1 pl-2 text-center font-medium shadow outline-slate-200"
                    />
                    <p className="text-text ml-4">giây</p>
                </div>
            </div>

            <div
                id="modalCreateProfile"
                className="m absolute bottom-0 left-0 right-0 top-0 hidden items-center justify-center bg-gray-700 bg-opacity-70"
            >
                <ModalCreateProfile toggleModal={toggleModal} />
            </div>
        </div>
    );
}

export default ConfigPage;
