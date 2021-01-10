import { TShopItem } from '../../types/types';
import { InferActionsTypes } from '../store';

const initialState = {
	cartItems: [] as Array<TShopItem>,
};

type State = typeof initialState;
type Action = InferActionsTypes<typeof actions>;

const cartReducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case 'ADD_ITEM_TO_CART':
			// const newCartItems = [...state.cartItems];
			// const cartItem = newCartItems.find((item) => item.id === action.itemId);
			// if (cartItem) {
			// 	cartItem.count++;
			// } else {
			// 	newCartItems.push({ id: action.itemId, count: 1 });
			// }
			return { ...state, cartItems: [...state.cartItems, action.item] };
		case 'REMOVE_ITEM_FROM_CART':
			return { ...state, cartItems: state.cartItems.filter((item) => item !== action.item) };
		case 'CLEAR_CART':
			return { ...state, cartItems: [] };
		default:
			return state;
	}
};

export const actions = {
	addItemToCart: (item: TShopItem) => ({ type: 'ADD_ITEM_TO_CART', item } as const),
	removeItemFromCart: (item: TShopItem) => ({ type: 'REMOVE_ITEM_FROM_CART', item } as const),
	clearCart: () => ({ type: 'CLEAR_CART' } as const),
};

export default cartReducer;
