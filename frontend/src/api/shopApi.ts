import { TCategory, TShopItem } from '../types/types';
import { axiosInstance, getData, Response } from './apiUtils';

export type LoadShopItemsParams = {
	search?: string;
	category?: string;
	subcategory?: string;
	page?: string | number;
};

export type LoadShopItemsResponse = Response<{ shopItems: Array<TShopItem> }>;
export type LoadShopItemResponse = Response<{ shopItem: TShopItem }>;
export type LoadCategoriesResponse = Response<{ categories: Array<TCategory> }>;

const loadShopItems = async (params: LoadShopItemsParams) => {
	return await getData<LoadShopItemsResponse>(axiosInstance.get('shop/items', { params }));
};

const loadShopItem = async (itemId: string) => {
	return await getData<LoadShopItemResponse>(axiosInstance.get(`shop/item/${itemId}`));
};

const loadCategories = async () => {
	return await getData<LoadCategoriesResponse>(axiosInstance.get('shop/categories'));
};

const shopApi = { loadShopItems, loadShopItem, loadCategories };

export default shopApi;
