import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import ApiError from '../error/ApiError';
import { createUser } from '../models/User.model';
import UserCredentials, { IUserCredentials } from '../models/UserCredentials.model';
import { Middleware } from '../types/types';
import { createResponse } from './controller-helper';

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
			return next(ApiError.badRequest({ message: 'User with such email is already exists' }));
		}

		const passwordHash = await bcrypt.hash(password, 4);
		const user = await createUser({ name, email, passwordHash });
		const token = await createToken(user._id);

		res.status(201).json(
			createResponse({
				data: { token, userId: user._id },
				message: 'Successful registration',
			})
		);
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
				return res.status(200).json(
					createResponse({
						data: { token, userId },
						message: 'Successful login',
					})
				);
			}
		}
		next(ApiError.badRequest({ message: 'Incorrect password or email' }));
	} catch (err) {
		next(ApiError.internal());
	}
};

export default { register, login };
