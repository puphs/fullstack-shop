import { IUserModel } from '../models/User.model';

export const getAccountFromUser = (user: IUserModel) => {
	const { name, _id } = user;
	return { name, _id };
};
