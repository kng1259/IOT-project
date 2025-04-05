import { IoIosCloseCircle } from 'react-icons/io'
import { TimePicker } from 'antd'
import { toast } from 'react-toastify'

function ModalCreateProfile({ toggleModal, handleCreateSchedule }) {
    const format = 'HH:mm'

    const handleSubmit = () => {
        const [startInput, endInput] = document.querySelectorAll('.ant-picker-input input') || []
        const startTime = startInput?.value || ''
        const endTime = endInput?.value || ''

        const frequency = [...document.querySelectorAll('.frequency li.active-LI')].map((li) => li.dataset.value)

        const activity = document.querySelector('.actionUL li.active-LI').dataset.value

        if (!startTime || !endTime || !frequency.length || !activity) {
            toast.error('Vui lòng điền đầy đủ thông tin')
            return
        }

        const scheduleData = {
            startTime,
            endTime,
            frequency,
            activity,
        }

        console.log('scheduleData', scheduleData)
        handleCreateSchedule(scheduleData)
    }

    const ActiveElementLI = (e) => {
        e.target.classList.toggle('active-LI')
        e.target.classList.toggle('bg-primary')
        e.target.classList.toggle('text-white')

        if (!e.target.parentElement.classList.contains('actionUL')) {
            return
        }

        const actionTypeList = document.querySelectorAll('.actionUL li')

        actionTypeList.forEach((li) => {
            if (li !== e.target) {
                li.classList.remove('active-LI')
                li.classList.remove('bg-primary')
                li.classList.remove('text-white')
            }
        })
    }

    return (
        <div className='relative w-1/2 rounded-xl bg-white px-16 pb-12 pt-6 shadow-sm'>
            <div className='mb-6 border-b-2 border-gray-400 pb-3'>
                <h1 className='text-center text-xl font-medium'>Hồ sơ mới</h1>
                <button
                    className='absolute right-5 top-4 flex items-center justify-center rounded-full'
                    onClick={toggleModal}
                >
                    <IoIosCloseCircle className='text-4xl text-gray-500 hover:text-gray-700' />
                </button>
            </div>
            <div className='mx-auto space-y-6'>
                <div className='grid md:grid-cols-2'>
                    <div className='group relative z-0 w-full'>
                        <label className='mb-2 block font-semibold'>Bắt đầu</label>
                        <TimePicker format={format} size='large' />
                    </div>
                    <div className='group relative z-0 w-full'>
                        <label className='mb-2 block font-semibold'>Kết thúc</label>
                        <TimePicker format={format} size='large' />
                    </div>
                </div>
                <div className=''>
                    <label className='mb-2 block font-semibold'>Thời điểm</label>
                    <ul className='frequency flex w-full flex-wrap gap-4'>
                        <li
                            onClick={ActiveElementLI}
                            data-value='Monday'
                            className='w-fit cursor-pointer rounded-lg border px-4 py-2 hover:shadow-inner hover:shadow-gray-300'
                        >
                            Thứ 2
                        </li>
                        <li
                            onClick={ActiveElementLI}
                            data-value='Tuesday'
                            className='w-fit cursor-pointer rounded-lg border px-4 py-2 hover:shadow-inner hover:shadow-gray-300'
                        >
                            Thứ 3
                        </li>
                        <li
                            onClick={ActiveElementLI}
                            data-value='Wednesday'
                            className='w-fit cursor-pointer rounded-lg border px-4 py-2 hover:shadow-inner hover:shadow-gray-300'
                        >
                            Thứ 4
                        </li>
                        <li
                            onClick={ActiveElementLI}
                            data-value={'Thursday'}
                            className='w-fit cursor-pointer rounded-lg border px-4 py-2 hover:shadow-inner hover:shadow-gray-300'
                        >
                            Thứ 5
                        </li>
                        <li
                            onClick={ActiveElementLI}
                            data-value={'Friday'}
                            className='w-fit cursor-pointer rounded-lg border px-4 py-2 hover:shadow-inner hover:shadow-gray-300'
                        >
                            Thứ 6
                        </li>
                        <li
                            onClick={ActiveElementLI}
                            data-value={'Saturday'}
                            className='w-fit cursor-pointer rounded-lg border px-4 py-2 hover:shadow-inner hover:shadow-gray-300'
                        >
                            Thứ 7
                        </li>
                        <li
                            onClick={ActiveElementLI}
                            data-value={'Sunday'}
                            className='w-fit cursor-pointer rounded-lg border px-4 py-2 hover:shadow-inner hover:shadow-gray-300'
                        >
                            Chủ nhật
                        </li>
                    </ul>
                </div>
                <div className=''>
                    <label className='mb-2 block font-semibold'>Hành động</label>
                    <ul className='actionUL flex w-full flex-wrap gap-4'>
                        <li
                            onClick={ActiveElementLI}
                            data-value='Tưới nước'
                            className='w-fit cursor-pointer rounded-lg border px-4 py-2 hover:shadow-inner hover:shadow-gray-300'
                        >
                            Tưới nước
                        </li>
                        <li
                            onClick={ActiveElementLI}
                            data-value='Chiếu đèn'
                            className='w-fit cursor-pointer rounded-lg border px-4 py-2 hover:shadow-inner hover:shadow-gray-300'
                        >
                            Chiếu đèn
                        </li>
                    </ul>
                </div>

                <button
                    onClick={handleSubmit}
                    className='float-right mt-4 w-fit rounded-lg bg-primary px-5 py-2.5 text-center font-medium text-white hover:scale-95 focus:outline-none'
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default ModalCreateProfile
