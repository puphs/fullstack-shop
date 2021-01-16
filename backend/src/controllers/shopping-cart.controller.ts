import ApiError from '../error/ApiError';
import ShopItem, { IShopItemModel } from '../models/ShopItem.model';
import ShoppingCart, { IShoppingCartModel } from '../models/ShoppingCart.model';
import { createCartItem } from '../models/CartItem.model';
import { Middleware } from '../types/types';

const getItems: Middleware = async (req, res, next) => {
	try {
		const shoppingCart: IShoppingCartModel = await ShoppingCart.findOne({
			user: req.token?.userId,
		});

		res.status(200).json({ shoppingCartItems: shoppingCart.items });
	} catch (err) {
		console.log(err);
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

		const shoppingCart: IShoppingCartModel = await ShoppingCart.findOne({
			user: req.token?.userId,
		});

		shoppingCart.items?.push(cartItem);
		await shoppingCart.save();

		res
			.status(200)
			.json({ shoppingCartItems: shoppingCart.items, message: 'Item added to shopping cart.' });
	} catch (err) {
		return next(ApiError.internal());
	}
};

const removeItem: Middleware = async (req, res, next) => {
	try {
		const itemIndex = parseInt(req.params['itemIndex']);
		if (isNaN(itemIndex)) {
			return next(ApiError.badRequest('Invalid item index.'));
		}

		const shoppingCart: IShoppingCartModel = await ShoppingCart.findOne({
			user: req.token?.userId,
		});
		if (shoppingCart.items && itemIndex >= shoppingCart.items?.length) {
			return next(ApiError.badRequest('Invalid item index.'));
		}
		shoppingCart.items = shoppingCart.items?.filter((cartItem, index) => index != itemIndex);
		shoppingCart.save();

		res
			.status(200)
			.json({ shoppingCartItems: shoppingCart.items, message: 'Item removed from shopping cart.' });
	} catch (err) {
		return next(ApiError.internal());
	}
};

const removeAllItems: Middleware = async (req, res, next) => {
	try {
		const shoppingCart: IShoppingCartModel = await ShoppingCart.findOne({
			user: req.token?.userId,
		});
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
