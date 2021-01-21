import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { formatPrice } from '../../helpers/pricesHelper';
import { actions } from '../../redux/reducers/cartReducer';
import { AppState } from '../../redux/store';
import { TCartItem } from '../../types/types';
import Button from '../Button/Button';
import styles from './ShoppingCart.module.scss';
import ShoppingCartItems from './ShoppingCartItems/ShoppingCartItems';

const ShoppingCart: React.FC = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state: AppState) => state.cart.cartItems);

	const token = useSelector((state: AppState) => state.auth.token);

	useEffect(() => {
		if (token) {
			dispatch(actions.loadCartItems(token));
		}
	}, [token, dispatch]);

	if (!token) {
		return <Redirect to={'/oops/not-logged-in'} />;
	}

	const onRemoveAllItemsBtnClick = () => {
		if (token) dispatch(actions.removeAllItemsFromCart(token));
	};

	if (!cartItems) {
		return <></>;
	}

	return (
		<div className={styles.cart}>
			<div className={styles.cartInfoAndItems}>
				<div className={styles.cartInfo}>
					<Button disabled={cartItems.length === 0 || !token} onClick={onRemoveAllItemsBtnClick}>
						{'clear cart'}
					</Button>
					<span className={styles.cartItemsCount}>{cartItems.length} item(s)</span>
				</div>

				<div className={styles.cartItems}>
					<ShoppingCartItems />
				</div>
			</div>
			<CartCalculator cartItems={cartItems} />
		</div>
	);
};

type CartCalculatorProps = {
	cartItems: Array<TCartItem>;
};

const CartCalculator: React.FC<CartCalculatorProps> = ({ cartItems }) => {
	const cartCalculatorRef = useRef<HTMLDivElement>(null);
	const cartCalculatorOuterRef = useRef<HTMLDivElement>(null);

	const onScroll = () => {
		if (!cartCalculatorOuterRef.current) return;
		const calculatorOffsetTop = cartCalculatorOuterRef.current.offsetTop;

		if (window.scrollY + 32 >= calculatorOffsetTop) {
			cartCalculatorRef.current?.setAttribute('style', 'position: fixed; top: 32px;');
		} else {
			cartCalculatorRef.current?.removeAttribute('style');
		}
	};

	useEffect(() => {
		document.addEventListener('scroll', onScroll);
		return () => {
			document.removeEventListener('scroll', onScroll);
		};
	});
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
		<div className={styles.cartCalculatorOuter} ref={cartCalculatorOuterRef}>
			<section className={styles.cartCalculator} ref={cartCalculatorRef}>
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

				<Button fullWidth>{`buy ${cartItems.length} item(s)`}</Button>
			</section>
		</div>
	);
};

export default ShoppingCart;
