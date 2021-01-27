import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import ShopItem from '../ShopItem/ShopItem';
import Sidebar from '../Sidebar/Sidebar';
import styles from './MainPage.module.scss';

const MainPage = () => {
	const shopItems = useSelector((state: AppState) => state.shop.shopItems);
	const token = useSelector((state: AppState) => state.auth.token);

	const shopItemsElements =
		shopItems?.map((item) => (
			<div className={styles.shopItem} key={item._id}>
				<ShopItem shopItem={item} token={token} />
			</div>
		)) ?? [];

	return (
		<div className={styles.content}>
			<Sidebar />
			<div className={styles.shopItems}>{shopItemsElements}</div>
		</div>
	);
};

export default MainPage;
