import { Schema, model, Document, Model } from 'mongoose';
import { IShopItemModel } from './ShopItem.model';

export interface ICartItem {
	name: string;
	standardPrice: number;
	discountPrice?: number;
	size: String;
	shopItem?: IShopItemModel['id'];
}

export interface ICartItemModel extends ICartItem, Document {}

export const cartItemSchema = new Schema({
	name: { type: String, required: true },
	standardPrice: { type: Number, required: true },
	discountPrice: { type: Number, required: false },
	size: { type: String, required: true },
	shopItem: { ref: 'ShopItem', type: Schema.Types.ObjectId },
});

const CartItem = model('CartItem', cartItemSchema) as Model<ICartItemModel>;

export const createCartItem = async (shopItem: IShopItemModel, size: string) => {
	if (!shopItem.sizes.includes(size)) {
		size = shopItem.sizes[0].toString();
	}
	const { name, standardPrice, discountPrice } = shopItem;
	shopItem = shopItem._id;
	const cartItem = new CartItem({ name, standardPrice, discountPrice, size, shopItem });
	await cartItem.save();
	return cartItem;
};

export default CartItem;
