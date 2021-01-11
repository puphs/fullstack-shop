import { check } from 'express-validator';
import { Middleware } from 'express-validator/src/base';
import { handleValidationErrors } from './utils';

const register: Array<Middleware> = [
	check('email').isEmail().withMessage('Incorrect email'),

	check('pass')
		.isLength({ min: 6, max: 24 })
		.withMessage('Password length must be more than 6 and less than 24 characters'),

	handleValidationErrors,
];

const login: Array<Middleware> = [
	check('email').exists().withMessage('Email is empty'),

	check('pass').exists().withMessage('Password is empty'),

	handleValidationErrors,
];

export default {
	register,
	login,
};
