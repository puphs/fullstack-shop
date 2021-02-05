import { check } from 'express-validator';
import { Middleware } from '../types/types';
import { handleValidationErrors, stringValidation } from './utils';

const register: Array<Middleware> = [
	check('email').isEmail().withMessage('Incorrect email'),

	stringValidation(check('name'), 'Name'),

	stringValidation(check('password'), 'Password')
		.isLength({ min: 6, max: 24 })
		.withMessage('Password length must be more than 6 and less than 24 characters'),

	handleValidationErrors,
];

const login: Array<Middleware> = [
	check('email').exists().withMessage('Email is empty'),

	stringValidation(check('password'), 'Password'),

	handleValidationErrors,
];

export const authValidators = {
	register,
	login,
};
