import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { formatPrice } from '../../helpers/pricesHelper';
import { actions } from '../../redux/reducers/cartReducer';
import { AppState } from '../../redux/store';
import { routes } from '../../routes';
import { TCartItem } from '../../types/types';
import CartItemsList from './CartItemsList/CartItemsList';
import styles from './ShoppingCartPage.module.scss';

const ShoppingCart: React.FC = () => {
	const dispatch = useDispatch();

	const cartItems = useSelector((state: AppState) => state.cart.cartItems);
	const token = useSelector((state: AppState) => state.auth.token);

	const onRemoveItemBtnClick = (itemId: string) => {
		if (token) {
			dispatch(actions.removeItemFromCart(token, itemId));
		}
	};

	const onRemoveAllItemsBtnClick = () => {
		if (token) dispatch(actions.removeAllItemsFromCart(token));
	};

	if (!token) return <Redirect to={routes.login} />;
	if (!cartItems) {
		return <></>;
	}
	return (
		<div className={styles.cart}>
			<div className={styles.cartInfoAndItems}>
				{cartItems.length > 0 ? (
					<>
						<div className={styles.cartInfo}>
							<Button
								disabled={cartItems.length === 0 || !token}
								onClick={onRemoveAllItemsBtnClick}
							>
								{'clear cart'}
							</Button>
							<span className={styles.cartItemsCount}>{cartItems.length} item(s)</span>
						</div>

						<div className={styles.cartItems}>
							<CartItemsList cartItems={cartItems} onRemoveItemBtnClick={onRemoveItemBtnClick} />
						</div>
					</>
				) : (
					<h2 className={styles.emptyCartText}>Your shopping cart is empty...</h2>
				)}
			</div>

			<CartCalculator cartItems={cartItems} />
		</div>
	);
};

type CartCalculatorProps = {
	cartItems: Array<TCartItem>;
};

const CartCalculator: React.FC<CartCalculatorProps> = ({ cartItems }) => {
	const sumStandardPrices = cartItems.reduce<number>(
		(price, item) => price + item.shopItem.standardPrice,
		0
	);
	const sumDiscountPrices = cartItems.reduce<number>(
		(price, item) => price + (item.shopItem.discountPrice ?? item.shopItem.standardPrice),
		0
	);
	const standardPrice = sumStandardPrices;
	const discount = sumStandardPrices - sumDiscountPrices;
	const total = standardPrice - discount;

	return (
		<div className={styles.cartCalculatorOuter}>
			<section className={styles.cartCalculator}>
				<div className={styles.prices}>
					<div className={styles.price}>
						<span className={styles.priceName}>Standard price</span>
						<span onScroll={(e) => {}} className={styles.priceValue}>
							{formatPrice(standardPrice)}
						</span>
					</div>
					<div className={styles.price}>
						<span className={styles.priceName}>Discount</span>
						<span className={cn(styles.priceValue, styles.discountValue)}>
							{formatPrice(discount)}
						</span>
					</div>

					<div className={cn(styles.price, styles.total)}>
						<span className={cn(styles.priceName, styles.totalPriceName)}>Total</span>
						<span className={cn(styles.priceValue, styles.totalPriceValue)}>
							{formatPrice(total)}
						</span>
					</div>
				</div>

				<Button
					styleType={'special'}
					fullWidth
					disabled={!cartItems.length}
				>{`buy ${cartItems.length} item(s)`}</Button>
			</section>
		</div>
	);
};

export default ShoppingCart;
