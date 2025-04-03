import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <div className="flex h-dvh items-center justify-between">
            <div className="mb-auto w-1/2 px-40 pt-20">
                <p className="text-[60px] font-bold leading-snug text-primary">Nông trại</p>
                <p className="text-[60px] font-bold leading-snug text-primary">Thông minh</p>
                <p className="mb-4 mt-14 text-xl font-semibold text-primary">Ứng dụng IoT để nâng cao năng suất</p>
                <p className="mb-12">
          Nông trại thông minh ứng dụng công nghệ IoT để tối ưu hóa sản xuất, tiết kiệm tài nguyên và nâng cao
          năng suất. Giải pháp hiện đại giúp bạn quản lý trang trại dễ dàng, bền vững và hiệu quả hơn bao giờ
          hết!
                </p>
                <Link to={'/login'} className="btn-primary">
          Khám phá ngay
                </Link>
            </div>
            <div className="w-1/2">
                <img src={'https://res.cloudinary.com/dnzytzmek/image/upload/v1743129971/vtyabzzqaavwmplf6a2r.png'} alt="" />
            </div>
        </div>
    )
}

export default LandingPage
