import { NavLink } from 'react-router-dom';
import { Category } from '../../../types/types';
import styles from './CategoriesList.module.scss';

type Props = {
	categoriesList: Array<Category>;
};

const CategoriesList: React.FC<Props> = ({ categoriesList }) => {
	const categoriesElements = categoriesList.map((category) => (
		<li className={styles.categoryItem}>
			<div className={styles.categoryName}>{category.name}</div>

			<ul className={styles.subcategoriesList}>
				{category.subcategories?.map((subcategory) => (
					<li className={styles.subcategoryItem}>
						<NavLink to={'/'} className={styles.subcategoryItemLink}>
							{subcategory.name}
						</NavLink>
					</li>
				))}
			</ul>
		</li>
	));

	return <ul className={styles.categoriesList}>{categoriesElements}</ul>;
};

export default CategoriesList;
