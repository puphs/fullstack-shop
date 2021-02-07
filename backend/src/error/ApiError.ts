import { Code, Response } from '../controllers/controller-helper';
import ErrorBase from './ErrorBase';

const getCode = (response?: Response) => response?.code ?? Code.ERROR;

const getError = (
	err: any,
	httpCode: number,
	defaultMessage: string,
	response?: Response
): ApiError => {
	const code = getCode(response);
	if (response) {
		const { message, data } = response;
		return new ApiError(httpCode, { message, data, code }, err);
	} else {
		return new ApiError(
			httpCode,
			{
				message: defaultMessage,
				code,
			},
			err
		);
	}
};

export default class ApiError extends ErrorBase {
	constructor(code: number, response: Response, err: any) {
		super('ApiError', response, code, err);
	}

	static badRequest(response?: Response) {
		return getError(null, 400, 'Invalid data', response);
	}

	static internal(err: any, response?: Response) {
		return getError(err, 500, 'Server error. Please try again later', response);
	}

	static authError(response?: Response) {
		return getError(null, 401, 'Authorization error', response);
	}
}
