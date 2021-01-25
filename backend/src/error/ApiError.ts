import { Code, Response } from '../controllers/controller-helper';
import ErrorBase from './ErrorBase';

const getCode = (response?: Response) => response?.code ?? Code.ERROR;

const getError = (httpCode: number, defaultMessage: string, response?: Response): ApiError => {
	const code = getCode(response);
	if (response) {
		const { message, data } = response;
		return new ApiError(httpCode, { message, data, code });
	} else {
		return new ApiError(httpCode, {
			message: defaultMessage,
			code,
		});
	}
};

export default class ApiError extends ErrorBase {
	constructor(code: number, response: Response) {
		super('ApiError', response, code);
	}

	static badRequest(response?: Response) {
		return getError(400, 'Invalid data', response);
	}

	static internal(response?: Response) {
		return getError(500, 'Server error. Please try again later', response);
	}

	static authError(response?: Response) {
		return getError(401, 'Authorization error', response);
	}
}
