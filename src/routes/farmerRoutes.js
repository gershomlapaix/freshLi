import express from 'express'
import Product from '../models/Product.js';
import ApiResponse from '../payload/ApiResponse.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const farmerRouter = express.Router();

farmerRouter.post('/add-product', authenticateToken, async (req, res) => {
  if (req.user.role !== 'farmer') return res.status(403).json(ApiResponse.forbidden('Access denied'));

  const { name, description, price, quantity } = req.body;
  try {
    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      farmerId: req.user.id
    });
    res.json(ApiResponse.success('Product added successfully', product));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Error adding product', err));
  }
});

export default farmerRouter

