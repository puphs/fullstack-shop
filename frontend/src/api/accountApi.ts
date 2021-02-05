import { TAccountType } from '../types/types';
import { authHeader, axiosInstance, getData, Response } from './apiUtils';

export type AccountResponse = Response<{
	account: TAccountType;
}>;

const loadAccount = async (token: string) => {
	return await getData<AccountResponse>(
		axiosInstance.get('/account', { headers: authHeader(token) })
	);
};

const changeName = async (token: string, name: string) => {
	return await getData<AccountResponse>(
		axiosInstance.put('/account/name', { name }, { headers: authHeader(token) })
	);
};

const changePassword = async (token: string, currentPassword: string, newPassword: string) => {
	return await getData<AccountResponse>(
		axiosInstance.put(
			'/account/password',
			{ currentPassword, newPassword },
			{ headers: authHeader(token) }
		)
	);
};

export const accountApi = { loadAccount, changeName, changePassword };
