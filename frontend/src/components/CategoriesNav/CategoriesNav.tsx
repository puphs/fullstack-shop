import { NavLink } from 'react-router-dom';
import styles from './CategoriesNav.module.scss';

type Props = {};

const CategoriesNav: React.FC<Props> = (props) => {
	type Category = {
		category: string;
		subcategories?: Array<Category>;
	};
	const categories: Array<Category> = [
		{
			category: 'men',
			subcategories: [
				{
					category: 'Shoes',
					subcategories: [
						{ category: 'Sneakers' },
						{ category: 'Boots' },
						{ category: 'Slippers' },
						{ category: 'Sandals' },
					],
				},
				{
					category: 'Clothing',
					subcategories: [
						{ category: 'Shirts' },
						{ category: 'Pants' },
						{ category: 'Hoodies' },
						{ category: 'T-shirts' },
						{ category: 'Swimwear' },
					],
				},
			],
		},
		{
			category: 'women',
			subcategories: [
				{
					category: 'shoes',
					subcategories: [
						{ category: 'sneakers' },
						{ category: 'boots' },
						{ category: 'slippers' },
						{ category: 'sandals' },
						{ category: 'Low shoes' },
					],
				},
			],
		},
		{
			category: 'boys',
			subcategories: [
				{
					category: 'shoes',
					subcategories: [
						{ category: 'sneakers' },
						{ category: 'boots' },
						{ category: 'slippers' },
						{ category: 'sandals' },
						{ category: 'Low shoes' },
					],
				},
			],
		},
		{
			category: 'girls',
			subcategories: [
				{
					category: 'shoes',
					subcategories: [
						{ category: 'sneakers' },
						{ category: 'boots' },
						{ category: 'slippers' },
						{ category: 'sandals' },
						{ category: 'Low shoes' },
					],
				},
			],
		},
	];

	const categoryElements = categories.map((item, index) => (
		<li className={styles.categoryItem}>
			<NavLink
				className={styles.categoryItemLink}
				activeClassName={styles.categoryItemLink__active}
				to={`/category/${item.category}`}
			>
				{item.category}
			</NavLink>
		</li>
	));

	return (
		<>
			<div className={styles.categoriesHeader}>Category:</div>
			<ul className={styles.categoriesList}>{categoryElements}</ul>
		</>
	);
};

export default CategoriesNav;
