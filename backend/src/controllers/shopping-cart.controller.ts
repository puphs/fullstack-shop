import ApiError from '../error/ApiError';
import ShopItem, { IShopItemModel } from '../models/ShopItem.model';
import ShoppingCart, { IShoppingCartModel } from '../models/ShoppingCart.model';
import { createCartItem } from '../models/CartItem.model';
import { Middleware, DecodedToken } from '../types/types';

const getCart = async (token: DecodedToken): Promise<IShoppingCartModel> => {
	return await ShoppingCart.findOne({
		user: token.userId,
	});
};

const populateCartItems = async (shoppingCart: IShoppingCartModel): Promise<IShoppingCartModel> => {
	return await shoppingCart.populate({ path: 'items.shopItem' }).execPopulate();
};

const getItems: Middleware = async (req, res, next) => {
	try {
		const shoppingCart = await getCart(req.token!);
		await populateCartItems(shoppingCart);
		res.status(200).json({ shoppingCartItems: shoppingCart.items, message: 'Shop items loaded.' });
	} catch (err) {
		return next(ApiError.internal());
	}
};

const addItem: Middleware = async (req, res, next) => {
	try {
		const { itemId, size }: { itemId: string; size: string } = req.body;
		const shopItem: IShopItemModel = await ShopItem.findOne({ _id: itemId });

		if (!shopItem) {
			return next(ApiError.badRequest('Invalid item identifier.'));
		}
		if (!shopItem.sizes.includes(size)) {
			return next(ApiError.badRequest('Invalid size value.'));
		}

		const cartItem = await createCartItem(shopItem, size);

		const shoppingCart = await getCart(req.token!);

		shoppingCart.items?.unshift(cartItem);
		await shoppingCart.save();

		await populateCartItems(shoppingCart);

		res
			.status(200)
			.json({ shoppingCartItems: shoppingCart.items, message: 'Item added to shopping cart.' });
	} catch (err) {
		return next(ApiError.internal());
	}
};

const removeItem: Middleware = async (req, res, next) => {
	try {
		const itemId = req.params['itemId'];

		const shoppingCart: IShoppingCartModel = await ShoppingCart.findOne({
			user: req.token?.userId,
		});
		const itemsLengthBeforeRemove = shoppingCart.items?.length;
		shoppingCart.items = shoppingCart.items?.filter((cartItem) => itemId != cartItem._id);

		if (itemsLengthBeforeRemove === shoppingCart.items?.length) {
			return next(ApiError.badRequest('Invalid item id.'));
		}

		await shoppingCart.save();

		await populateCartItems(shoppingCart);

		res
			.status(200)
			.json({ shoppingCartItems: shoppingCart.items, message: 'Item removed from shopping cart.' });
	} catch (err) {
		return next(ApiError.internal());
	}
};

const removeAllItems: Middleware = async (req, res, next) => {
	try {
		const shoppingCart = await getCart(req.token!);
		shoppingCart.items = [];
		await shoppingCart.save();

		res
			.status(200)
			.json({ shoppingCartItems: shoppingCart.items, message: 'Shopping cart is cleared.' });
	} catch (err) {
		return next(ApiError.internal());
	}
};

export default { getItems, addItem, removeItem, removeAllItems };
