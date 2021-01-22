import { Router } from 'express';
import shopController from '../controllers/shop.controller';

const router = Router();

// api/shop
router.get('/item/:itemId', shopController.getShopItem);
router.get('/items', shopController.getShopItems);

export default router;
