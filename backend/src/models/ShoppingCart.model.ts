import { Document, model, Model, Schema } from 'mongoose';
import { cartItemSchema, ICartItemModel } from './CartItem.model';
import { IUserModel } from './User.model';
export interface IShoppingCart {
	user?: IUserModel['_id'];
	items?: Array<ICartItemModel>;
}

export interface IShoppingCartModel extends IShoppingCart, Document {}

const schema = new Schema({
	user: { ref: 'User', type: Schema.Types.ObjectId },
	items: [cartItemSchema],
});

const ShoppingCart = model('ShoppingCart', schema) as Model<IShoppingCartModel>;

export default ShoppingCart;
