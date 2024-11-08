const express = require('express');
const cors = require('cors');

const userRoute = require('./api/route/userRoute')
const swaggerSpec = require('./api/config/swaggerConfig');
const swaggerUi = require('swagger-ui-express');
const { errorMiddlewear } = require('./api/middlewear/errorMiddlewear');


const app = express();

app.use(express.json());
app.use(cors());

// TODO : add authenticate middlewear
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
app.use('/users', userRoute);
app.use(errorMiddlewear)

module.exports = app;
