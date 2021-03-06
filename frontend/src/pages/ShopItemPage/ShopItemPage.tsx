import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Img from '../../components/Img/Img';
import Prices from '../../components/Prices/Prices';
import SizeSelection from '../../components/SizeSelection/SizeSelection';
import { shopActions } from '../../redux/reducers/shopReducer';
import { cartActions } from '../../redux/reducers/cartReducer';
import { AppState } from '../../redux/store';
import styles from './ShopItemPage.module.scss';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { routes, routeWithRedirectTo } from '../../routes';

type Params = { shopItemId: string };

const ShopItemPage = () => {
	const [itemSize, setItemSize] = useState('');
	const token = useSelector((state: AppState) => state.auth.token);
	const shopItem = useSelector((state: AppState) => state.shop.shopItem);
	const isShopItemFetching = useSelector((state: AppState) => state.shop.isShopItemFetching);
	const { shopItemId } = useParams<Params>();

	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(shopActions.loadShopItem(shopItemId));
	}, [shopItemId]);

	const onSizeSelected = (size: string) => {
		setItemSize(size);
	};

	const onLoginOrAddToCartBtnClick = () => {
		if (!token) {
			history.push(routeWithRedirectTo(routes.login, `${routes.shopItem}/${shopItemId}`));
		} else {
			if (shopItem) {
				dispatch(cartActions.addItemToCart(token, shopItem._id, itemSize));
			}
		}
	};

	if (!shopItem) {
		if (isShopItemFetching) {
			return <></>;
		} else {
			return <h4 className={styles.invalidItemId}>Invalid item id</h4>;
		}
	}

	return (
		<div className={styles.shopItem}>
			<Zoom>
				<Img fixedWidth={400} src={shopItem.imgLink} alt={'product'} />
			</Zoom>
			<div className={styles.shopItemInfo}>
				<div className={styles.topInfo}>
					<h3 className={styles.itemName}>{shopItem.name}</h3>
					<p className={styles.itemDescription}>{shopItem.description}</p>
				</div>
				<div className={styles.bottomInfo}>
					<SizeSelection sizes={shopItem.sizes} onSizeSelected={onSizeSelected} />
					<div className={styles.prices}>
						<Prices standardPrice={shopItem.standardPrice} discountPrice={shopItem.discountPrice} />
					</div>
					<div className={styles.buttons}>
						<Button styleType={'primary'} onClick={onLoginOrAddToCartBtnClick}>
							{token ? 'Add to cart' : 'Login to buy'}
						</Button>
						{token && (
							<Button styleType={'special'} style={{ marginLeft: 32, minWidth: 160 }}>
								Buy
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopItemPage;
