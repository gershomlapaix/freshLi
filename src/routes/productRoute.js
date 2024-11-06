// const express = require('express');
// const Product = require('../models/Product');
// const authenticateToken = require('../middleware/authMiddleware');

import express from 'express'
import Product from '../models/Product.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

export default productRouter