import { Schema, model, Document, Model } from 'mongoose';
import { IShopItemModel } from './ShopItem.model';

export interface ICartItem {
	shopItem?: IShopItemModel['id'];
}

export interface ICartItemModel extends ICartItem, Document {}

export const cartItemSchema = new Schema({
	size: { type: String, required: true },
	shopItem: { ref: 'ShopItem', type: Schema.Types.ObjectId },
});

const CartItem = model('CartItem', cartItemSchema) as Model<ICartItemModel>;

export const createCartItem = async (shopItem: IShopItemModel, size: string) => {
	if (!shopItem.sizes.includes(size)) {
		size = shopItem.sizes[0].toString();
	}
	shopItem = shopItem._id;
	const cartItem = new CartItem({ size, shopItem });
	await cartItem.save();
	return cartItem;
};

export default CartItem;
