import { NavLink } from 'react-router-dom';
import { TCategory } from '../../../types/types';
import styles from './CategoriesList.module.scss';

type Props = {
	categoriesList: Array<TCategory>;
};

const CategoriesList: React.FC<Props> = ({ categoriesList }) => {
	const categoriesElements = categoriesList.map((category, categoryIndex) => (
		<li className={styles.categoryItem} key={categoryIndex}>
			<div className={styles.categoryName}>{category.name}</div>

			<ul className={styles.subcategoriesList}>
				{category.subcategories?.map((subcategory, subcategoryIndex) => (
					<li className={styles.subcategoryItem} key={subcategoryIndex}>
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
