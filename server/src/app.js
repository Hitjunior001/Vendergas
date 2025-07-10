const express = require('express');
const router = require('./routes');
const connectDB = require('./config/database');

const app = express();

connectDB();

app.use(express.json()); 
app.use('/', router);

module.exports = app;