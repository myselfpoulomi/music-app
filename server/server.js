import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const port = process.env.PORT || 5101;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});