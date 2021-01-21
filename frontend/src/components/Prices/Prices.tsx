import React from 'react';
import { formatPrice } from '../../helpers/pricesHelper';
import styles from './Prices.module.scss';

type Props = {
	standardPrice: number;
	discountPrice: number | null;
};

const Prices: React.FC<Props> = ({ standardPrice, discountPrice }) => {
	return (
		<div className={styles.prices}>
			{discountPrice ? (
				<>
					{discountPrice && (
						<span className={styles.discountPrice}>{formatPrice(discountPrice)}</span>
					)}
					<span className={styles.standardPrice}>{formatPrice(standardPrice)}</span>
				</>
			) : (
				<span className={styles.priceWithoutDiscount}>{formatPrice(standardPrice)}</span>
			)}
		</div>
	);
};

export default Prices;
