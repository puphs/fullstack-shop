export type Response = {
	data?: { [key: string]: any };
	message: string;
	code?: Code;
};

export const enum Code {
	OK = 0,
	ERROR = 1,
	TOKEN_EXPIRED = 2,
}

// code is Code.OK by default
export const createResponse = (res: Response): Response => ({
	data: res.data ?? {},
	message: res.message,
	code: res.code ?? Code.OK,
});
