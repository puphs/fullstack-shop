import { check } from 'express-validator';
import { Middleware } from '../types/types';
import { handleValidationErrors } from './utils';

const addItem: Array<Middleware> = [
	check('itemId').exists().withMessage('ItemId is empty'),

	check('size').exists().withMessage('size is empty'),

	handleValidationErrors,
];

export const shoppingCartValidators = {
	addItem,
};
