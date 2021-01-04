import React, { MouseEvent, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './SearchBar.module.scss';

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

	const onSearchBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		searchInputRef.current?.focus();
	};

	const onClearBtnClick = () => {};

	return (
		<>
			<div className={cn(styles.search, !searchMode && styles.search__collapsed)}>
				<input
					className={styles.searchInput}
					ref={searchInputRef}
					onFocus={onSearchInputFocus}
					onBlur={onSearchInputBlur}
				/>
				<button className={styles.clearBtn} onClick={onClearBtnClick}></button>
				<button className={styles.searchBtn} onClick={onSearchBtnClick}></button>
			</div>
		</>
	);
};

export default SearchBar;
