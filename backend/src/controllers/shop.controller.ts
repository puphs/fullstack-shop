import { FilterQuery } from 'mongoose';
import ApiError from '../error/ApiError';
import Categories, { ICategoriesModel } from '../models/Categories.model';
import ShopItem, { IShopItemModel } from '../models/ShopItem.model';
import { Middleware } from '../types/types';
import { createResponse } from './controller-helper';

const SHOP_ITEMS_PAGE_SIZE = 3;

const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const createFilterQuery = (
	search: string | undefined,
	category: string | undefined,
	subcategory: string | undefined
): FilterQuery<IShopItemModel> => {
	const filter: FilterQuery<IShopItemModel> = {};

	if (search) {
		const searchRegExp = new RegExp(escapeRegExp(search), 'gi');
		filter.$or = [{ name: searchRegExp }, { description: searchRegExp }];
	}
	if (category) filter.categories = category;
	if (subcategory) filter.subcategories = subcategory;
	return filter;
};

const getShopItems: Middleware = async (req, res, next) => {
	try {
		const { search, category, subcategory } = req.query;
		let page = parseInt(req.query.page?.toString() || '1');
		let pageSize = parseInt(req.query.pageSize?.toString() || SHOP_ITEMS_PAGE_SIZE.toString());
		if (isNaN(page)) page = 1;

		const find = createFilterQuery(
			search?.toString(),
			category?.toString(),
			subcategory?.toString()
		);

		const shopItems: Array<IShopItemModel> = await ShopItem.find(find)
			.skip((page - 1) * pageSize)
			.sort({ createdAt: 'asc' })
			.limit(pageSize);

		res.status(200).json(createResponse({ data: { shopItems }, message: 'Shop items loaded' }));
	} catch (err) {
		next(ApiError.internal(err));
	}
};

const getShopItem: Middleware = async (req, res, next) => {
	try {
		const itemId = req.params['itemId'];
		if (itemId.length !== 24) {
			return next(ApiError.badRequest({ message: 'Invalid item id' }));
		}
		const shopItem = await ShopItem.findOne({ _id: itemId });
		if (!shopItem) {
			return next(ApiError.badRequest({ message: 'Invalid item id' }));
		}

		res.status(200).json(createResponse({ data: { shopItem }, message: 'Shop item loaded' }));
	} catch (err) {
		next(ApiError.internal(err));
	}
};

const getCategories: Middleware = async (req, res, next) => {
	try {
		const categories: ICategoriesModel = await Categories.findOne({});
		res.status(200).json(
			createResponse({
				data: { categories: categories.categories },
				message: 'Categories loaded',
			})
		);
	} catch (err) {
		next(ApiError.internal(err));
	}
};

export const shopController = { getShopItems, getShopItem, getCategories };
