import bcrypt from 'bcryptjs';
import { Middleware } from 'express-validator/src/base';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const register: Middleware = async (req, res, next) => {
	try {
		const { email, pass }: { email: string; pass: string } = req.body;

		const userWithSuchEmail = await User.findOne({ email });

		if (userWithSuchEmail) {
			res.status(400).json({ message: 'User with such email is already exists' });
			return;
		}
		const passHash = await bcrypt.hash(pass, 2);

		const user = new User({ email, passHash });

		await user.save();
		console.log('user saved');

		res.status(201).json({ message: 'Successful registration' });
	} catch (err) {
		res.status(500).json({ message: 'Server error. Please try again later.' });
	}
};

const login: Middleware = async (req, res, next) => {
	try {
		const { email, pass } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			const isMatch = await bcrypt.compare(pass, user.passHash);
			if (isMatch) {
				const token = await jwt.sign({ userId: user.id }, config.server.jwtSecret, {
					expiresIn: '1h',
				});
				res.status(200).json({ message: 'Loggined in', token, userId: user.id });
				return;
			}
		}
		res.status(400).json({ message: 'Incorrect password or email' });
	} catch (err) {
		res.status(500).json({ message: 'Server error. Please try again later.' });
	}
};

export default { login, register };
