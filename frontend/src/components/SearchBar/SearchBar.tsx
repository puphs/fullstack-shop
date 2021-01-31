import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './SearchBar.module.scss';
import headerStyles from '../Header/Header.module.scss';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';

type Props = {};

const debounce = (callback: (...args: any) => void, delay: number) => {
	let timeout = 0;
	return (...args: any) => {
		clearTimeout(timeout);
		timeout = window.setTimeout(() => callback(...args), delay);
		console.log(timeout);
	};
};

const SearchBar: React.FC<Props> = (props) => {
	const [searchValue, setSearchValue] = useState('');
	const [searchMode, setSearchMode] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const searchBarRef = useRef<HTMLDivElement>(null);

	const history = useHistory();

	useEffect(() => {
		updateUrlSearch(searchValue);
	}, [searchValue]);

	const updateUrlSearch = useCallback(
		debounce((search: string) => {
			history.push({ search: qs.stringify({ search }, { skipEmptyString: true }) });
		}, 500),
		[]
	);

	const onSearchBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		searchInputRef.current?.focus();
	};

	const onClearBtnClick = () => {
		setSearchValue('');
	};

	const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		// updateUrlSearch(e.target.value);
		// console.log(e.target.value, e.currentTarget.value);
	};
	const onSearchInputFocus = () => {
		setSearchMode(true);
	};
	const onSearchBarBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (!searchValue) setSearchMode(false);
	};

	return (
		<>
			<div
				className={cn(styles.searchBar, !searchMode && styles.searchBar__collapsed)}
				onBlur={onSearchBarBlur}
				ref={searchBarRef}
			>
				<input
					className={styles.searchInput}
					ref={searchInputRef}
					onFocus={onSearchInputFocus}
					// onBlur={onSearchBarBlur}
					onChange={onSearchInputChange}
					value={searchValue}
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
