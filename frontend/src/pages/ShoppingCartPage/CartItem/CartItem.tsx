import { CSSTransition } from 'react-transition-group';
import { TCartItem } from '../../../types/types';
import Img from '../../../components/Img/Img';
import Prices from '../../../components/Prices/Prices';
import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';

type Props = {
	cartItem: TCartItem;
	onRemoveItemBtnClick: () => void;
};

const ShoppingCartItem: React.FC<Props> = ({ cartItem, onRemoveItemBtnClick }) => {
	const OnRemoveBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.currentTarget.disabled = true;
		onRemoveItemBtnClick();
	};
	return (
		<CSSTransition
			classNames={{
				enter: styles.transitionEnter,
				enterActive: styles.transitionEnterActive,
				exit: styles.transitionExit,
				exitActive: styles.transitionExitActive,
			}}
			timeout={2000}
		>
			<div className={styles.cartItem}>
				<Link
					className={styles.cartItemLink}
					to={`${routes.shopItem}/${cartItem.shopItem._id}`}
				></Link>
				<Img src={cartItem.shopItem.imgLink} alt={'product'} fixedWidth={130} fixedHeight={130} />
				<div className={styles.cartItemInfo}>
					<div className={styles.cartItemMainInfo}>
						<h6 className={styles.cartItemName}>{cartItem.shopItem.name}</h6>
						<div className={styles.cartItemSizeContainer}>
							Size:
							<span className={styles.cartItemSize}>{cartItem.size}</span>
						</div>
					</div>
					<Prices
						standardPrice={cartItem.shopItem.standardPrice}
						discountPrice={cartItem.shopItem.discountPrice}
					/>
				</div>
				<button className={styles.removeCartItemBtn} onClick={OnRemoveBtnClick}></button>
			</div>
		</CSSTransition>
	);
};

export default ShoppingCartItem;
