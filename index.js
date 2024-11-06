import express, { json } from 'express';
import { db } from './src/config/db.js';

const app = express();

app.use(json());

const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});