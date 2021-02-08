import { TCartItem } from '../../types/types';
import { InferActionsTypes } from './reducerUtils';

const initialState = {
	cartItems: null as Array<TCartItem> | null,
	isCartActionFetching: false as boolean,
};

type State = typeof initialState;
type Action = InferActionsTypes<typeof cartActions>;

export const cartReducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case CART_ACTION_FAILURE:
			return { ...state, isCartActionFetching: false };
		case SET_CART_ITEMS:
			return { ...state, cartItems: action.cartItems, isCartActionFetching: false };
		default:
			return { ...state, isCartActionFetching: true };
	}
};

export const CART_ACTION_FAILURE = 'cart/CART_ACTION_FAILURE';
export const SET_CART_ITEMS = 'cart/SET_CART_ITEMS';

export const LOAD_CART_ITEMS = 'cart/LOAD_CART_ITEMS';

export const ADD_ITEM_TO_CART = 'cart/ADD_ITEM_TO_CART';

export const REMOVE_ITEM_FROM_CART = 'cart/REMOVE_ITEM_FROM_CART';

export const REMOVE_ALL_ITEMS_FROM_CART = 'cart/REMOVE_ALL_ITEMS_FROM_CART';

export type LoadCartItemsAction = ReturnType<typeof cartActions.loadCartItems>;
export type AddItemToCartAction = ReturnType<typeof cartActions.addItemToCart>;
export type RemoveItemFromCartAction = ReturnType<typeof cartActions.removeItemFromCart>;
export type RemoveAllItemsFromCart = ReturnType<typeof cartActions.removeAllItemsFromCart>;

export const cartActions = {
	cartActionFailure: (errorMessage: string) =>
		({ type: CART_ACTION_FAILURE, errorMessage } as const),

	setCartItems: (cartItems: Array<TCartItem>) => ({ type: SET_CART_ITEMS, cartItems } as const),

	loadCartItems: (token: string) => ({ type: LOAD_CART_ITEMS, token } as const),

	addItemToCart: (token: string, shopItemId: string, size: string) =>
		({ type: ADD_ITEM_TO_CART, token, shopItemId, size } as const),

	removeItemFromCart: (token: string, itemId: string) =>
		({ type: REMOVE_ITEM_FROM_CART, token, itemId } as const),

	removeAllItemsFromCart: (token: string) => ({ type: REMOVE_ALL_ITEMS_FROM_CART, token } as const),
};
