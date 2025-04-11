/* eslint-disable no-console */
import app from './src/app.js';
import { env } from './src/helpers/environment.js';

import { loadSchedules } from './src/services/scheduleManager.js'

const PORT = env.PORT || 8080

loadSchedules()

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on port ${PORT}`)
    console.log('Document available at:', `http://localhost:${PORT}/api-docs`)
})

process.on('SIGINT', () => {
    server.close(() => console.log('Exit server'))
})
