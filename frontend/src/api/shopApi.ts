import { TCategory, TShopItem } from '../types/types';
import { axiosInstance, getData, Response } from './apiUtils';
import qs from 'query-string';

export type LoadShopItemsParams = {
	search?: string | null;
	category?: string | null;
	subcategory?: string | null;
	page?: string | number | null;
	pageSize?: string | number | null;
};

export type LoadShopItemsResponse = Response<{ shopItems: Array<TShopItem> }>;
export type LoadShopItemResponse = Response<{ shopItem: TShopItem }>;
export type LoadCategoriesResponse = Response<{ categories: Array<TCategory> }>;

const loadShopItems = async ({
	search,
	category,
	subcategory,
	page,
	pageSize,
}: LoadShopItemsParams) => {
	const queryString = qs.stringify(
		{ search, category, subcategory, page, pageSize },
		{ skipNull: true, skipEmptyString: true }
	);
	return await getData<LoadShopItemsResponse>(axiosInstance.get(`shop/items?${queryString}`));
};

const loadShopItem = async (itemId: string) => {
	return await getData<LoadShopItemResponse>(axiosInstance.get(`shop/item/${itemId}`));
};

const loadCategories = async () => {
	return await getData<LoadCategoriesResponse>(axiosInstance.get('shop/categories'));
};

const shopApi = { loadShopItems, loadShopItem, loadCategories };

export default shopApi;
