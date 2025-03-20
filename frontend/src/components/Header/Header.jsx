import { IoFilter } from 'react-icons/io5'
import { IoNotificationsOutline } from 'react-icons/io5'
import { Dropdown, Select } from 'antd'

import bg from '../../assets/images/bgFarm.png'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice'
import { Confirm } from '~/utils/sweet'
import { fetchListFarmsAPI } from '~/apis'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function Header() {
    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()

    const [farmId] = useState(searchParams.get('farmId'))
    const [farms, setFarms] = useState([])

    const currentUser = useSelector(selectCurrentUser)
    const navigate = useNavigate()

    useEffect(() => {
        fetchListFarmsAPI(currentUser.user_id).then(data => setFarms(data))
    }, [currentUser.user_id])

    const handleChange = (value) => {
        navigate(`/dashboard?farmId=${value}`)
    }

    const handleLogout = () => {
        Confirm.fire().then(res => {
            if (res.isConfirmed) {
                toast.promise(
                    dispatch(logoutUserAPI()),
                    { pending: 'Đang đăng xuất...' }
                )
            }
        })
    }
    const items = [
        {
            label: (<a href="#">Hồ sơ cá nhân</a>),
            key: '0'
        },
        {
            label: (<a href="#">Cài đặt</a>),
            key: '1'
        },
        { type: 'divider' },
        {
            label: (
                <span className='text-red-500' onClick={handleLogout}>Đăng xuất</span>
            ),
            key: '3'
        }
    ]
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
                <Select
                    defaultValue={farmId}
                    style={{
                        width: 120,
                    }}
                    onChange={handleChange}
                    options={farms.map(item => ({
                        value: item.id, label: item.name
                    }))}
                />

                <IoNotificationsOutline className="rounded-full p-2 text-[40px] hover:cursor-pointer hover:shadow-inner hover:shadow-black" />

                <Dropdown menu={{ items }} trigger={['click']}>
                    <div
                        className="size-9 rounded-full border shadow-sm shadow-slate-500 cursor-pointer"
                        style={{
                            backgroundImage: `url(${bg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                    </div>
                </Dropdown>
            </div>
        </header>
    )
}

export default Header
