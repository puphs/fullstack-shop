import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppState } from '../../redux/store';
import styles from './CategoriesNav.module.scss';
import SubcategoriesGroups from './SubcategoriesGroups/SubcategoriesGroups';

const isPathContains = (path: string, part: string) => {
	return path.split('/').some((pathPart) => pathPart === part);
};

const CategoriesNav = () => {
	const categories = useSelector((state: AppState) => state.shop.categories);
	const defaultCategoryName = useSelector((state: AppState) => state.shop.defaultCategoryName);

	const categoriesRef = useRef<Array<HTMLAnchorElement>>([]);
	const selectedCategoryRef = useRef<HTMLAnchorElement>(null);

	const location = useLocation();

	useEffect(() => {
		if (selectedCategoryRef.current) {
			showSubcategories(selectedCategoryRef.current);
		}
	}, [location.pathname]);

	const showSubcategories = (categoryEl: Element) => {
		// hide all subcategories
		categoriesRef.current.forEach((categoryEl) => {
			categoryEl.nextElementSibling?.removeAttribute('style');
		});

		// show subcategories of clicked category
		const currentSubcategories = categoryEl.nextElementSibling;
		currentSubcategories?.setAttribute('style', `height: ${currentSubcategories.scrollHeight}px`);
	};

	const addCategoryRef = (categoryEl: HTMLAnchorElement) => {
		if (!categoriesRef.current.includes(categoryEl) && categoryEl) {
			categoriesRef.current.push(categoryEl);
		}
	};

	const categoriesElements =
		categories?.map((category, index) => {
			const isPathContainsCategory = isPathContains(location.pathname, category.name);
			const isDefaultCategory = category.name === defaultCategoryName && location.pathname === '/';

			const to = `/${category.name === defaultCategoryName ? '' : category.name}`;
			const clickedClass =
				(isPathContainsCategory || isDefaultCategory) && styles.categoryBtn__clicked;
			const ref =
				isPathContainsCategory || isDefaultCategory ? selectedCategoryRef : addCategoryRef;

			return (
				<div className={styles.categoryItem} key={index}>
					<Link to={to} className={cn(styles.categoryBtn, clickedClass)} ref={ref}>
						{category.name}
					</Link>
					{category.subcategoriesGroups?.length ? (
						<div className={styles.subcategoriesGroups}>
							<SubcategoriesGroups
								subcategoriesGroups={category.subcategoriesGroups}
								categoryName={category.name}
							/>
						</div>
					) : null}
				</div>
			);
		}) || [];

	return (
		<div className={styles.categories}>
			<div className={styles.categoriesNav}>
				<div className={styles.categoriesHeader}>Category:</div>
				<ul className={styles.categoriesNavList}>{categoriesElements}</ul>
			</div>
		</div>
	);
};

export default CategoriesNav;
