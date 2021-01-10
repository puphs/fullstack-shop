import { TShopItem } from '../../../types/types';
import Img from '../../Img/Img';
import Prices from '../../Prices/Prices';
import styles from './ShoppingCartItem.module.scss';

type Props = {
	shopItem: TShopItem;
};

const ShoppingCartItem: React.FC<Props> = ({ shopItem }) => {
	return (
		<div className={styles.cartItem}>
			<Img src={shopItem.imgLink} alt={'product'} fixedHeight={160} />
			<div className={styles.cartItemInfo}>
				<div className={styles.cartItemMainInfo}>
					<h6 className={styles.cartItemName}>{shopItem.name}</h6>
					<div className={styles.cartItemSizeContainer}>
						Size:
						<span className={styles.cartItemSize}>{shopItem.sizes}</span>
					</div>
				</div>
				<Prices prices={shopItem.prices} />
			</div>
		</div>
	);
};

export default ShoppingCartItem;
