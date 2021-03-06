import { Router } from 'express';
import path from 'path';
import config from '../config/config';
import authRoutes from './auth.routes';
import shoppingCartRoutes from './shopping-cart.routes';
import shopRoutes from './shop.routes';
import accountRoutes from './account.routes';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/shopping-cart', shoppingCartRoutes);
router.use('/api/shop', shopRoutes);
router.use('/api/account', accountRoutes);

router.get('*', (req, res) => {
	res
		.status(200)
		.sendFile(path.resolve('./', path.normalize(config.server.clientDir), 'index.html'));
});

export default router;
