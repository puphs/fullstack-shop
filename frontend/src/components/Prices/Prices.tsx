import React from 'react';
import { TPrices } from '../../types/types';
import styles from './Prices.module.scss';

type Props = {
	prices: TPrices;
};

const Prices: React.FC<Props> = ({ prices }) => {
	const formatPrice = (price: number) => `$${price.toFixed(2)}`;
	const { discountPrice, standardPrice } = prices;
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
