import Router from 'express';
import authControllers from '../controllers/auth.controller';
import authValidators from '../validators/auth.validators';

const router = Router();

// api/auth/register
router.post('/register', authValidators.register, authControllers.register);

// api/auth/login
router.post('/login', authValidators.login, authControllers.login);

export default router;
