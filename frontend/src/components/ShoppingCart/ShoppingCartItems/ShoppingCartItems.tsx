import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { actions } from '../../../redux/reducers/cartReducer';
import { AppState } from '../../../redux/store';
import styles from './ShoppingCartItems.module.scss';
import shoppingCartItemStyles from '../ShoppingCartItem/ShoppingCartItem.module.scss';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';

const ShoppingCartItems: React.FC = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state: AppState) => state.cart.cartItems) ?? [];
	const token = useSelector((state: AppState) => state.auth.token);
	useEffect(() => {
		if (token) {
			dispatch(actions.loadCartItems(token));
		}
	}, [token, dispatch]);

	const onRemoveItemBtnClick = (itemId: string) => {
		if (token) {
			dispatch(actions.removeItemFromCart(token, itemId));
		}
	};

	const cartItemsElements = cartItems.map((item) => (
		<CSSTransition
			key={item._id}
			classNames={{
				enter: shoppingCartItemStyles.transitionEnter,
				enterActive: shoppingCartItemStyles.transitionEnterActive,
				exit: shoppingCartItemStyles.transitionExit,
				exitActive: shoppingCartItemStyles.transitionExitActive,
			}}
			in={true}
			timeout={200}
		>
			<ShoppingCartItem
				cartItem={item}
				onRemoveItemBtnClick={() => onRemoveItemBtnClick(item._id)}
			/>
		</CSSTransition>
	));

	return <TransitionGroup className={styles.cartItems}>{cartItemsElements}</TransitionGroup>;
};

export default ShoppingCartItems;
