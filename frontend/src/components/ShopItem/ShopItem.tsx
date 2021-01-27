import React, { useState } from 'react';
import styles from './ShopItem.module.scss';
import Prices from '../Prices/Prices';
import Button from '../Button/Button';
import { TShopItem } from '../../types/types';
import Img from '../Img/Img';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/reducers/cartReducer';
import AddToCartPopup, { PopupResult } from '../AddToCartPopup/AddToCartPopup';

type Props = {
	shopItem: TShopItem;
	token: string | null;
};

const ShopItem: React.FC<Props> = ({ shopItem, token }) => {
	const [isAddToCartFetching, setIsAddToCartFetching] = useState(false);
	const [isPopupShown, setIsPopupShown] = useState(false);
	const dispatch = useDispatch();

	const onAddToCartBtnClick = async () => {
		setIsPopupShown(true);
	};

	const onPopupResult = (result: PopupResult) => {
		if (result && token) {
			dispatch(actions.addItemToCart(token, shopItem._id, result.size));
		}
		setIsPopupShown(false);
	};

	return (
		<div className={styles.item}>
			{isPopupShown && <AddToCartPopup shopItem={shopItem} onPopupResult={onPopupResult} />}
			<Button
				style={{ height: '38px' }}
				fullWidth
				disabled={token === null || isAddToCartFetching}
				styleType={'secondary'}
				onClick={onAddToCartBtnClick}
			>
				{'Add to cart'}
			</Button>
			<div className={styles.content}>
				<div className={styles.moreInfoBlackout}>
					<div className={styles.moreInfoText}>Click for more info</div>
				</div>
				<Img src={shopItem.imgLink} alt={shopItem.name} fixedHeight={220} />
				<h6 className={styles.productName}>{shopItem.name}</h6>
				<Prices standardPrice={shopItem.standardPrice} discountPrice={shopItem.discountPrice} />
			</div>
		</div>
	);
};

export default ShopItem;
