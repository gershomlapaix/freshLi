import express, { json } from 'express';
import { db } from './src/config/db.js';
import authRouter from './src/routes/authRoutes.js';
import bodyParser from 'body-parser';
import productRouter from './src/routes/productRoute.js';
import farmerRouter from './src/routes/farmerRoutes.js';
import categoryRouter from './src/routes/categoryRoute.js';
import transactionRouter from './src/routes/transactionRoute.js';

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use("/api/category", categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/farmer', farmerRouter);
app.use('/api/transaction', transactionRouter);

const port = 5000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});