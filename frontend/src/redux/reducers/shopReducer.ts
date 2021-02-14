import { LoadShopItemsParams } from '../../api/shopApi';
import { TCategory, TShopItem } from '../../types/types';
import { InferActionsTypes } from './reducerUtils';

const initialState = {
	shopItems: null as Array<TShopItem> | null,
	areShopItemsFetching: false as boolean,
	isShopItemsEndReached: false as boolean,
	shopItemsPage: 1 as number,
	shopItemsPageSize: 8 as number,
	shopItem: null as TShopItem | null,
	isShopItemFetching: false as boolean,
	categories: null as Array<TCategory> | null,
	defaultCategoryName: 'new',
};

type State = typeof initialState;
type Action = InferActionsTypes<typeof shopActions>;

export const shopReducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case SET_SHOP_ITEMS:
			if (state.shopItemsPage === 1) {
				return {
					...state,
					shopItems: action.shopItems,
					isShopItemsEndReached: action.shopItems.length < state.shopItemsPageSize,
				};
			} else {
				return {
					...state,
					shopItems: [...(state.shopItems || []), ...action.shopItems],
					isShopItemsEndReached: action.shopItems.length < state.shopItemsPageSize,
				};
			}
		case SET_ARE_SHOP_ITEMS_FETCHING:
			return { ...state, areShopItemsFetching: action.areFetching };
		case SET_SHOP_ITEMS_PAGE:
			return { ...state, shopItemsPage: action.page };
		case SET_IS_SHOP_ITEM_FETCHING:
			return { ...state, isShopItemFetching: action.isFetching };
		case SET_SHOP_ITEM:
			return { ...state, shopItem: action.shopItem };
		case SET_CATEGORIES:
			return { ...state, categories: action.categories };
		default:
			return state;
	}
};

export const LOAD_SHOP_ITEMS = 'shop/LOAD_SHOP_ITEMS';
export const SET_ARE_SHOP_ITEMS_FETCHING = '/shop/SET_ARE_SHOP_ITEMS_FETCHING';
export const SET_SHOP_ITEMS = 'shop/SET_SHOP_ITEMS';
export const LOAD_SHOP_ITEMS_FAILURE = 'shop/LOAD_SHOP_ITEMS_FAILURE';

export const SET_SHOP_ITEMS_PAGE = 'shop/SET_SHOP_ITEMS_PAGE';

export const LOAD_SHOP_ITEM = 'shop/LOAD_SHOP_ITEM';
export const SET_IS_SHOP_ITEM_FETCHING = '/shop/SET_IS_SHOP_ITEM_FETCHING';
export const SET_SHOP_ITEM = 'shop/SET_SHOP_ITEM';
export const LOAD_SHOP_ITEM_FAILURE = 'shop/LOAD_SHOP_ITEM_FAILURE';

export const LOAD_CATEGORIES = 'shop/LOAD_CATEGORIES';
export const SET_CATEGORIES = 'shop/SET_CATEGORIES';
export const LOAD_CATEGORIES_FAILURE = 'shop/LOAD_CATEGORIES_FAILURE';

export type LoadShopItemsAction = ReturnType<typeof shopActions.loadShopItems>;
export type LoadShopItemAction = ReturnType<typeof shopActions.loadShopItem>;
export type LoadCategories = ReturnType<typeof shopActions.loadCategories>;

export const shopActions = {
	loadShopItems: (params: LoadShopItemsParams) => ({ type: LOAD_SHOP_ITEMS, params } as const),
	setAreShopItemsFetching: (areFetching: boolean) =>
		({ type: SET_ARE_SHOP_ITEMS_FETCHING, areFetching } as const),
	setShopItems: (shopItems: Array<TShopItem>) => ({ type: SET_SHOP_ITEMS, shopItems } as const),
	loadShopItemsFailure: (errorMessage: string) =>
		({ type: LOAD_SHOP_ITEMS_FAILURE, errorMessage } as const),

	setShopItemsPage: (page: number) => ({ type: SET_SHOP_ITEMS_PAGE, page } as const),

	loadShopItem: (itemId: string) => ({ type: LOAD_SHOP_ITEM, itemId } as const),
	setIsShopItemIsFetching: (isFetching: boolean) =>
		({ type: SET_IS_SHOP_ITEM_FETCHING, isFetching } as const),
	setShopItem: (shopItem: TShopItem | null) => ({ type: SET_SHOP_ITEM, shopItem } as const),
	loadShopItemFailure: (errorMessage: string) =>
		({ type: LOAD_SHOP_ITEM_FAILURE, errorMessage } as const),

	loadCategories: () => ({ type: LOAD_CATEGORIES } as const),
	setCategories: (categories: Array<TCategory>) => ({ type: SET_CATEGORIES, categories } as const),
	loadCategoriesFailure: (errorMessage: string) =>
		({ type: LOAD_CATEGORIES_FAILURE, errorMessage } as const),
};
