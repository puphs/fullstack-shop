import { Code, createResponse } from '../controllers/controller-helper';
import ApiError from '../error/ApiError';
import { ErrorHandlingMiddleware } from '../types/types';

const errorHandler: ErrorHandlingMiddleware = (err, req, res, next) => {
	return res.status(err.httpCode || 500).json(err.response);
};

export default errorHandler;
