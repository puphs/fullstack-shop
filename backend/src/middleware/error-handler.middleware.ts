import ApiError from '../error/ApiError';
import { ErrorHandlingMiddleware } from '../types/types';

const errorHandler: ErrorHandlingMiddleware = (err, req, res, next) => {
	return res.status(err.code || 500).json({ message: err.message });
};

export default errorHandler;
