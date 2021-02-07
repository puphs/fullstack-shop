import { Document, model, Model, Schema } from 'mongoose';
import ShoppingCart, { IShoppingCartModel } from './ShoppingCart.model';
import UserCredentials, { IUserCredentials, IUserCredentialsModel } from './UserCredentials.model';

export interface IUser {
	name: string;
	credentials?: IUserCredentialsModel['_id'];
	shoppingCart?: IShoppingCartModel['_id'];
}

export interface IUserModel extends IUser, Document {}

const schema = new Schema({
	name: { type: String, required: true },
	credentials: { type: Schema.Types.ObjectId, ref: 'UserCredentials' },
	shoppingCart: { type: Schema.Types.ObjectId, ref: 'ShoppingCart' },
});

const User: Model<IUserModel> = model('User', schema);

export const createUser = async (data: IUser & IUserCredentials) => {
	const { name, email, passwordHash } = data;
	const user = new User({ name });
	const credentials = new UserCredentials({ email, passwordHash });
	const shoppingCart = new ShoppingCart();
	user.credentials = credentials.id;
	user.shoppingCart = shoppingCart.id;
	credentials.user = user.id;
	shoppingCart.user = user.id;

	await credentials.save();
	await shoppingCart.save();
	await user.save();
	return user;
};

export default User;
