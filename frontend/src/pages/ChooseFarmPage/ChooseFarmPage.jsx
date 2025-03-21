import { Button, Radio } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchListFarmsAPI } from '~/apis'
import { selectCurrentUser } from '~/redux/user/userSlice'

function ChooseFarmPage() {
    const [farmId, setFarmId] = useState('1')
    const [farms, setFarms] = useState([])

    const currentUser = useSelector(selectCurrentUser)
    const navigate = useNavigate()

    useEffect(() => {
        fetchListFarmsAPI(currentUser.user_id).then(data => setFarms(data))
    }, [currentUser.user_id])

    return (
        <div>
            <div className='text-gray-400 font-medium'>Chọn 1 nông trại mà bạn muốn quản lý:</div>
            <Radio.Group
                value={farmId}
                options={farms.map(item => ({
                    value: item.id, label: item.name
                }))}
                onChange={(event) => { setFarmId(event.target.value)}}
                className='ml-4 my-2'
            />
            <br />
            <Button onClick={() => { navigate(`/dashboard?farmId=${farmId}`)}}>Xác nhận</Button>
        </div>
    )
}

export default ChooseFarmPage