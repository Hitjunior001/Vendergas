const express = require('express');

const users = require('./routes/users');
const auth = require('./routes/auth');
const enterprises = require('./routes/enterprise')
const products = require('./routes/product')
const clients = require('./routes/client')
const orders = require('./routes/order')

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');




const connectDB = require('./config/database');
const errorMiddleware = require('./middlewares/error');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND || 'http://localhost:5173', 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
}));

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests."
});

app.use(limiter);

connectDB();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        AuthToken: {
          type: 'apiKey',
          in: 'header',
          name: 'x-auth-token',
        },
      },
    },
    security: [
      {
        AuthToken: [],
      },
    ],
  },
  apis: [__dirname + '/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json()); 

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use('/api/enterprises', enterprises);
app.use('/api/products', products);
app.use('/api/clients', clients);
app.use('/api/orders', orders);



app.use(errorMiddleware);

module.exports = app;