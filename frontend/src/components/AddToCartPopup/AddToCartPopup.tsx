import Button from '../Button/Button';
import Img from '../Img/Img';
import Prices from '../Prices/Prices';
import SizeSelection from '../SizeSelection/SizeSelection';
import styles from './AddToCartPopup.module.scss';

type Props = {};

const AddToCartPopup: React.FC<Props> = (props) => {
	return (
		<div className={styles.background}>
			<div className={styles.popup}>
				<div className={styles.product}>
					<Img
						src={'https://i1.wp.com/infoglaz.ru/wp-content/uploads/verticalgarden.jpg'}
						alt={'product'}
						fixedWidth={220}
					/>

					<h2 className={styles.productName}>Rainbow Sneakers</h2>
				</div>
				<div className={styles.options}>
					<SizeSelection sizes={['11', '12', '13']} />

					<div className={styles.priceAndAddToCartBtn}>
						<Prices prices={{ discountPrice: 200.99, standardPrice: 250.99 }} />
						<div className={styles.addToCartBtn}>
							<Button fullWidth>{'Add to cart'}</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddToCartPopup;
