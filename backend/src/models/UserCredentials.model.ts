import { Schema, model, Document, Model } from 'mongoose';
import { IUserModel } from './User.model';

export interface IUserCredentials {
	email: string;
	passwordHash: string;
	user?: IUserModel['_id'];
}

export interface IUserCredentialsModel extends IUserCredentials, Document {}

const schema = new Schema({
	email: { type: String, required: true, unique: true },
	passwordHash: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const UserCredentials = model('UserCredentials', schema) as Model<IUserCredentialsModel>;

export default UserCredentials;
