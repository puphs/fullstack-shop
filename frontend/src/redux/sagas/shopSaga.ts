import { call, put, takeEvery } from 'redux-saga/effects';
import shopApi, {
	LoadCategoriesResponse,
	LoadShopItemResponse,
	LoadShopItemsResponse,
} from '../../api/shopApi';
import {
	actions,
	LoadShopItemAction,
	LoadShopItemsAction,
	LOAD_CATEGORIES,
	LOAD_SHOP_ITEM,
	LOAD_SHOP_ITEMS,
} from '../reducers/shopReducer';
import { getErrorMessage } from './sagaUtils';

function* loadShopItems({ params }: LoadShopItemsAction) {
	try {
		const data: LoadShopItemsResponse = yield call(shopApi.loadShopItems, params);
		yield put(actions.setShopItems(data.data.shopItems));
	} catch (err) {
		yield put(actions.loadShopItemsFailure(getErrorMessage(err)));
	}
}

function* loadShopItem({ itemId }: LoadShopItemAction) {
	try {
		const data: LoadShopItemResponse = yield call(shopApi.loadShopItem, itemId);
		yield put(actions.setShopItem(data.data.shopItem));
	} catch (err) {
		yield put(actions.loadShopItemFailure(getErrorMessage(err)));
	}
}

function* loadCategories() {
	try {
		const data: LoadCategoriesResponse = yield call(shopApi.loadCategories);
		yield put(actions.setCategories(data.data.categories));
	} catch (err) {
		yield put(actions.loadCategoriesFailure(getErrorMessage(err)));
	}
}

export function* shopSaga() {
	yield takeEvery(LOAD_SHOP_ITEMS, loadShopItems);
	yield takeEvery(LOAD_SHOP_ITEM, loadShopItem);
	yield takeEvery(LOAD_CATEGORIES, loadCategories);
}
