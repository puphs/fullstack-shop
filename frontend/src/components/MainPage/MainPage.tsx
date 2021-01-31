import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { TShopItem } from '../../types/types';
import AddToCartPopup from '../AddToCartPopup/AddToCartPopup';
import ShopItem from '../ShopItem/ShopItem';
import Sidebar from '../Sidebar/Sidebar';
import styles from './MainPage.module.scss';
import ShopItems from './ShopItems/ShopItems';

const MainPage = () => {
	const shopItems = useSelector((state: AppState) => state.shop.shopItems);
	const token = useSelector((state: AppState) => state.auth.token);

	return (
		<div className={styles.content}>
			<Sidebar />
			<ShopItems shopItems={shopItems} token={token} />
		</div>
	);
};

export default MainPage;
