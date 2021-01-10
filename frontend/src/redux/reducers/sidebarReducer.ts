import { TCategory } from '../../types/types';
import { InferActionsTypes } from '../store';

const categories: Array<TCategory> = [
	{
		name: 'men',
		subcategories: [
			{
				name: 'Shoes',
				subcategories: [
					{ name: 'Sneakers' },
					{ name: 'Boots' },
					{ name: 'Slippers' },
					{ name: 'Sandals' },
				],
			},
			{
				name: 'Clothing',
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
		subcategories: [
			{
				name: 'shoes',
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
		subcategories: [
			{
				name: 'shoes',
				subcategories: [
					{ name: 'sneakers' },
					{ name: 'boots' },
					{ name: 'slippers' },
					{ name: 'sandals' },
					{ name: 'Low shoes' },
				],
			},
			{
				name: 'Clothing',
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
		subcategories: [
			{
				name: 'shoes',
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
