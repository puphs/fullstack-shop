import { Schema, model, Document, Model } from 'mongoose';

export interface ICategories {
	categories: Array<{
		name: string;
		subcategoriesGroups?: Array<{
			groupName: string;
			subcategories?: Array<{
				name: string;
			}>;
		}>;
	}>;
}

export interface ICategoriesModel extends ICategories, Document {}

const schema = new Schema({
	categories: {
		type: [
			{
				name: { type: String, required: true },
				subcategoriesGroups: [
					{
						groupName: { type: String, required: true },
						subcategories: [{ name: { type: String, required: true } }],
					},
				],
			},
		],
		required: true,
	},
});

const Categories = model('Categories', schema) as Model<ICategoriesModel>;

export default Categories;
