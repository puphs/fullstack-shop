import styles from './CategoriesNav.module.scss';
import { Category } from '../../types/types';
import { MouseEvent, useRef, useState } from 'react';
import cn from 'classnames';
import CategoriesList from './CategoriesList/CategoriesList';

type Props = {
	categories: Array<Category>;
};

const CategoriesNav: React.FC<Props> = ({ categories }) => {
	const [selectedCategoryIndex, selectCategory] = useState<number | null>(null);
	const selectedCategoryRef = useRef<HTMLButtonElement>(null);

	const onCategoryClick = (e: MouseEvent, categoryIndex: number | null) => {
		if (categoryIndex === selectedCategoryIndex) categoryIndex = null;

		// show subcategories of clicked category
		const currentSubcategories = e.currentTarget.nextElementSibling as HTMLDivElement | null;
		currentSubcategories?.setAttribute('style', `height: ${currentSubcategories.scrollHeight}px`);

		// hide previous clicked subcategories
		const previousSubcategories = selectedCategoryRef.current
			?.nextElementSibling as HTMLDivElement | null;
		previousSubcategories?.removeAttribute('style');

		selectCategory(categoryIndex);
	};

	const categoryElements = categories.map((category, index) => (
		<li className={styles.categoryItem} key={index}>
			<button
				className={cn(
					styles.categoryButton,
					selectedCategoryIndex === index && styles.categoryButton__clicked
				)}
				ref={selectedCategoryIndex === index ? selectedCategoryRef : null}
				onClick={(e: MouseEvent) => onCategoryClick(e, index)}
			>
				{category.name}
			</button>
			<div className={styles.categoriesList}>
				<CategoriesList categoriesList={category.subcategories || []} />
			</div>
		</li>
	));

	return (
		<div className={styles.categories}>
			<div className={styles.categoriesNav}>
				<div className={styles.categoriesHeader}>Category:</div>
				<ul className={styles.categoriesNavList}>{categoryElements}</ul>
			</div>
		</div>
	);
};

export default CategoriesNav;
