import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../../redux/reducers/cartReducer';
import { TShopItem } from '../../../types/types';
import AddToCartPopup, { PopupResult } from '../../AddToCartPopup/AddToCartPopup';
import ShopItem from '../../ShopItem/ShopItem';
import styles from './ShopItems.module.scss';

type Props = {
	shopItems: Array<TShopItem> | null;
	token: string | null;
};

const ShopItems: React.FC<Props> = ({ shopItems, token }) => {
	const dispatch = useDispatch();

	const [popupShopItem, setPopupShopItem] = useState<TShopItem | null>(null);
	const [isPopupShown, setIsPopupShown] = useState(false);

	const onAddToCartBtnClick = (shopItem: TShopItem) => {
		setPopupShopItem(shopItem);
		setIsPopupShown(true);
	};
	// useEffect(() => {
	// 	if (!isCartActionFetching && isPopupShown) {
	// 		setIsPopupShown(false);
	// 	}
	// }, [isCartActionFetching]);

	const onPopupResult = (result: PopupResult) => {
		if (result && token) {
			dispatch(actions.addItemToCart(token, popupShopItem!._id, result.size));
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
