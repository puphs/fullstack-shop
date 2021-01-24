import bcrypt from 'bcryptjs';
import UserCredentials, { IUserCredentials } from '../models/UserCredentials.model';
import { createUser } from '../models/User.model';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Middleware } from '../types/types';
import ApiError from '../error/ApiError';

const createToken = async (userId: string) => {
	return await jwt.sign({ userId }, config.server.jwtSecret, {
		expiresIn: config.server.jwtExpiresIn,
	});
};

const register: Middleware = async (req, res, next) => {
	try {
		const { email, password, name }: { email: string; password: string; name: string } = req.body;

		const userCredentialsWithSuchEmail: IUserCredentials = await UserCredentials.findOne({ email });

		if (userCredentialsWithSuchEmail) {
			return next(ApiError.badRequest('User with such email is already exists'));
		}

		const passwordHash = await bcrypt.hash(password, 4);
		const user = await createUser({ name, email, passwordHash });
		const token = await createToken(user._id);

		res.status(201).json({ message: 'Successful registration', token, userId: user._id });
	} catch (err) {
		next(ApiError.internal());
	}
};

const login: Middleware = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const userCredentials: IUserCredentials = await UserCredentials.findOne({ email });

		if (userCredentials) {
			const isMatch = await bcrypt.compare(password, userCredentials.passwordHash);
			if (isMatch) {
				const userId = userCredentials.user;
				const token = await createToken(userId);
				return res.status(200).json({ message: 'Successful login', token, userId });
			}
		}
		next(ApiError.badRequest('Incorrect password or email'));
	} catch (err) {
		next(ApiError.internal());
	}
};

export default { register, login };
