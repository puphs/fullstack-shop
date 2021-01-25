import { validationResult } from 'express-validator';
import { Request } from 'express-validator/src/base';
import ApiError from '../error/ApiError';
import { Middleware } from '../types/types';

export const getErrorMessages = (req: Request): Array<string> => {
	return validationResult(req)
		.array()
		.map((err) => err.msg);
};

export const handleValidationErrors: Middleware = (req, res, next) => {
	const errors = getErrorMessages(req);
	const firstError = errors[0];
	if (firstError) {
		next(ApiError.badRequest({ message: firstError }));
	} else {
		next();
	}
};
