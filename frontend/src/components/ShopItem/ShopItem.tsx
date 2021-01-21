import React from 'react';
import styles from './ShopItem.module.scss';
import Prices from '../Prices/Prices';
import Button from '../Button/Button';
import { TShopItem } from '../../types/types';
import Img from '../Img/Img';

type Props = {
	shopItem: TShopItem;
};

const ShopItem: React.FC<Props> = ({ shopItem }) => {
	return (
		<div className={styles.item}>
			<Button style={{ height: '38px' }} fullWidth styleType={'secondary'}>
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
