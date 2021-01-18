import { axiosInstance, getData, Response } from './apiUtils';

export type AuthResponse = {
	token: string;
	userId: string;
} & Response;

const register = async (email: string, name: string, password: string) => {
	try {
		const data = await getData<AuthResponse>(
			axiosInstance.post('auth/register', { email, name, password })
		);
		console.info(data.message);
		return data;
	} catch (err) {
		throw err;
	}
};

const login = async (email: string, password: string) => {
	const data = await getData<AuthResponse>(axiosInstance.post('auth/login', { email, password }));
	console.info(data.message);
	return data;
};

export const authApi = { register, login };
