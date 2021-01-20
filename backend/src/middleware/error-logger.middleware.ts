import { ErrorHandlingMiddleware } from '../types/types';

const errorLogger: ErrorHandlingMiddleware = (err, req, res, next) => {
	console.error(err);
	return next(err);
};

export default errorLogger;
