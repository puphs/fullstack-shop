import bcrypt from 'bcryptjs';
import config from '../config/config';
import ApiError from '../error/ApiError';
import User, { IUserModel } from '../models/User.model';
import { IUserCredentialsModel } from '../models/UserCredentials.model';
import { Middleware } from '../types/types';
import { createResponse } from './controller-helper';
import { getAccountFromUser } from './utils';

const getAccount: Middleware = async (req, res, next) => {
	try {
		const user: IUserModel = await User.findById(req.token?.userId);
		res
			.status(200)
			.json(
				createResponse({ data: { account: getAccountFromUser(user) }, message: 'User data loaded' })
			);
	} catch (err) {
		next(ApiError.internal());
	}
};

const changeName: Middleware = async (req, res, next) => {
	try {
		const user: IUserModel = await User.findById(req.token?.userId);
		user.name = req.body.name;
		await user.save();
		res.status(200).json(
			createResponse({
				data: { account: getAccountFromUser(user) },
				message: 'User name changed',
			})
		);
	} catch (err) {
		next(ApiError.internal());
	}
};

const changePassword: Middleware = async (req, res, next) => {
	try {
		const user: IUserModel = await User.findById(req.token?.userId);
		await user.populate({ path: 'credentials' }).execPopulate();
		const userCredentials: IUserCredentialsModel = user.credentials;

		const { currentPassword, newPassword } = req.body;

		const isPasswordCorrect = await bcrypt.compare(currentPassword, userCredentials.passwordHash);
		if (!isPasswordCorrect) {
			return next(
				ApiError.badRequest(
					createResponse({
						data: { account: getAccountFromUser(user) },
						message: 'Current password is wrong',
					})
				)
			);
		}
		userCredentials.passwordHash = await bcrypt.hash(
			newPassword,
			config.server.passwordHeshSaltLength
		);
		await userCredentials.save();

		return res.status(200).json(
			createResponse({
				data: { account: getAccountFromUser(user) },
				message: 'User password changed',
			})
		);
	} catch (err) {
		next(ApiError.internal());
	}
};

export const accountController = { getAccount, changeName, changePassword };
