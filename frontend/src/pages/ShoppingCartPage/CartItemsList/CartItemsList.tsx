import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { TCartItem } from '../../../types/types';
import CartItem from '../CartItem/CartItem';
import styles from './CartItemsList.module.scss';
import cartItemStyles from '../CartItem/CartItem.module.scss';

type Props = {
	cartItems: Array<TCartItem>;
	onRemoveItemBtnClick: (itemId: string) => void;
};

const ShoppingCartItems: React.FC<Props> = ({ cartItems, onRemoveItemBtnClick }) => {
	const cartItemsElements = cartItems.map((item) => (
		<CSSTransition
			key={item._id}
			classNames={{
				enter: cartItemStyles.transitionEnter,
				enterActive: cartItemStyles.transitionEnterActive,
				exit: cartItemStyles.transitionExit,
				exitActive: cartItemStyles.transitionExitActive,
			}}
			in={true}
			timeout={300}
		>
			<CartItem cartItem={item} onRemoveItemBtnClick={() => onRemoveItemBtnClick(item._id)} />
		</CSSTransition>
	));

	return <TransitionGroup className={styles.cartItemsList}>{cartItemsElements}</TransitionGroup>;
};

export default ShoppingCartItems;
