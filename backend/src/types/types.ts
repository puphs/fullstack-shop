import { NextFunction, Request } from 'express';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
