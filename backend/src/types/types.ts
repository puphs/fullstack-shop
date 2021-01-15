import { NextFunction, Request, Response } from 'express';

export type DecodedTokenType = { userId: number };

type ImprovedRequest = {
	token?: DecodedTokenType;
} & Request;

export type Middleware = (req: ImprovedRequest, res: Response, next: NextFunction) => void;
