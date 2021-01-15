import { Schema, model, Document, Model } from 'mongoose';
import { IShopItemModel } from './ShopItem.model';
import { IUserModel } from './User.model';

export interface IShoppingCart {
	user?: IUserModel['_id'];
	items?: Array<IShopItemModel['_id']>;
}

export interface IShoppingCartModel extends IShoppingCart, Document {}

const schema = new Schema({
	user: [{ ref: 'User', type: Schema.Types.ObjectId }],
	items: { type: [{ ref: 'ShopItem', type: Schema.Types.ObjectId }], default: [] },
});

export default model('ShoppingCart', schema) as Model<IShoppingCartModel>;
