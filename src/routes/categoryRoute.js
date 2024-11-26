import express from 'express'
import { authenticateToken } from '../middleware/authMiddleware.js';
import ApiResponse from '../payload/ApiResponse.js';
import { Category } from '../models/Category.js';

const categoryRouter = express.Router();

// create category
categoryRouter.post('/', authenticateToken, async (req, res) => {
    if (req.user.role !== 'farmer') return res.status(403).json(ApiResponse.forbidden('Access denied'));

    try {
        const category = await Category.create(req.body);
        res.json(ApiResponse.success('Category created successfully', category));
    } catch (err) {
        res.status(500).json(ApiResponse.error('Error creating category', err));
    }
});

categoryRouter.get('/', authenticateToken, async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.json(ApiResponse.success('Categories fetched successfully', categories));
    } catch (err) {
        res.status(500).json(ApiResponse.error('Error fetching categories', err));
    }
}
);



export default categoryRouter
