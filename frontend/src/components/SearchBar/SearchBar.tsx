import React, { MouseEvent, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './SearchBar.module.scss';
import headerStyles from '../Header/Header.module.scss';

type Props = {};

const SearchBar: React.FC<Props> = (props) => {
	const [searchMode, setSearchMode] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);

	const onSearchInputFocus = () => {
		setSearchMode(true);
	};

	const onSearchInputBlur = () => {
		// setSearchMode(false);
	};

	const onSearchBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		searchInputRef.current?.focus();
	};

	const onClearBtnClick = () => {};

	return (
		<>
			<div className={cn(styles.searchBar, !searchMode && styles.searchBar__collapsed)}>
				<input
					className={styles.searchInput}
					ref={searchInputRef}
					onFocus={onSearchInputFocus}
					onBlur={onSearchInputBlur}
				/>
				<button className={styles.clearBtn} onClick={onClearBtnClick}>
					<div className={cn(styles.clearImg, headerStyles.navItemImg)}></div>
				</button>
				<button className={styles.searchBtn} onClick={onSearchBtnClick}>
					<div className={cn(styles.searchImg, headerStyles.navItemImg)}></div>
				</button>

				{/* </div> */}
			</div>
		</>
	);
};

export default SearchBar;
