import Button from '../Button/Button';
import Prices from '../Prices/Prices';
import SizeSelection from '../SizeSelection/SizeSelection';
import styles from './AddToCartPopup.module.scss';

type Props = {};

const AddToCartPopup: React.FC<Props> = (props) => {
	return (
		<div className={styles.background}>
			<div className={styles.popup}>
				<div className={styles.product}>
					<div className={styles.imgContainer}>
						<img
							className={styles.productImg}
							src={'https://i1.wp.com/infoglaz.ru/wp-content/uploads/verticalgarden.jpg'}
							alt={'product'}
						></img>
					</div>

					<h2 className={styles.productName}>Rainbow Sneakers</h2>
				</div>
				<div className={styles.options}>
					<SizeSelection />

					<div className={styles.priceAndAddToCartBtn}>
						<Prices discountPrice={200.99} standardPrice={250.99} />
						<div className={styles.addToCartBtn}>
							<Button text={'Add to cart'} fullWidth />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddToCartPopup;
