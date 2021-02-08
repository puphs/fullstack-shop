import { call, put, takeEvery } from 'redux-saga/effects';
import shopApi, {
	LoadCategoriesResponse,
	LoadShopItemResponse,
	LoadShopItemsResponse,
} from '../../api/shopApi';
import {
	shopActions,
	LoadShopItemAction,
	LoadShopItemsAction,
	LOAD_CATEGORIES,
	LOAD_SHOP_ITEM,
	LOAD_SHOP_ITEMS,
} from '../reducers/shopReducer';
import { getErrorMessage, setErrorMessage } from './sagaUtils';

function* loadShopItems({ params }: LoadShopItemsAction) {
	try {
		const data: LoadShopItemsResponse = yield call(shopApi.loadShopItems, params);
		yield put(shopActions.setShopItems(data.data.shopItems));
	} catch (err) {
		yield put(shopActions.loadShopItemsFailure(getErrorMessage(err)));
		yield setErrorMessage(getErrorMessage(err));
	}
}

function* loadShopItem({ itemId }: LoadShopItemAction) {
	try {
		yield put(shopActions.setShopItem(null));
		yield put(shopActions.setIsShopItemIsFetching(true));
		const data: LoadShopItemResponse = yield call(shopApi.loadShopItem, itemId);
		yield put(shopActions.setShopItem(data.data.shopItem));
		yield put(shopActions.setIsShopItemIsFetching(false));
	} catch (err) {
		yield put(shopActions.loadShopItemFailure(getErrorMessage(err)));
	}
}

function* loadCategories() {
	try {
		const data: LoadCategoriesResponse = yield call(shopApi.loadCategories);
		yield put(shopActions.setCategories(data.data.categories));
	} catch (err) {
		yield put(shopActions.loadCategoriesFailure(getErrorMessage(err)));
		yield setErrorMessage(getErrorMessage(err));
	}
}

export function* shopSaga() {
	yield takeEvery(LOAD_SHOP_ITEMS, loadShopItems);
	yield takeEvery(LOAD_SHOP_ITEM, loadShopItem);
	yield takeEvery(LOAD_CATEGORIES, loadCategories);
}
