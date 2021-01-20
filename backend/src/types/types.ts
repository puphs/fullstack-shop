import { NextFunction, Request, Response } from 'express';
import ErrorBase from '../error/ErrorBase';

export type DecodedToken = { userId: string };

type ImprovedRequest = {
	token?: DecodedToken;
} & Request;

export type Middleware = (req: ImprovedRequest, res: Response, next: NextFunction) => void;
export type ErrorHandlingMiddleware = (
	err: ErrorBase,
	req: ImprovedRequest,
	res: Response,
	next: NextFunction
) => void;
