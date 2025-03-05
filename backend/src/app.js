import express from 'express'
import router from './routes/index.js'
import cors from 'cors'
import ApiError from './helpers/ApiError.js'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import errorHandler from './middlewares/errorHandler.js'
import swagger from './swagger.js'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

const app = express()
const corsOptions = {
  origin: process.env.NODE_ENV !== 'production' ? '*' : process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
  credentials: true
}

if (process.env.NODE_ENV === 'development') {
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
app.use(errorHandler)

export default app
