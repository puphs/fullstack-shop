import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/reducers/shopReducer';
import { AppState } from '../../redux/store';
import ShopItem from '../ShopItem/ShopItem';
import Sidebar from '../Sidebar/Sidebar';
import styles from './MainPage.module.scss';

const MainPage = () => {
	const dispatch = useDispatch();
	const shopItems = useSelector((state: AppState) => state.shop.shopItems);

	// useEffect(() => {
	// 	console.log('disp');
	// 	dispatch(actions.loadShopItems({}));
	// }, [dispatch]);

	const shopItemsElements =
		shopItems?.map((item) => <ShopItem key={item._id} shopItem={item} />) ?? [];

	return (
		<div className={styles.content}>
			<Sidebar />
			<div className={styles.shopItems}>{shopItemsElements}</div>
		</div>
	);
};

export default MainPage;
