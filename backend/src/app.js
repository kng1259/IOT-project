/* eslint-disable no-console */
import express from 'express'
import router from './routes/index.js'
import cors from 'cors'
import ApiError from './helpers/ApiError.js'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import { errorHandlingMiddleware } from './middlewares/errorHandler.js'
import swagger from './swagger.js'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import { StatusCodes } from 'http-status-codes'
import { env } from './helpers/environment.js'
import { Server } from 'socket.io'
import http from 'http'
import { fetchChartDataSocket, fetchStatisticsSocket } from './sockets/index.js'
import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
    connectionString: env.DATABASE_URL
})

const app = express()

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})

const corsOptions = {
    origin: function (origin, callback) {
        if (env.NODE_ENV === 'development') {
            return callback(null, true)
        }

        if (origin === undefined || env.WHITELIST_DOMAINS.split(',').includes(origin)) {
            return callback(null, true)
        }
        return callback(null, true)
    // return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`))
    },
    optionsSuccessStatus: 200,
    credentials: true
}

if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
} else {
    app.use(morgan('combined'))
    app.use(helmet())
}

app.use(cookieParser())

app.use(compression())
app.use(express.json())
app.use(cors(corsOptions))
app.use(
    express.urlencoded({
        extended: true
    })
)

swagger(app)
app.use('/api/v1', router)
app.all('*', (req, res, next) => {
    // disable stack trace for stupid error
    const err = new ApiError(404, 'Not Found', true, '')
    next(err)
})
app.use(errorHandlingMiddleware)

const socketAreaMap = new Map()

const server = http.createServer(app)
const io = new Server(server, { cors: corsOptions })
io.on('connection', (socket) => {

    socket.on('FE_DASHBOARD_FETCH_STATISTICS', async (areaId) => {
        socketAreaMap.set(socket.id, { socket, areaId: parseInt(areaId) })
        fetchStatisticsSocket(socket, parseInt(areaId))
    })

    socket.on('FE_DASHBOARD_FETCH_CHART_DATA', async (areaId) => {
        socketAreaMap.set(socket.id, { socket, areaId: parseInt(areaId) })
        fetchChartDataSocket(socket, parseInt(areaId))
    })

    socket.on('disconnect', () => {
        socketAreaMap.delete(socket.id)
    })

})

const listenForDatabaseChanges = async () => {
    const client = await pool.connect()

    await client.query('LISTEN record_changed')

    client.on('notification', async () => {
        try {
            for (const { socket, areaId } of socketAreaMap.values()) {
                fetchStatisticsSocket(socket, areaId)
                fetchChartDataSocket(socket, areaId)
            }
        } catch (error) {
            console.error('Lỗi xử lý dữ liệu:', error)
        }
    })

    client.on('error', (err) => {
        console.error('Lỗi kết nối PostgreSQL:', err)
    })
}

listenForDatabaseChanges()

export default server
