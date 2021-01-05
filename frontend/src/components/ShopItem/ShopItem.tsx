import React from 'react';
import styles from './ShopItem.module.scss';
import cn from 'classnames';
import Prices from '../Prices/Prices';

type Props = {};

const ShopItem: React.FC<Props> = (props) => {
	return (
		<div className={styles.item}>
			{/* <button className={cn(styles.addToCartBtn)}>Add to cart</button> */}
			<button className={cn(styles.removeFromCartBtn)}>In the cart</button>
			<div className={styles.content}>
				<div className={styles.moreInfoBlackout}>
					<div className={styles.moreInfoText}>Click for more info</div>
				</div>
				<div className={styles.productImg} />
				<h6 className={styles.productName}>Men's Jacket</h6>
				<Prices discountPrice={322} standardPrice={390} />
			</div>
		</div>
	);
};

export default ShopItem;
