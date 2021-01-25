import { axiosInstance, getData, Response } from './apiUtils';

export type AuthResponse = Response<{
	token: string;
	userId: string;
}>;

const register = async (email: string, name: string, password: string) => {
	const data = await getData<AuthResponse>(
		axiosInstance.post('auth/register', { email, name, password })
	);
	console.info(data.message);
	return data;
};

const login = async (email: string, password: string) => {
	const data = await getData<AuthResponse>(axiosInstance.post('auth/login', { email, password }));
	console.info(data.message);
	return data;
};

export const authApi = { register, login };
