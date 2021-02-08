import { put, take, takeEvery } from 'redux-saga/effects';
import { appActions, INITIALIZE, InitializeAction } from '../reducers/appReducer';
import { cartActions, CART_ACTION_FAILURE, SET_CART_ITEMS } from '../reducers/cartReducer';
import {
	shopActions,
	LOAD_CATEGORIES_FAILURE,
	LOAD_SHOP_ITEMS_FAILURE,
	SET_CATEGORIES,
	SET_SHOP_ITEMS,
} from '../reducers/shopReducer';
import { accountActions, SET_ACCOUNT, LOAD_ACCOUNT_FAILURE } from '../reducers/accountReducer';
import { getErrorMessage } from './sagaUtils';

function* initialize({ token }: InitializeAction) {
	try {
		if (token) {
			yield put(accountActions.loadAccount(token));
			yield take([SET_ACCOUNT, LOAD_ACCOUNT_FAILURE]);

			yield put(cartActions.loadCartItems(token));
			yield take([SET_CART_ITEMS, CART_ACTION_FAILURE]);
		}

		yield put(shopActions.loadCategories());
		yield take([SET_CATEGORIES, LOAD_CATEGORIES_FAILURE]);

		yield put(shopActions.loadShopItems({}));
		yield take([SET_SHOP_ITEMS, LOAD_SHOP_ITEMS_FAILURE]);

		yield put(appActions.initializeSuccess());
	} catch (err) {
		yield put(appActions.initializeFailure(getErrorMessage(err)));
	}
}

export function* appSaga() {
	yield takeEvery(INITIALIZE, initialize);
}
