import { validationResult } from 'express-validator';
import { Middleware, Request } from 'express-validator/src/base';

export const getErrorMessages = (req: Request): Array<string> => {
	return validationResult(req)
		.array()
		.map((err) => err.msg);
};

export const handleValidationErrors: Middleware = (req, res, next) => {
	const firstError = getErrorMessages(req)[0];

	if (firstError.length) {
		res.status(400).json({
			message: firstError,
		});
	} else {
		next();
	}
};
