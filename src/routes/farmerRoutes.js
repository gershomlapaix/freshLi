import express from 'express'
import Product from '../models/Product.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const farmerRouter = express.Router();

farmerRouter.post('/add-product', authenticateToken, async (req, res) => {
  if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Access denied' });

  const { name, description, price, quantity } = req.body;
  try {
    await Product.create({
      name,
      description,
      price,
      quantity,
      farmerId: req.user.id
    });
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err });
  }
});

export default farmerRouter