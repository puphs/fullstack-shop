import { Router } from 'express';
import { shoppingCartController } from '../controllers/shopping-cart.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { shoppingCartValidators } from '../validators/shopping-cart.validators';

const router = Router();

// api/shopping-cart
router.get('/', authMiddleware, shoppingCartController.getItems);
router.post('/', authMiddleware, shoppingCartValidators.addItem, shoppingCartController.addItem);
router.delete('/:itemId', authMiddleware, shoppingCartController.removeItem);
router.delete('/', authMiddleware, shoppingCartController.removeAllItems);

export default router;
