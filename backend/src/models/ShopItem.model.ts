import { Schema, model, Document, Model } from 'mongoose';

export interface IShopItem {
	name: string;
	description: string;
	imgLink: string;
	standardPrice: number;
	discountPrice?: number;
	categories: Array<String>;
	subcategories: Array<String>;
	sizes: Array<String>;
}

export interface IShopItemModel extends IShopItem, Document {}

const schema = new Schema(
	{
		name: { type: String, required: true },
		imgLink: { type: String, required: true },
		description: { type: String, required: true },
		standardPrice: { type: Number, required: true },
		discountPrice: { type: Number, required: false },
		categories: { type: [{ type: String }], default: [] },
		subcategories: { type: [{ type: String }], default: [] },
		sizes: { type: [{ type: String }], default: [] },
	},
	{ timestamps: true }
);

const ShopItem = model('ShopItem', schema) as Model<IShopItemModel>;

export default ShopItem;
