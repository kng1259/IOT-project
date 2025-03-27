import { IoFilter } from 'react-icons/io5'
import { IoNotificationsOutline } from 'react-icons/io5'
import { Dropdown } from 'antd'

import bg from '../../assets/images/bgFarm.png'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice'
import { Confirm } from '~/utils/sweet'
import { fetchListAreasAPI, fetchListFarmsAPI } from '~/apis'
import { useEffect, useState } from 'react'
import { selectActiveAreaId, selectActiveFarmId, setDashboardAreaId, setDashboardFarmId } from '~/redux/dashboard/dashboardSlice'

function Header() {
    const dispatch = useDispatch()
    const activeFarmId = useSelector(selectActiveFarmId)
    const activeAreaId = useSelector(selectActiveAreaId)

    const [farms, setFarms] = useState([])

    const [areas, setAreas] = useState([])

    const currentUser = useSelector(selectCurrentUser)

    useEffect(() => {
        fetchListFarmsAPI(currentUser.user_id).then(data => {
            setFarms(data)
            if (data.length) {
                dispatch(setDashboardFarmId(data[0].id))
            }
        })
    }, [currentUser.user_id, dispatch])

    useEffect(() => {
        if (activeFarmId) {
            fetchListAreasAPI(activeFarmId).then((data) => {
                setAreas(data)
                if (data.length && !activeAreaId) {
                    dispatch(setDashboardAreaId(data[0].id))
                }
            })
        } else {
            setAreas([])
        }

    }, [activeAreaId, activeFarmId, dispatch])

    const handleChangeFarmId = (event) => {
        dispatch(setDashboardFarmId(event.target.value))
    }

    const handleChangeAreaId = (event) => {
        dispatch(setDashboardAreaId(event.target.value))
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
                <select className="cursor-pointer rounded-lg px-4 py-1 shadow outline-none" onChange={handleChangeFarmId} value={activeFarmId}>
                    <option value=""> -- Chọn nông trại -- </option>
                    {farms.map(farm => <option key={farm.id} value={farm.id}>{farm.name}</option>)}
                </select>
                <select className="cursor-pointer rounded-lg px-4 py-1 shadow outline-none" onChange={handleChangeAreaId} value={activeAreaId}>
                    {areas.map(area => <option key={area.id} value={area.id}>{area.name}</option>)}
                </select>
            </div>

            {/* avatar */}
            <div className="flex items-center gap-6">
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
