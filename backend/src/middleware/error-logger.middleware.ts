import ErrorBase from '../error/ErrorBase';
import { ErrorHandlingMiddleware } from '../types/types';

const errorLogger: ErrorHandlingMiddleware = (err, req, res, next) => {
	if (err instanceof ErrorBase) {
		if (err.caughtError) {
			console.error(err);
		}
	}
	return next(err);
};

export default errorLogger;
