import { Router } from 'express';
import { accountController } from '../controllers/account.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { accountValidators } from '../validators/account.validators';

const router = Router();

// api/account
router.get('/', authMiddleware, accountController.getAccount);
router.put('/name', authMiddleware, accountValidators.changeName, accountController.changeName);
router.put(
	'/password',
	authMiddleware,
	accountValidators.changePassword,
	accountController.changePassword
);

export default router;
