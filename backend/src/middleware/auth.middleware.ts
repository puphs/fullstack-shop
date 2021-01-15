import { DecodedTokenType, Middleware } from '../types/types';
import jwt from 'jsonwebtoken';
import config from '../config/config';
const auth: Middleware = (req, res, next) => {
	if (req.method == 'OPTIONS') {
		return next();
	}
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			return res.status(401).json({ message: 'Authorization error.' });
		}

		const decodedToken = jwt.verify(token, config.server.jwtSecret) as DecodedTokenType;
		req.token = decodedToken;
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Authorization error.' });
	}
};

export default auth;
