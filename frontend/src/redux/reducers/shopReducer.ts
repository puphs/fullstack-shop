import { LoadShopItemsParams } from '../../api/shopApi';
import { TShopItem } from '../../types/types';
import { InferActionsTypes } from './reducerUtils';

const initialState = {
	shopItems: null as Array<TShopItem> | null,
};

type State = typeof initialState;
type Action = InferActionsTypes<typeof actions>;

const shopReducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case SET_SHOP_ITEMS:
			return { ...state, shopItems: action.shopItems };
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

export type LoadShopItemsAction = ReturnType<typeof actions.loadShopItems>;
export type LoadShopItemAction = ReturnType<typeof actions.loadShopItem>;

export const actions = {
	loadShopItems: (params: LoadShopItemsParams) => ({ type: LOAD_SHOP_ITEMS, params } as const),
	setShopItems: (shopItems: Array<TShopItem>) => ({ type: SET_SHOP_ITEMS, shopItems } as const),
	loadShopItemsFailure: (errorMessage: string) =>
		({ type: LOAD_SHOP_ITEMS_FAILURE, errorMessage } as const),

	loadShopItem: (itemId: string) => ({ type: LOAD_SHOP_ITEM, itemId } as const),
	setShopItem: (shopItem: TShopItem) => ({ type: LOAD_SHOP_ITEM, shopItem } as const),
	loadShopItemFailure: (errorMessage: string) =>
		({ type: LOAD_SHOP_ITEM_FAILURE, errorMessage } as const),
};

export default shopReducer;
