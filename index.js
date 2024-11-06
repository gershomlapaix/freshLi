import express, { json } from 'express';
import { db } from './src/config/db.js';
import authRouter from './src/routes/authRoutes.js';

const app = express();

app.use(json());

app.use("/auth", authRouter)

const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});