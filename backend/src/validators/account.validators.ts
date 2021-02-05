import { check } from 'express-validator';
import { Middleware } from '../types/types';
import { handleValidationErrors, stringValidation } from './utils';

const changeName: Array<Middleware> = [
	stringValidation(check('name'), 'Name').notEmpty().withMessage('Name should be not empty'),

	handleValidationErrors,
];

const changePassword: Array<Middleware> = [
	stringValidation(check('password'), 'Password'),

	stringValidation(check('newPassword'), 'New password')
		.withMessage('New password should be a string')
		.isLength({ min: 6, max: 24 })
		.withMessage('New password length must be more than 6 and less than 24 characters'),

	handleValidationErrors,
];

export const accountValidators = {
	changeName,
	changePassword,
};
