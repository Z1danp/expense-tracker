import { Router } from 'express';
import { login, register } from './auth.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, (req, res) => {
    return res.json({
        success: true,
        message: 'Authorized',
        userId: req.userId
    })
})

export default router;
