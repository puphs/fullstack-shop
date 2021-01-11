import { Schema, model, Model, Document } from 'mongoose';

interface IUser extends Document {
	email: string;
	passHash: string;
}

const schema = new Schema<IUser>({
	email: { type: String, required: true, unique: true },
	passHash: { type: String, required: true },
	shoppingCartItems: { type: [String] },
});

export default model('User', schema);
