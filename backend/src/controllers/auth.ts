import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { Middleware } from 'express-validator/src/base';

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
	} catch (err) {}
};

export default { login, register };
