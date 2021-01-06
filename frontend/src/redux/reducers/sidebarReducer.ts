import { Category } from '../../types/types';
import { InferActionsTypes } from '../store';

const initialState = {
	shownCategories: [] as Array<Category>,
	isCategoriesListShown: false,
};

type State = typeof initialState;
type Action = InferActionsTypes<typeof actions>;

const sidebarReducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case 'SHOW_CATEGORY_LIST':
			return { ...state, shownCategories: action.categories, isCategoriesListShown: true };
		case 'HIDE_CATEGORY_LIST':
			return { ...state, isCategoriesListShown: false };
		default:
			return state;
	}
};

export const actions = {
	showCategoriesList: (categories: Array<Category>) =>
		({ type: 'SHOW_CATEGORY_LIST', categories } as const),
	hideCategoriesList: () => ({ type: 'HIDE_CATEGORY_LIST' } as const),
};

export default sidebarReducer;
