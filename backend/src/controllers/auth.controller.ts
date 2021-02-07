import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import ApiError from '../error/ApiError';
import { createUser, IUserModel } from '../models/User.model';
import UserCredentials, {
	IUserCredentials,
	IUserCredentialsModel,
} from '../models/UserCredentials.model';
import { Middleware } from '../types/types';
import { createResponse } from './controller-helper';
import { getAccountFromUser } from './utils';

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

		const passwordHash = await bcrypt.hash(password, config.server.passwordHeshSaltLength);
		const user = await createUser({ name, email, passwordHash });
		const token = await createToken(user._id);

		res.status(201).json(
			createResponse({
				data: { token, account: getAccountFromUser(user) },
				message: 'Successful registration',
			})
		);
	} catch (err) {
		next(ApiError.internal(err));
	}
};

const login: Middleware = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const userCredentials: IUserCredentialsModel = await UserCredentials.findOne({ email });
		if (!userCredentials) {
			return next(ApiError.badRequest({ message: 'Incorrect email or password' }));
		}

		const isPasswordCorrect = await bcrypt.compare(password, userCredentials.passwordHash);
		if (!isPasswordCorrect) {
			return next(ApiError.badRequest({ message: 'Incorrect email or password' }));
		}

		await userCredentials.populate({ path: 'user' }).execPopulate();
		const user: IUserModel = userCredentials.user;
		const token = await createToken(user._id);
		res.status(200).json(
			createResponse({
				data: { token, account: getAccountFromUser(user) },
				message: 'Successful login',
			})
		);
	} catch (err) {
		next(ApiError.internal(err));
	}
};

export const authController = { register, login };
