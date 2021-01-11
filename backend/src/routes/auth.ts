import Router from 'express';
import authControllers from '../controllers/auth';
import authValidators from '../validators/auth';

const router = Router();

// api/auth/register
router.post('/register', authValidators.register, authControllers.register);

// api/auth/login
router.post('/login', authValidators.login, authControllers.login);

export default router;
