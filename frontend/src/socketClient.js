import { io } from 'socket.io-client'
import { env } from '~/utils/environment'

export const socketIoInstance = io(env.API_ROOT)
