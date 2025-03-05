/* eslint-disable no-console */
import app from './src/app.js'

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  console.log('Document available at:', `http://localhost:${PORT}/api-docs`)
})

process.on('SIGINT', () => {
  server.close(() => console.log('Exit server'))
})
