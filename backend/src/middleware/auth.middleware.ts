import { DecodedToken, Middleware } from '../types/types';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import config from '../config/config';
import ApiError from '../error/ApiError';
import { Code } from '../controllers/controller-helper';

export const authMiddleware: Middleware = (req, res, next) => {
	if (req.method == 'OPTIONS') {
		return next();
	}
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (token) {
			const decodedToken = jwt.verify(token, config.server.jwtSecret) as DecodedToken;
			req.token = decodedToken;
			return next();
		}
		next(ApiError.authError());
	} catch (err) {
		if (err instanceof TokenExpiredError) {
			return next(
				ApiError.authError({
					message: 'Session token expired. Please login again',
					code: Code.TOKEN_EXPIRED,
				})
			);
		}
		return next(ApiError.authError());
	}
};
