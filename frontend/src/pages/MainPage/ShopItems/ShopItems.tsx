import qs from 'query-string';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { LoadShopItemsParams } from '../../../api/shopApi';
import AddToCartPopup, { PopupResult } from '../../../components/AddToCartPopup/AddToCartPopup';
import Button from '../../../components/Button/Button';
import ShopItem from '../../../components/ShopItem/ShopItem';
import { cartActions } from '../../../redux/reducers/cartReducer';
import { shopActions } from '../../../redux/reducers/shopReducer';
import { AppState } from '../../../redux/store';
import { TShopItem } from '../../../types/types';
import styles from './ShopItems.module.scss';

type Params = {
	category: string;
	subcategory: string;
};

const ShopItems: React.FC = () => {
	const [popupShopItem, setPopupShopItem] = useState<TShopItem | null>(null);
	const [isPopupShown, setIsPopupShown] = useState(false);

	const page = useSelector((state: AppState) => state.shop.shopItemsPage);
	const areShopItemsFetching = useSelector((state: AppState) => state.shop.areShopItemsFetching);
	const isShopItemsEndReached = useSelector((state: AppState) => state.shop.isShopItemsEndReached);
	const shopItems = useSelector((state: AppState) => state.shop.shopItems);
	const token = useSelector((state: AppState) => state.auth.token);

	const dispatch = useDispatch();
	const location = useLocation();
	const { category, subcategory } = useParams<Params>();

	useEffect(() => {
		dispatch(shopActions.setShopItemsPage(1));
	}, [location.search, category, subcategory]);

	useEffect(() => {
		const { search } = qs.parse(location.search);
		const loadItemsParams: LoadShopItemsParams = {
			search: search?.toString(),
			page,
			category,
			subcategory,
		};
		dispatch(shopActions.loadShopItems(loadItemsParams));
	}, [location.search, category, subcategory, page]);

	const onAddToCartBtnClick = (shopItem: TShopItem) => {
		setPopupShopItem(shopItem);
		setIsPopupShown(true);
	};

	const onPopupResult = (result: PopupResult) => {
		if (result && token) {
			dispatch(cartActions.addItemToCart(token, popupShopItem!._id, result.size));
		}
		setIsPopupShown(false);
	};

	const onLoadMoreBtnClick = () => {
		dispatch(shopActions.setShopItemsPage(page + 1));
	};

	const shopItemsElements =
		shopItems?.map((item) => (
			<Fragment key={item._id}>
				<ShopItem shopItem={item} onAddToCartBtnClick={onAddToCartBtnClick} token={token} />
			</Fragment>
		)) ?? [];

	const transitionKey = category + subcategory + location.search + page;
	return (
		<>
			<AddToCartPopup shown={isPopupShown} onPopupResult={onPopupResult} shopItem={popupShopItem} />
			<SwitchTransition>
				<CSSTransition
					key={transitionKey}
					timeout={300}
					classNames={{
						enter: styles.transitionEnter,
						enterActive: styles.transitionEnterActive,
						exit: styles.transitionExit,
						exitActive: styles.transitionExitActive,
					}}
				>
					<div className={styles.shopItemsContainer}>
						{!areShopItemsFetching && shopItems && shopItems.length && (
							<>
								<div className={styles.shopItems}>{shopItemsElements}</div>
								{!isShopItemsEndReached && (
									<div className={styles.loadMoreBtn}>
										<Button styleType={'secondary'} onClick={onLoadMoreBtnClick}>
											Load more
										</Button>
									</div>
								)}
							</>
						)}
						{!areShopItemsFetching && !shopItems && (
							<div className={styles.noItemsFound}>No items found</div>
						)}
					</div>
				</CSSTransition>
			</SwitchTransition>
		</>
	);
};

export default ShopItems;
