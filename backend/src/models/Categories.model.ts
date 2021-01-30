import { Schema, model, Document, Model } from 'mongoose';

export interface ICategory {
	name: string;
	subcategoriesGroups?: Array<{
		groupName: string;
		subcategories?: Array<{
			name: string;
		}>;
	}>;
}

export interface ICategoryModel extends ICategory, Document {}

const schema = new Schema({
	name: { type: String, required: true },
	subcategoriesGroups: [
		{
			groupName: { type: String, required: true },
			subcategories: [{ name: { type: String, required: true } }],
		},
	],
});

const Categories = model('Categories', schema) as Model<ICategoryModel>;

export default Categories;
