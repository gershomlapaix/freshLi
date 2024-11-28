import express from 'express'
import ApiResponse from '../payload/ApiResponse.js';
import Product from '../models/Product.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { Transactions } from '../models/Transaction.js';

const transactionRouter = express.Router();

transactionRouter.get('/', async (req, res) => {
    try {
        const transactions = await Transactions.getAll();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

transactionRouter.post('/', authenticateToken, async (req, res) => {
    if (req.user.role !== 'buyer') return res.status(403).json(ApiResponse.forbidden('Access denied'));

    const product = await Product.getById(req.body.productId);
    if (!product.length > 0) {
        return res.status(404).json(ApiResponse.notFound('Product not found'));
    }

    if (product[0]?.quantity < req.body.quantity) {
        return res.status(400).json(ApiResponse.error('Insufficient quantity'));
    }

    try {
        const newTransaction = await Transactions.create({
            product_id: req.body.productId,
            buyer_id: req.user.id,
            quantity: req.body.quantity,
            total: Number(product[0]?.price) * Number(req.body.quantity),
            status: 'PENDING',
            description: req.body.description
        });
        res.status(201).json(ApiResponse.success('Transaction created successfully', newTransaction));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// get buyer transactions
transactionRouter.get('/buyer', authenticateToken, async (req, res) => {
    if (req.user.role !== 'buyer') return res.status(403).json(ApiResponse.forbidden('Access denied'));

    try {
        const transactions = await Transactions.getBuyerTransactions(req.user.id);
        res.json(ApiResponse.success('Transactions fetched successfully', transactions));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// complete transaction
transactionRouter.patch('/:id/complete', authenticateToken, async (req, res) => {
    if (req.user.role !== 'farmer') return res.status(403).json(ApiResponse.forbidden('Access denied'));    
    

    const transaction = await Transactions.findById(req.params.id);
    if (!transaction) {
        return res.status(404).json(ApiResponse.notFound('Transaction not found'));
    }

    if (transaction.status === 'COMPLETED') {
        return res.status(400).json(ApiResponse.error('Transaction already completed'));
    }

    try {
        await Transactions.completeTransaction(req.params.id);
        res.json(ApiResponse.success('Transaction completed successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// cancel transaction
transactionRouter.patch('/:id/cancel', authenticateToken, async (req, res) => {
    if (req.user.role !== 'farmer') return res.status(403).json(ApiResponse.forbidden('Access denied'));

    const transaction = await Transactions.findById(req.params.id);
    if (!transaction) {
        return res.status(404).json(ApiResponse.notFound('Transaction not found'));
    }

    if (transaction.status === 'CANCELLED') {
        return res.status(400).json(ApiResponse.error('Transaction already cancelled'));
    }

    try {
        await Transactions.cancelTransaction(req.params.id);
        res.json(ApiResponse.success('Transaction cancelled successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// get transactions made on farmer's products
transactionRouter.get('/farmer', authenticateToken, async (req, res) => {
    if (req.user.role !== 'farmer') return res.status(403).json(ApiResponse.forbidden('Access denied'));

    try {
        const transactions = await Transactions.getFarmerTransactions(req.user.id);
        res.json(ApiResponse.success('Transactions fetched successfully', transactions));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default transactionRouter