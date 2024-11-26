import express from 'express'
import Product from '../models/Product.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import ApiResponse from '../payload/ApiResponse.js';
import { Category } from '../models/Category.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(ApiResponse.success('Products fetched successfully', products));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Error fetching products', err));
  }
});

// get farmer's products
productRouter.get('/farmer', authenticateToken, async (req, res) => {
  if (req.user.role !== 'farmer') return res.status(403).json(ApiResponse.forbidden('Access denied'));

  try {
    const products = await Product.getFarmerProducts(req.user.id);
    res.json(ApiResponse.success('Products fetched successfully', products));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Error fetching products', err));
  }
});

// get products by category
productRouter.get('/category/:id', async (req, res) => {

  const category = await Category.getById(req.params.id);
  if (!category.length) {
    return res.status(404).json(ApiResponse.notFound('Category not found'));
  }

  try {
    const products = await Product.getByCategory(req.params.id);

    if (!products.length > 0) {
      return res.status(404).json(ApiResponse.notFound('Products not found'));
    }

    res.json(ApiResponse.success('Products fetched successfully', products));

  } catch (err) {
    res.status(500).json(ApiResponse.error('Error fetching products', err));
  }
});

productRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);

    if (!product) {
      return res.status(404).json(ApiResponse.notFound('Product not found'));
    }

    res.json(ApiResponse.success('Product fetched successfully', product));

  } catch (err) {
    res.status(500).json(ApiResponse.error('Error fetching products', err));
  }
});

export default productRouter