import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'IoT Backend API',
            description: 'API endpoints for IoT backend on Swagger',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.js', './src/routes/**/*.js'],
    requestInterceptor: function (request) {
        request.headers.Origin = `http://localhost:${process.env.PORT}`;
        return request;
    },
    url: `http://localhost:${process.env.PORT}/api-docs`,
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
