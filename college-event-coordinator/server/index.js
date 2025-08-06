import express from 'express'
import userApp from './routes/userRoutes.js';
import eventApp from './routes/eventRoutes.js';
import clubApp from './routes/clubRoutes.js';
import userProfileApp from './routes/userProfileRoutes.js';
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config();
const app=express();
const PORT=3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/user', userApp);
app.use('/api/events', eventApp);
app.use('/api/clubs', clubApp);
app.use('/api/users', userProfileApp);

app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
    connectDB();
})