const express = require('express');
const users = require('./routes/users');
const auth = require("./routes/auth");
const connectDB = require('./config/database');

const app = express();

connectDB();

app.use(express.json()); 

app.use("/api/users", users);
app.use("/api/auth", auth);

module.exports = app;