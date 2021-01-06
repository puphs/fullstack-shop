import { NavLink } from 'react-router-dom';
import styles from './CategoriesList.module.scss';

type Props = {};

const CategoriesList: React.FC<Props> = (props) => {
	const categories = [
		{
			category: 'Shoes',
			subcategories: [
				{ category: 'sneakers' },
				{ category: 'boots' },
				{ category: 'slippers' },
				{ category: 'sandals' },
				{ category: 'Low shoes' },
			],
		},
		{
			category: 'Clothing',
			subcategories: [
				{ category: 'sneakers' },
				{ category: 'boots' },
				{ category: 'slippers' },
				{ category: 'sandals' },
				{ category: 'Low shoes' },
				{ category: 'Low shoes' },
				{ category: 'Low shoes' },
			],
		},
		{
			category: 'Accessories',
			subcategories: [
				{ category: 'sneakers' },
				{ category: 'boots' },
				{ category: 'boots' },
				{ category: 'slippers' },
				{ category: 'sandals' },
				{ category: 'Low shoes' },
			],
		},
	];

	const categoriesElements = categories.map((item) => (
		<li className={styles.categoryItem}>
			<div className={styles.categoryName}>{item.category}</div>
			<ul className={styles.subcategoriesList}>
				{item.subcategories.map((subcategory) => (
					<li className={styles.subcategoryItem}>
						<NavLink to={'/'} className={styles.subcategoryItemLink}>
							{subcategory.category}
						</NavLink>
					</li>
				))}
			</ul>
		</li>
	));

	return (
		<div className={styles.container}>
			<ul className={styles.categoriesList}>{categoriesElements}</ul>
		</div>
	);
};

export default CategoriesList;
