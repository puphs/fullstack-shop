import { Router } from 'express';
import authRoutes from './auth.routes';
import shoppingCartRoutes from './shopping-cart.routes';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/shopping-cart', shoppingCartRoutes);

export default router;
