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

    if (origin === undefined | env.WHITELIST_DOMAINS.split(',').includes(origin)) {
      return callback(null, true)
    }
    return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`))
  },
  optionsSuccessStatus: 200,
  credentials: true
}

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
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

export default app
