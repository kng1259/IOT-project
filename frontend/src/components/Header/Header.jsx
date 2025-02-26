import { IoFilter } from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';

import bg from '../../assets/images/bgFarm.png';

function Header() {
    return (
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
    );
}

export default Header;
