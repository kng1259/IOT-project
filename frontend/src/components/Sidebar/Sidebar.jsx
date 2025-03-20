import { GoHome } from 'react-icons/go'
import { TbReportAnalytics } from 'react-icons/tb'
import { IoSettingsOutline } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
    const location = useLocation()

    const getLinkClass = (path) => {
        return location.pathname === path
            ? 'btn-primary flex items-center gap-2 px-4 py-2 bg-secondary text-white shadow-inner shadow-white'
            : 'btn-primary flex items-center gap-2 px-4 py-2'
    }

    return (
        <div className='font h-sceen bg-primary py-6 text-white'>
            <div className='sticky top-10'>
                <header className='mt-4 text-center text-5xl'>Zagan</header>
                <ul className='mt-14 space-y-3 px-4'>
                    <Link to={'/dashboard'} className={getLinkClass('/dashboard')}>
                        <GoHome className='text-3xl font-bold' />
                        <span className='text-lg'>Bảng điều khiển</span>
                    </Link>
                    <Link to={'/config'} className={getLinkClass('/config')}>
                        <IoSettingsOutline className='text-3xl font-bold' />
                        <span className='text-lg'>Thiết lập</span>
                    </Link>
                    <Link to={'/report'} className={getLinkClass('/report')}>
                        <TbReportAnalytics className='text-3xl' />
                        <span className='text-lg'>Báo cáo</span>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
