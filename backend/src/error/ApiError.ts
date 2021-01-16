import ErrorBase from './ErrorBase';

export default class ApiError extends ErrorBase {
	constructor(code: number, message: string) {
		super('ApiError', message, code);
	}

	static badRequest(message: string) {
		return new ApiError(400, message);
	}

	static internal(message?: string) {
		if (message) {
			return new ApiError(500, message);
		} else {
			return new ApiError(500, 'Server error. Please try again later.');
		}
	}

	static authError(message?: string) {
		if (message) {
			return new ApiError(401, message);
		} else {
			return new ApiError(401, 'Authorization error.');
		}
	}
}
