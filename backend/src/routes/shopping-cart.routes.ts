import { Router } from 'express';
import shoppingCart from '../controllers/shopping-cart.controller';
import auth from '../middleware/auth.middleware';
import shoppingCartValidators from '../validators/shopping-cart.validators';

const router = Router();

// api/shopping-cart
router.get('/', auth, shoppingCart.getItems);
router.post('/', auth, shoppingCartValidators.addItem, shoppingCart.addItem);
router.delete('/:itemIndex', auth, shoppingCart.removeItem);
router.delete('/', auth, shoppingCart.removeAllItems);

export default router;
