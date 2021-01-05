import React from 'react';
import styles from './Prices.module.scss';

type Props = {
	discountPrice: number | null;
	standardPrice: number;
};

const Prices: React.FC<Props> = ({ discountPrice, standardPrice }) => {
	const formatPrice = (price: number) => `$${price.toFixed(2)}`;

	return (
		<div className={styles.prices}>
			{discountPrice ? (
				<>
					<span className={styles.discountPrice}>{formatPrice(discountPrice)}</span>
					<span className={styles.standardPrice}>{formatPrice(standardPrice)}</span>
				</>
			) : (
				<span className={styles.priceWithoutDiscount}>{formatPrice(standardPrice)}</span>
			)}
		</div>
	);
};

export default Prices;
