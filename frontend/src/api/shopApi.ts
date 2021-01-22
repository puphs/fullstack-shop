import { TShopItem } from '../types/types';
import { axiosInstance, getData, Response } from './apiUtils';

export type LoadShopItemsParams = {
	search?: string;
	category?: string;
	subcategory?: string;
	page?: string | number;
};

export type LoadShopItemsResponse = { shopItems: Array<TShopItem> } & Response;
export type LoadShopItemResponse = { shopItem: TShopItem } & Response;

const loadShopItems = async (params: LoadShopItemsParams) => {
	return await getData<LoadShopItemsResponse>(axiosInstance.get('shop/items', { params }));
};

const loadShopItem = async (itemId: string) => {
	return await getData<LoadShopItemResponse>(axiosInstance.get(`shop/item/${itemId}`));
};

const shopApi = { loadShopItems, loadShopItem };

export default shopApi;
