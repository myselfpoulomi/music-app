import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors"
import artistRouter from './router/artistRouter.js';
import albumRouter from './router/albumRouter.js';
import songRouter from './router/songRouter.js';
import UserRouter from './router/UserRouter.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5101;
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())
app.use(cors({
    origin: '*',
}));

app.use("/", artistRouter)
app.use("/", albumRouter)
app.use("/", songRouter)
app.use("/", UserRouter)

mongoose.connect(MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log("Connected to Database");
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Database connection error:", err);
});