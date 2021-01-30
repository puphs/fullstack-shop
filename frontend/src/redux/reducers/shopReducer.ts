import { LoadShopItemsParams } from '../../api/shopApi';
import { TCategory, TShopItem } from '../../types/types';
import { InferActionsTypes } from './reducerUtils';

const initialState = {
	shopItems: null as Array<TShopItem> | null,
	categories: null as Array<TCategory> | null,
};

type State = typeof initialState;
type Action = InferActionsTypes<typeof actions>;

const shopReducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case SET_SHOP_ITEMS:
			return { ...state, shopItems: action.shopItems };
		case SET_CATEGORIES:
			return { ...state, categories: action.categories };
		default:
			return state;
	}
};

export const LOAD_SHOP_ITEMS = 'shop/LOAD_SHOP_ITEMS';
export const SET_SHOP_ITEMS = 'shop/SET_SHOP_ITEMS';
export const LOAD_SHOP_ITEMS_FAILURE = 'shop/LOAD_SHOP_ITEMS_FAILURE';

export const LOAD_SHOP_ITEM = 'shop/LOAD_SHOP_ITEM';
export const SET_SHOP_ITEM = 'shop/SET_SHOP_ITEM';
export const LOAD_SHOP_ITEM_FAILURE = 'shop/LOAD_SHOP_ITEM_FAILURE';

export const LOAD_CATEGORIES = 'shop/LOAD_CATEGORIES';
export const SET_CATEGORIES = 'shop/SET_CATEGORIES';
export const LOAD_CATEGORIES_FAILURE = 'shop/LOAD_CATEGORIES_FAILURE';

export type LoadShopItemsAction = ReturnType<typeof actions.loadShopItems>;
export type LoadShopItemAction = ReturnType<typeof actions.loadShopItem>;
export type LoadCategories = ReturnType<typeof actions.loadCategories>;

export const actions = {
	loadShopItems: (params: LoadShopItemsParams) => ({ type: LOAD_SHOP_ITEMS, params } as const),
	setShopItems: (shopItems: Array<TShopItem>) => ({ type: SET_SHOP_ITEMS, shopItems } as const),
	loadShopItemsFailure: (errorMessage: string) =>
		({ type: LOAD_SHOP_ITEMS_FAILURE, errorMessage } as const),

	loadShopItem: (itemId: string) => ({ type: LOAD_SHOP_ITEM, itemId } as const),
	setShopItem: (shopItem: TShopItem) => ({ type: LOAD_SHOP_ITEM, shopItem } as const),
	loadShopItemFailure: (errorMessage: string) =>
		({ type: LOAD_SHOP_ITEM_FAILURE, errorMessage } as const),

	loadCategories: () => ({ type: LOAD_CATEGORIES } as const),
	setCategories: (categories: Array<TCategory>) => ({ type: SET_CATEGORIES, categories } as const),
	loadCategoriesFailure: (errorMessage: string) =>
		({ type: LOAD_CATEGORIES_FAILURE, errorMessage } as const),
};

export default shopReducer;
