import { NavLink } from 'react-router-dom';
import { TCategory } from '../../../types/types';
import styles from './SubcategoriesGroups.module.scss';

type Props = {
	subcategoriesGroups: TCategory['subcategoriesGroups'];
	categoryName: string;
};

const SubcategoriesGroup: React.FC<Props> = ({ subcategoriesGroups, categoryName }) => {
	const categoriesElements = subcategoriesGroups?.map((group, categoryIndex) => (
		<li className={styles.subcategoriesGroup} key={categoryIndex}>
			<div className={styles.groupName}>{group.groupName}</div>

			<ul className={styles.subcategoriesList}>
				{group.subcategories?.map((subcategory, subcategoryIndex) => (
					<li className={styles.subcategoryItem} key={subcategoryIndex}>
						<NavLink
							to={`/${categoryName}/${subcategory.name}`}
							className={styles.subcategoryItemLink}
							activeClassName={styles.subcategoryItemLink__active}
						>
							{subcategory.name}
						</NavLink>
					</li>
				))}
			</ul>
		</li>
	));

	return (
		<>
			<ul className={styles.subcategoriesGroups}>{categoriesElements}</ul>
		</>
	);
};

export default SubcategoriesGroup;
