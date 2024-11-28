import express from 'express'
import Product from '../models/Product.js';
import ApiResponse from '../payload/ApiResponse.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { Farmer } from '../models/Farmer.js';

const farmerRouter = express.Router();

farmerRouter.post('/add-product', authenticateToken, async (req, res) => {
  if (req.user.role !== 'farmer') return res.status(403).json(ApiResponse.forbidden('Access denied'));

  const { name, description, price, quantity, unit, categoryId, imageUrl } = req.body;  

  try {
    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      farmerId: req.user.id,
      unit,
      categoryId,
      imageUrl:''
    });
    res.json(ApiResponse.success('Product added successfully', product)).status(201);
  } catch (err) {
    res.status(500).json(ApiResponse.error('Error adding product', err));
  }
});

// get all farmers
farmerRouter.get('/', authenticateToken, async (req, res) => {
  // if (req.user.role !== 'farmer') return res.status(403).json(ApiResponse.forbidden('Access denied'));

  try {
    const farmers = await Farmer.getAll();
    res.json(ApiResponse.success('Farmers fetched successfully', farmers));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Error fetching products', err));
  }
});

export default farmerRouter

