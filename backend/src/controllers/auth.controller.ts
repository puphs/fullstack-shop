import bcrypt from 'bcryptjs';
import UserCredentials, { IUserCredentials } from '../models/UserCredentials.model';
import User, { IUser, createUser } from '../models/User.model';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Middleware } from 'express-validator/src/base';

const register: Middleware = async (req, res) => {
	try {
		const { email, password, name }: { email: string; password: string; name: string } = req.body;

		const userCredentialsWithSuchEmail: IUserCredentials = await User.findOne({ email });

		if (userCredentialsWithSuchEmail) {
			res.status(400).json({ message: 'User with such email is already exists' });
			return;
		}

		const passwordHash = await bcrypt.hash(password, 4);

		await createUser({ name, email, passwordHash });
		res.status(201).json({ message: 'Successful registration' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error. Please try again later.' });
	}
};

const login: Middleware = async (req, res) => {
	try {
		const { email, password } = req.body;
		const userCredentials: IUserCredentials = await UserCredentials.findOne({ email });
		if (userCredentials) {
			const isMatch = await bcrypt.compare(password, userCredentials.passwordHash);
			if (isMatch) {
				const userId = userCredentials.user;
				const token = await jwt.sign({ userId }, config.server.jwtSecret, {
					expiresIn: config.server.jwtExpiresInHours,
				});
				return res.status(200).json({ message: 'Successful log in', token, userId });
			}
		}
		res.status(400).json({ message: 'Incorrect password or email' });
	} catch (err) {
		res.status(500).json({ message: 'Server error. Please try again later.' });
	}
};

export default { register, login };
