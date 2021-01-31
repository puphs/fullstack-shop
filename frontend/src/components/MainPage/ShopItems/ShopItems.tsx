import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { LoadShopItemsParams } from '../../../api/shopApi';
import { actions as cartActions } from '../../../redux/reducers/cartReducer';
import { actions as shopActions } from '../../../redux/reducers/shopReducer';
import { TShopItem } from '../../../types/types';
import AddToCartPopup, { PopupResult } from '../../AddToCartPopup/AddToCartPopup';
import ShopItem from '../../ShopItem/ShopItem';
import styles from './ShopItems.module.scss';
import qs from 'query-string';

type Props = {
	shopItems: Array<TShopItem> | null;
	token: string | null;
};

type Params = {
	category: string;
	subcategory: string;
};

const ShopItems: React.FC<Props> = ({ shopItems, token }) => {
	const [popupShopItem, setPopupShopItem] = useState<TShopItem | null>(null);
	const [isPopupShown, setIsPopupShown] = useState(false);

	const dispatch = useDispatch();
	const location = useLocation();
	const { category, subcategory } = useParams<Params>();

	useEffect(() => {
		const { search, page } = qs.parse(location.search);
		const loadItemsParams: LoadShopItemsParams = {
			search: search?.toString(),
			page: page?.toString(),
			category,
			subcategory,
		};

		dispatch(shopActions.loadShopItems(loadItemsParams));
	}, [location.search, category, subcategory]);

	const onAddToCartBtnClick = (shopItem: TShopItem) => {
		setPopupShopItem(shopItem);
		setIsPopupShown(true);
	};

	const onPopupResult = (result: PopupResult) => {
		if (result && token) {
			dispatch(cartActions.addItemToCart(token, popupShopItem!._id, result.size));
		} else {
		}
		setIsPopupShown(false);
	};

	const shopItemsElements =
		shopItems?.map((item) => (
			<div className={styles.shopItem} key={item._id}>
				<ShopItem shopItem={item} onAddToCartBtnClick={onAddToCartBtnClick} token={token} />
			</div>
		)) ?? [];

	return (
		<>
			<AddToCartPopup shown={isPopupShown} onPopupResult={onPopupResult} shopItem={popupShopItem} />
			<div className={styles.shopItems}>{shopItemsElements}</div>
		</>
	);
};

export default ShopItems;
