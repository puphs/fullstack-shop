import { TCartItem } from '../types/types';
import { authHeader, axiosInstance, getData, Response } from './apiUtils';

export type CartItemsResponse = {
	user: string;
	items: Array<TCartItem>;
} & Response;

const loadCartItems = async (token: string) => {
	const data = await getData<CartItemsResponse>(
		axiosInstance.get('shopping-cart', { headers: authHeader(token) })
	);
	return data;
};

const addItemToCart = async (token: string, shopItemId: string) => {
	const data = await getData<CartItemsResponse>(
		axiosInstance.post('shopping-cart', { itemId: shopItemId }, { headers: authHeader(token) })
	);
	return data;
};

const removeItemFromCart = async (token: string, itemIndex: number) => {
	const data = await getData<CartItemsResponse>(
		axiosInstance.delete('shopping-cart', { data: { itemIndex }, headers: authHeader(token) })
	);
	return data;
};

const removeAllItemsFromCart = async (token: string) => {
	const data = await getData<CartItemsResponse>(
		axiosInstance.delete('shopping-cart', { headers: authHeader(token) })
	);
	return data;
};

export const cartApi = { loadCartItems, addItemToCart, removeItemFromCart, removeAllItemsFromCart };
