import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './MainPage.module.scss';
import ShopItems from './ShopItems/ShopItems';

const MainPage = () => {
	return (
		<div className={styles.content}>
			<Sidebar />
			<ShopItems />
		</div>
	);
};

export default MainPage;
