import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TShopItem } from '../../types/types';
import Button from '../Button/Button';
import Img from '../Img/Img';
import Prices from '../Prices/Prices';
import styles from './ShopItem.module.scss';

type Props = {
	shopItem: TShopItem;
	token: string | null;
	onAddToCartBtnClick: (shopItem: TShopItem) => void;
};

const ShopItem: React.FC<Props> = ({ shopItem, token, onAddToCartBtnClick }) => {
	const history = useHistory();

	const onLoginOrAddToCartBtnClick = () => {
		if (!token) {
			history.push('/auth/login');
		} else {
			onAddToCartBtnClick(shopItem);
		}
	};

	return (
		<div className={styles.item}>
			<Button
				style={{ height: '38px' }}
				fullWidth
				styleType={'secondary'}
				onClick={onLoginOrAddToCartBtnClick}
			>
				{token ? 'Add to cart' : 'Login to buy'}
			</Button>
			<Link className={styles.content} to={`/item/${shopItem._id}`}>
				<div className={styles.moreInfoBlackout}>
					<div className={styles.moreInfoText}>Click for more info</div>
				</div>
				<Img src={shopItem.imgLink} alt={shopItem.name} fixedHeight={220} />
				<h6 className={styles.productName}>{shopItem.name}</h6>
				<Prices standardPrice={shopItem.standardPrice} discountPrice={shopItem.discountPrice} />
			</Link>
		</div>
	);
};

export default ShopItem;
