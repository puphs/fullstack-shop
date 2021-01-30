import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SubcategoriesGroups from './SubcategoriesGroups/SubcategoriesGroups';
import styles from './CategoriesNav.module.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import SubcategoriesGroup from './SubcategoriesGroups/SubcategoriesGroups';

const CategoriesNav = () => {
	const categories = useSelector((state: AppState) => state.shop.categories);

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

	const isPathContains = (path: string, part: string) => {
		return path.split('/').some((pathPart) => pathPart === part);
	};

	const addCategoryRef = (categoryEl: HTMLAnchorElement) => {
		if (!categoriesRef.current.includes(categoryEl) && categoryEl) {
			categoriesRef.current.push(categoryEl);
		}
	};

	const categoriesElements =
		categories?.map((category, index) => {
			return (
				<div className={styles.categoryItem} key={index}>
					<NavLink
						to={`/${category.name}`}
						className={cn(
							styles.categoryBtn,
							isPathContains(location.pathname, category.name) && styles.categoryBtn__clicked
						)}
						ref={
							isPathContains(location.pathname, category.name)
								? selectedCategoryRef
								: addCategoryRef
						}
					>
						{category.name}
					</NavLink>
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
