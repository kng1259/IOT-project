import schedule from 'node-schedule'
import { PrismaClient } from '@prisma/client'
import moment from 'moment-timezone'
import { callDeviceMethod } from './iotDevice.service.js'
import ApiError from '../helpers/ApiError.js'

const prisma = new PrismaClient()
let activeJobs = new Map()
let lastUpdatedAt = null

function convertDayToNumber(day) {
    const days = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6
    }
    return days[day] ?? -1
}

export async function loadSchedules() {
    console.log('Đang tải lại lịch trình...')
    // join with area to get farmId
    const schedules = await prisma.schedule.findMany({
        include: {
            area: {
                select: {
                    farmId: true
                }
            }
        },
        where: lastUpdatedAt ? { updatedAt: { gt: lastUpdatedAt } } : {}
    })
    console.log(`Số lượng lịch trình lấy được: ${schedules.length}`)

    if (schedules.length === 0) return

    //nếu xóa lịch->hủy job
    const currentJobKeys = new Set(schedules.map((sch) => sch.id)) // Tạo set các key job hiện tại
    const jobsToCancel = []

    // Kiểm tra xem các job hiện tại có lịch trình nào không còn trong cơ sở dữ liệu
    activeJobs.forEach((jobs, jobKey) => {
        if (!currentJobKeys.has(jobKey)) {
            jobs.forEach((job) => job.cancel())
            jobsToCancel.push(jobKey)
        }
    })
    jobsToCancel.forEach((jobKey) => activeJobs.delete(jobKey))

    lastUpdatedAt = new Date()
    schedules.forEach((sch) => {
        const jobKey = sch.id
        // bring farmId out of nested area
        sch.farmId = sch.area.farmId
        const days =
            sch.frequency.length > 0 ? sch.frequency.map((day) => convertDayToNumber(day)) : [0, 1, 2, 3, 4, 5, 6] // Mặc định tưới hàng ngày nếu frequency rỗng
        const [startHour, startMinute] = sch.startTime.split(':').map(Number)
        const [endHour, endMinute] = sch.endTime.split(':').map(Number)

        if (activeJobs.has(jobKey)) {
            activeJobs.get(jobKey).forEach((job) => job.cancel())
        }

        const startRule = new schedule.RecurrenceRule()
        startRule.dayOfWeek = days
        startRule.hour = startHour
        startRule.minute = startMinute
        startRule.tz = 'Asia/Ho_Chi_Minh'
        const startJob = schedule.scheduleJob(startRule, async () => {
            console.log(`Bắt đầu ${sch.activity} tại khu vực ${sch.areaId}`)
            try {
                await callDeviceMethod(`START_${sch.activity}`, sch.farmId, sch.areaId, 100)
            } catch (error) {
                console.error(`Lỗi khi gọi phương thức START_${sch.activity} tại khu vực ${sch.areaId}:`, error)
                throw new ApiError(error.statusCode, error.message)
            }
            await saveLog(sch, 'START')
        })

        const endRule = new schedule.RecurrenceRule()
        endRule.dayOfWeek = days
        endRule.hour = endHour
        endRule.minute = endMinute
        endRule.tz = 'Asia/Ho_Chi_Minh'
        const endJob = schedule.scheduleJob(endRule, async () => {
            console.log(`Kết thúc ${sch.activity} tại khu vực ${sch.areaId}`)
            try {
                await callDeviceMethod(`STOP_${sch.activity}`, sch.farmId, sch.areaId)
            } catch (error) {
                console.error(`Lỗi khi gọi phương thức STOP_${sch.activity} tại khu vực ${sch.areaId}:`, error)
            }
            await saveLog(sch, 'STOP')
        })
        activeJobs.set(jobKey, [startJob, endJob])
    })

    console.log('Lịch trình tự động đã cập nhật!')
    //lastUpdatedAt = new Date(moment().tz("Asia/Ho_Chi_Minh").format('YYYY-MM-DD HH:mm:ss'));
}

async function saveLog(schedule, action) {
    try {
        await prisma.deviceLog.create({
            data: {
                action: `${action}_${schedule.activity}`,
                //timestamp:  moment().tz("Asia/Ho_Chi_Minh").toDate(),
                timestamp: new Date(),
                deviceType: /bơm|tưới/i.test(schedule.activity) ? 'Máy bơm' : 'Đèn',
                note: `Executed action: ${action}`,
                areaId: schedule.areaId
            }
        })
        console.log(`Log ${action} đã được lưu.`)
    } catch (error) {
        console.error('Lỗi lưu log:', error)
    }
}

setInterval(loadSchedules, 60 * 1000)
loadSchedules()
