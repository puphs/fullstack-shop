import { TCategory } from '../../types/types';
import { InferActionsTypes } from './reducerUtils';

const categories: Array<TCategory> = [
	{
		name: 'men',
		subcategoriesGroups: [
			{
				groupName: 'Shoes',
				subcategories: [
					{ name: 'Sneakers' },
					{ name: 'Boots' },
					{ name: 'Slippers' },
					{ name: 'Sandals' },
				],
			},
			{
				groupName: 'Clothing',
				subcategories: [
					{ name: 'Shirts' },
					{ name: 'Pants' },
					{ name: 'Hoodies' },
					{ name: 'T-shirts' },
					{ name: 'Swimwear' },
				],
			},
		],
	},
	{
		name: 'women',
		subcategoriesGroups: [
			{
				groupName: 'shoes',
				subcategories: [
					{ name: 'sneakers' },
					{ name: 'boots' },
					{ name: 'slippers' },
					{ name: 'sandals' },
					{ name: 'Low shoes' },
				],
			},
		],
	},
	{
		name: 'boys',
		subcategoriesGroups: [
			{
				groupName: 'shoes',
				subcategories: [
					{ name: 'sneakers' },
					{ name: 'boots' },
					{ name: 'slippers' },
					{ name: 'sandals' },
					{ name: 'Low shoes' },
				],
			},
			{
				groupName: 'Clothing',
				subcategories: [
					{ name: 'Shirts' },
					{ name: 'Pants' },
					{ name: 'Hoodies' },
					{ name: 'T-shirts' },
					{ name: 'Swimwear' },
				],
			},
		],
	},
	{
		name: 'girls',
		subcategoriesGroups: [
			{
				groupName: 'shoes',
				subcategories: [
					{ name: 'sneakers' },
					{ name: 'boots' },
					{ name: 'slippers' },
					{ name: 'sandals' },
					{ name: 'Low shoes' },
				],
			},
		],
	},
];
const initialState = {
	categories: categories as Array<TCategory>,
};

type State = typeof initialState;
type Action = InferActionsTypes<typeof actions>;

const sidebarReducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		default:
			return state;
	}
};

export const actions = {};

export default sidebarReducer;
