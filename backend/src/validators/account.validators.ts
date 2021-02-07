import { check } from 'express-validator';
import { Middleware } from '../types/types';
import { handleValidationErrors, stringValidation } from './utils';

const changeName: Array<Middleware> = [
	stringValidation(check('name'), 'Name')
		.isLength({ min: 3, max: 16 })
		.withMessage('Name length should be more than 3 and less than 16'),

	handleValidationErrors,
];

const changePassword: Array<Middleware> = [
	stringValidation(check('currentPassword'), 'Current password'),

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
