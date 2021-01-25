import { Response } from '../controllers/controller-helper';

export default class ErrorBase {
	name: string;
	response: Response;
	httpCode: number;

	constructor(name: string, response: Response, httpCode: number) {
		this.name = name;
		this.response = response;
		this.httpCode = httpCode;
	}
}
