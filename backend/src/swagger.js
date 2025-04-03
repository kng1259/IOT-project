import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { env } from './helpers/environment.js'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'IoT Backend API',
            description: 'API endpoints for IoT backend on Swagger',
            version: '1.0.0'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.js', './src/routes/**/*.js'],
    requestInterceptor: function (request) {
        request.headers.Origin = `http://localhost:${env.PORT}`
        return request
    },
    url: `http://localhost:${env.PORT}/api-docs`
}

const swaggerSpec = swaggerJsdoc(options)

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default swaggerDocs
