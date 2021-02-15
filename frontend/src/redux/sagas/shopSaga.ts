import { call, put, select, takeEvery } from 'redux-saga/effects';
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
import { AppState } from '../store';
import { getErrorMessage, setErrorMessage } from './sagaUtils';

function* loadShopItems({ params }: LoadShopItemsAction) {
	try {
		yield put(shopActions.setAreShopItemsFetching(true));
		const pageSize = yield select((state: AppState) => state.shop.shopItemsPageSize);
		const newParams = params.pageSize ? params : { ...params, pageSize };
		const data: LoadShopItemsResponse = yield call(shopApi.loadShopItems, newParams);
		yield put(shopActions.setShopItems(data.data.shopItems));
		yield put(shopActions.setAreShopItemsFetching(false));
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
