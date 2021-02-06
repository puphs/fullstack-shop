import Router from 'express';
import { authController } from '../controllers/auth.controller';
import { authValidators } from '../validators/auth.validators';

const router = Router();

// api/auth
router.post('/register', authValidators.register, authController.register);
router.post('/login', authValidators.login, authController.login);

export default router;
