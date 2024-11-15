import express from 'express'
import Product from '../models/Product.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import ApiResponse from '../payload/ApiResponse.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(ApiResponse.success('Products fetched successfully', products));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Error fetching products', err));
  }
});

// get farmer products
productRouter.get('/farmer', authenticateToken, async (req, res) => {
  if (req.user.role !== 'farmer') return res.status(403).json(ApiResponse.forbidden('Access denied'));

  try {
    const products = await Product.getFarmerProducts(req.user.id);
    res.json(ApiResponse.success('Products fetched successfully', products));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Error fetching products', err));
  }
});

export default productRouter