import CategoriesNav from '../CategoriesNav/CategoriesNav';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
	return (
		<>
			<aside className={styles.sidebar}>
				<CategoriesNav />
			</aside>
		</>
	);
};

export default Sidebar;
