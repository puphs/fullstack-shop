import CategoriesNav from '../CategoriesNav/CategoriesNav';
import styles from './Sidebar.module.scss';

type Props = {};

const Sidebar: React.FC<Props> = (props) => {
	return (
		<>
			<aside className={styles.sidebar}>
				<CategoriesNav />
			</aside>
		</>
	);
};

export default Sidebar;
