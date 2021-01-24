export type Response = {
	data?: { [key: string]: any };
	message: string;
	code: 0 | 1 | 2;
};

export const CODE = {
	OK: 0,
	ERROR: 1,
	TOKEN_EXPIRED: 2,
};

export const createResponse = (res: Response) => ({
	data: res.data ?? {},
	message: res.message,
	code: res.code,
});
