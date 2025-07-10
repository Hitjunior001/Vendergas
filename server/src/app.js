const express = require('express');
const users = require('./routes/users');
const auth = require("./routes/auth");
const connectDB = require('./config/database');
const errorMiddleware = require('./middlewares/error');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests."
});

app.use(limiter);

const app = express();

connectDB();

app.use(express.json()); 

app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(errorMiddleware);

module.exports = app;