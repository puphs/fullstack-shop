import { NextFunction, Request, Response } from 'express';
import ErrorBase from '../error/ErrorBase';

export type DecodedTokenType = { userId: string };

type ImprovedRequest = {
	token?: DecodedTokenType;
} & Request;

export type Middleware = (req: ImprovedRequest, res: Response, next: NextFunction) => void;
export type ErrorHandlingMiddleware = (
	err: ErrorBase,
	req: ImprovedRequest,
	res: Response,
	next: NextFunction
) => void;
