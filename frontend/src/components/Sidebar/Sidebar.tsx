import CategoriesNavContainer from '../CategoriesNav/CategoriesNavContainer';
import styles from './Sidebar.module.scss';

type Props = {};

const Sidebar: React.FC<Props> = (props) => {
	return (
		<>
			<aside className={styles.sidebar}>
				<CategoriesNavContainer />
			</aside>
		</>
	);
};

export default Sidebar;
