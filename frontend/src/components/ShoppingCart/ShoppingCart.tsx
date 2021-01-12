import { TShopItem } from '../../types/types';
import Button from '../Button/Button';
import Prices from '../Prices/Prices';
import styles from './ShoppingCart.module.scss';
import cn from 'classnames';
import Img from '../Img/Img';
import ShopItem from '../ShopItem/ShopItem';
import ShoppingCartItem from './ShoppingCartItem/ShoppingCartItem';
import { useRef } from 'react';

type Props = {};

const ShoppingCart: React.FC<Props> = (props) => {
	const cartItems: Array<TShopItem> = [
		{
			id: 0,
			name: 'name',
			description: 'descr',
			imgLink:
				'http://ae01.alicdn.com/kf/HTB1gZ22RXXXXXa_aVXXq6xXFXXXW.jpg?size=70946&height=832&width=790&hash=5fb45556337dbbc6af7c7229e424e83f',
			prices: {
				discountPrice: 330.2,
				standardPrice: 390,
			},
		},
		{
			id: 1,
			name: 'name 2',
			description: 'descr 2',
			imgLink:
				'http://ae01.alicdn.com/kf/HTB1gZ22RXXXXXa_aVXXq6xXFXXXW.jpg?size=70946&height=832&width=790&hash=5fb45556337dbbc6af7c7229e424e83f',
			prices: {
				discountPrice: null,
				standardPrice: 900,
			},
		},
		{
			id: 1,
			name: 'name 2',
			description: 'descr 2',
			imgLink:
				'http://ae01.alicdn.com/kf/HTB1gZ22RXXXXXa_aVXXq6xXFXXXW.jpg?size=70946&height=832&width=790&hash=5fb45556337dbbc6af7c7229e424e83f',
			prices: {
				discountPrice: null,
				standardPrice: 900,
			},
		},
		{
			id: 1,
			name: 'name 2',
			description: 'descr 2',
			imgLink:
				'http://ae01.alicdn.com/kf/HTB1gZ22RXXXXXa_aVXXq6xXFXXXW.jpg?size=70946&height=832&width=790&hash=5fb45556337dbbc6af7c7229e424e83f',
			prices: {
				discountPrice: null,
				standardPrice: 900,
			},
		},
		{
			id: 1,
			name: 'name 2',
			description: 'descr 2',
			imgLink:
				'http://ae01.alicdn.com/kf/HTB1gZ22RXXXXXa_aVXXq6xXFXXXW.jpg?size=70946&height=832&width=790&hash=5fb45556337dbbc6af7c7229e424e83f',
			prices: {
				discountPrice: null,
				standardPrice: 900,
			},
		},
		{
			id: 1,
			name: 'name 2',
			description: 'descr 2',
			imgLink:
				'http://ae01.alicdn.com/kf/HTB1gZ22RXXXXXa_aVXXq6xXFXXXW.jpg?size=70946&height=832&width=790&hash=5fb45556337dbbc6af7c7229e424e83f',
			prices: {
				discountPrice: null,
				standardPrice: 900,
			},
		},
		{
			id: 1,
			name: 'name 2',
			description: 'descr 2',
			imgLink:
				'http://ae01.alicdn.com/kf/HTB1gZ22RXXXXXa_aVXXq6xXFXXXW.jpg?size=70946&height=832&width=790&hash=5fb45556337dbbc6af7c7229e424e83f',
			prices: {
				discountPrice: null,
				standardPrice: 900,
			},
		},
		{
			id: 1,
			name: 'name 2',
			description: 'descr 2',
			imgLink:
				'http://ae01.alicdn.com/kf/HTB1gZ22RXXXXXa_aVXXq6xXFXXXW.jpg?size=70946&height=832&width=790&hash=5fb45556337dbbc6af7c7229e424e83f',
			prices: {
				discountPrice: null,
				standardPrice: 900,
			},
		},
	];

	const cartItemsElements = cartItems.map((item, index) => (
		<li key={index} className={styles.cartItem}>
			<ShoppingCartItem shopItem={item} />
		</li>
	));

	const cartCalculatorRef = useRef<HTMLDivElement>(null);
	const cartCalculatorOuterRef = useRef<HTMLDivElement>(null);

	document.addEventListener('scroll', (e) => {
		if (!cartCalculatorOuterRef.current) return;
		const calculatorOffsetTop = cartCalculatorOuterRef.current.offsetTop;

		if (window.scrollY + 32 >= calculatorOffsetTop) {
			cartCalculatorRef.current?.setAttribute('style', 'position: fixed; top: 32px;');
		} else {
			cartCalculatorRef.current?.removeAttribute('style');
		}
	});

	return (
		<div className={styles.cart}>
			<div className={styles.cartInfoAndItems}>
				<div className={styles.cartInfo}>
					<Button>{'clear cart'}</Button>
					<span className={styles.cartItemsCount}>2 items</span>
				</div>
				<ul className={styles.cartItemsList}>{cartItemsElements}</ul>
			</div>

			<div className={styles.cartCalculatorOuter} ref={cartCalculatorOuterRef}>
				<section className={styles.cartCalculator} ref={cartCalculatorRef}>
					<div className={styles.prices}>
						<div className={styles.price}>
							<span className={styles.priceName}>Standard price</span>
							<span onScroll={(e) => {}} className={styles.priceValue}>
								$90.00
							</span>
						</div>
						<div className={styles.price}>
							<span className={styles.priceName}>Discount</span>
							<span className={cn(styles.priceValue, styles.discountValue)}>$0.00</span>
						</div>

						<div className={cn(styles.price, styles.total)}>
							<span className={cn(styles.priceName, styles.totalPriceName)}>Total</span>
							<span className={cn(styles.priceValue, styles.totalPriceValue)}>$90.00</span>
						</div>
					</div>

					<Button fullWidth>{`buy ${cartItems.length} item(s)`}</Button>
				</section>
			</div>
		</div>
	);
};

export default ShoppingCart;
