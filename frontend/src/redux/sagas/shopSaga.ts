import { call, put, takeEvery } from 'redux-saga/effects';
import shopApi, { LoadShopItemResponse, LoadShopItemsResponse } from '../../api/shopApi';
import {
	actions,
	LoadShopItemAction,
	LoadShopItemsAction,
	LOAD_SHOP_ITEM,
	LOAD_SHOP_ITEMS,
} from '../reducers/shopReducer';
import { getErrorMessage } from './sagaUtils';

function* loadShopItems({ params }: LoadShopItemsAction) {
	try {
		const data: LoadShopItemsResponse = yield call(shopApi.loadShopItems, params);
		yield put(actions.setShopItems(data.shopItems));
	} catch (err) {
		yield put(actions.loadShopItemsFailure(getErrorMessage(err)));
	}
}

function* loadShopItem({ itemId }: LoadShopItemAction) {
	try {
		const data: LoadShopItemResponse = yield call(shopApi.loadShopItem, itemId);
		yield put(actions.setShopItem(data.shopItem));
	} catch (err) {
		yield put(actions.loadShopItemFailure(getErrorMessage(err)));
	}
}

export function* shopSaga() {
	yield takeEvery(LOAD_SHOP_ITEMS, loadShopItems);
	yield takeEvery(LOAD_SHOP_ITEM, loadShopItem);
}
