import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { LoadShopItemsParams } from '../../../api/shopApi';
import { actions as cartActions } from '../../../redux/reducers/cartReducer';
import { actions as shopActions } from '../../../redux/reducers/shopReducer';
import { TShopItem } from '../../../types/types';
import AddToCartPopup, { PopupResult } from '../../../components/AddToCartPopup/AddToCartPopup';
import ShopItem from '../../../components/ShopItem/ShopItem';
import styles from './ShopItems.module.scss';
import qs from 'query-string';
import { AppState } from '../../../redux/store';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';

type Params = {
	category: string;
	subcategory: string;
};

const ShopItems: React.FC = () => {
	const [popupShopItem, setPopupShopItem] = useState<TShopItem | null>(null);
	const [isPopupShown, setIsPopupShown] = useState(false);
	const shopItems = useSelector((state: AppState) => state.shop.shopItems);
	const token = useSelector((state: AppState) => state.auth.token);

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
			<SwitchTransition>
				<CSSTransition
					key={JSON.stringify(shopItems)}
					timeout={300}
					classNames={{
						enter: styles.transitionEnter,
						enterActive: styles.transitionEnterActive,
						exit: styles.transitionExit,
						exitActive: styles.transitionExitActive,
					}}
				>
					{shopItems && shopItems.length ? (
						<div className={styles.shopItems}>{shopItemsElements}</div>
					) : (
						<div className={styles.noItemsFound}>No items found</div>
					)}
				</CSSTransition>
			</SwitchTransition>
		</>
	);
};

export default ShopItems;
