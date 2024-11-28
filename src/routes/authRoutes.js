import express from 'express'
import { register, login } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default authRouter