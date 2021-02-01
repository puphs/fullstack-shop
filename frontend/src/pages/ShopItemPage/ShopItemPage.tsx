import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Img from '../../components/Img/Img';
import Prices from '../../components/Prices/Prices';
import SizeSelection from '../../components/SizeSelection/SizeSelection';
import { actions } from '../../redux/reducers/shopReducer';
import { AppState } from '../../redux/store';
import styles from './ShopItemPage.module.scss';

type Params = { shopItemId: string };

const ShopItemPage = () => {
	const { shopItemId } = useParams<Params>();
	const shopItem = useSelector((state: AppState) => state.shop.shopItem);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.loadShopItem(shopItemId));
	}, [shopItemId]);

	const onSizeSelected = (size: string) => {};

	if (!shopItem) return <></>;

	return (
		<div className={styles.shopItem}>
			<Img fixedWidth={400} src={shopItem.imgLink} alt={'product'} />
			<div className={styles.shopItemInfo}>
				<div className={styles.topInfo}>
					<h3 className={styles.shopItemName}>{shopItem.name}</h3>
					<p className={styles.shopItemName}>{shopItem.description}</p>
					<SizeSelection sizes={shopItem.sizes} onSizeSelected={onSizeSelected} />
				</div>
				<div className={styles.bottomInfo}>
					<Prices standardPrice={shopItem.standardPrice} discountPrice={shopItem.discountPrice} />
					<div className={styles.buttons}>
						<Button styleType={'primary'}>Add to cart</Button>
						<Button styleType={'primary'}>Buy</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopItemPage;
