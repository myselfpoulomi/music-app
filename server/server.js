import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import artistRouter from './router/artistRouter.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5101;
const MONGO_URL = process.env.MONGO_URL

app.use("/",artistRouter)

mongoose.connect(MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log("Connected to Database");
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Database connection error:", err);
});