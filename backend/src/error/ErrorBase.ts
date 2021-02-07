import { Response } from '../controllers/controller-helper';

export default class ErrorBase {
	name: string;
	response: Response;
	httpCode: number;
	caughtError: any;

	constructor(name: string, response: Response, httpCode: number, caughtError?: any) {
		this.name = name;
		this.response = response;
		this.httpCode = httpCode;
		this.caughtError = caughtError;
	}
}
