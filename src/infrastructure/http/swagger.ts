import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {Router} from 'express';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Just Chilling API',
            version: '1.0.0',
            description: 'Documentación de la API Just Chilling',
        },
        servers: [
            {
                url: 'http://localhost:' + (process.env.TCP_PORT || '3000'),
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/**/*.ts', "./dist/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerRouter = Router();

if (process.env.NODE_ENV === 'development') {
    swaggerRouter.use('/', swaggerUi.serve);
    swaggerRouter.get('/', swaggerUi.setup(swaggerSpec));
} else {
    swaggerRouter.use((_req, res) => {
        res.status(404).send('Not Found');
    });
}

export default swaggerRouter;
