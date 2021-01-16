import { Schema, model, Document, Model } from 'mongoose';

export interface IShopItem {
	name: string;
	description: string;
	standardPrice: number;
	discountPrice?: number;
	sizes: Array<String>;
}

export interface IShopItemModel extends IShopItem, Document {}

const schema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	standardPrice: { type: Number, required: true },
	discountPrice: { type: Number, required: false },
	sizes: [{ type: String }],
});

const ShopItem = model('ShopItem', schema) as Model<IShopItemModel>;

export default ShopItem;
