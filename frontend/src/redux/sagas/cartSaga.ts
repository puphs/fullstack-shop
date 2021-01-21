import { takeEvery, put, call } from 'redux-saga/effects';
import {
	actions,
	LoadCartItemsAction,
	LOAD_CART_ITEMS,
	ADD_ITEM_TO_CART,
	AddItemToCartAction,
	RemoveItemFromCartAction,
	RemoveAllItemsFromCart,
	REMOVE_ITEM_FROM_CART,
	REMOVE_ALL_ITEMS_FROM_CART,
} from '../reducers/cartReducer';
import { cartApi, CartItemsResponse } from '../../api/cartApi';
import { getErrorMessage } from './sagaUtils';

function* loadCartItems({ token }: LoadCartItemsAction) {
	try {
		const data: CartItemsResponse = yield call(cartApi.loadCartItems, token);
		yield put(actions.setCartItems(data.shoppingCartItems));
	} catch (err) {
		yield put(actions.cartActionFailure(getErrorMessage(err)));
	}
}

function* addItemToCart({ token, shopItemId }: AddItemToCartAction) {
	try {
		const data: CartItemsResponse = yield call(cartApi.addItemToCart, token, shopItemId);
		yield put(actions.setCartItems(data.shoppingCartItems));
	} catch (err) {
		yield put(actions.cartActionFailure(getErrorMessage(err)));
	}
}

function* removeItemFromCart({ token, itemId }: RemoveItemFromCartAction) {
	try {
		const data: CartItemsResponse = yield call(cartApi.removeItemFromCart, token, itemId);
		yield put(actions.setCartItems(data.shoppingCartItems));
	} catch (err) {
		yield put(actions.cartActionFailure(getErrorMessage(err)));
	}
}
function* removeAllItemsFromCart({ token }: RemoveAllItemsFromCart) {
	try {
		const data: CartItemsResponse = yield call(cartApi.removeAllItemsFromCart, token);
		yield put(actions.setCartItems(data.shoppingCartItems));
	} catch (err) {
		yield put(actions.cartActionFailure(getErrorMessage(err)));
	}
}

export function* cartSaga() {
	yield takeEvery(LOAD_CART_ITEMS, loadCartItems);
	yield takeEvery(ADD_ITEM_TO_CART, addItemToCart);
	yield takeEvery(REMOVE_ITEM_FROM_CART, removeItemFromCart);
	yield takeEvery(REMOVE_ALL_ITEMS_FROM_CART, removeAllItemsFromCart);
}
