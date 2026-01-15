const express = require('express');
const cors = require('cors');
const connectDB = require('./lib/db');
const coockieParser = require('cookie-parser');
app = express();
require('dotenv').config();
require('./cron/reminderJob');



app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', "X-Requested-With"],
    credentials: true,
}));
app.use(coockieParser());
connectDB();


app.use('/api/auth', require('./route/authRoutes'));
app.use('/api/user', require('./route/userRoutes'));
app.use('/api/services', require('./route/serviceRoutes'));
app.use('/api/appointements', require('./route/appointementRoute'));
app.use('/api/password', require('./route/passwordRoute'));


app.listen(process.env.PORT, () => {
    console.log('Server is running on port 5000');
});