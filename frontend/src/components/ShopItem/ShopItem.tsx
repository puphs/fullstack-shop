import React from 'react';
import styles from './ShopItem.module.scss';
import cn from 'classnames';

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
				<div className={styles.prices}>
					{/* <span className={styles.discountPrice}>$125.99</span> */}
					{/* <span className={styles.standardPrice}>$150.99</span> */}
					<span className={styles.priceWithoutDiscount}>$150.99</span>
				</div>
			</div>
		</div>
	);
};

export default ShopItem;
