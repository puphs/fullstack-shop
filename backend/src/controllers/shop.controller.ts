import { FilterQuery } from 'mongoose';
import { getConfigFileParsingDiagnostics } from 'typescript';
import ApiError from '../error/ApiError';
import ShopItem, { IShopItemModel } from '../models/ShopItem.model';
import { Middleware } from '../types/types';

const SHOP_ITEMS_PAGE_SIZE = 10;

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
		if (isNaN(page)) page = 1;

		const find = createFilterQuery(
			search?.toString(),
			category?.toString(),
			subcategory?.toString()
		);

		const shopItems: Array<IShopItemModel> = await ShopItem.find(find)
			.skip((page - 1) * SHOP_ITEMS_PAGE_SIZE)
			.sort({ createdAt: 'asc' })
			.limit(SHOP_ITEMS_PAGE_SIZE);

		res.status(200).json({ shopItems, message: 'Shop items loaded' });
	} catch (err) {
		return next(ApiError.internal());
	}
};

const getShopItem: Middleware = async (req, res, next) => {
	try {
		const itemId = req.params['itemId'];

		const shopItem = await ShopItem.find({ _id: itemId });
		if (!shopItem) {
			return next(ApiError.badRequest('Invalid item index'));
		}

		res.status(200).json({ shopItem, message: 'Shop item loaded' });
	} catch (err) {
		return next(ApiError.internal());
	}
};

export default { getShopItems, getShopItem };
