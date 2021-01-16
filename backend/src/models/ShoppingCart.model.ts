import { Schema, model, Document, Model } from 'mongoose';
import { IShopItemModel } from './ShopItem.model';
import { IUserModel } from './User.model';
import CartItem, { ICartItemModel, cartItemSchema } from './CartItem.model';
export interface IShoppingCart {
	user?: IUserModel['_id'];
	items?: Array<ICartItemModel>;
}

export interface IShoppingCartModel extends IShoppingCart, Document {}

const schema = new Schema({
	user: { ref: 'User', type: Schema.Types.ObjectId },
	items: { type: [cartItemSchema], default: [] },
});

const ShoppingCart = model('ShoppingCart', schema) as Model<IShoppingCartModel>;

export default ShoppingCart;
