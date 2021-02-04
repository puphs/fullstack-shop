import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './SearchBar.module.scss';
import headerStyles from '../Header/Header.module.scss';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';
import { routes } from '../../routes';

type Props = {};

const debounce = (callback: (...args: any) => void, delay: number) => {
	let timeout = 0;
	return (...args: any) => {
		clearTimeout(timeout);
		timeout = window.setTimeout(() => callback(...args), delay);
	};
};

const SearchBar: React.FC<Props> = () => {
	const [searchValue, setSearchValue] = useState('');
	const [searchMode, setSearchMode] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const searchBarRef = useRef<HTMLDivElement>(null);

	const history = useHistory();
	const inCatalog = history.location.pathname.match(routes.catalog) !== null;

	useEffect(() => {
		if (!inCatalog && searchMode) {
			setSearchMode(false);
		}
	}, [inCatalog]);

	useEffect(() => {
		updateUrlSearchDebounced(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const handleClickOutsideSearchBar = (e: MouseEvent) => {
			if (searchBarRef.current && !searchBarRef.current.contains(e.target as HTMLDivElement)) {
				if (searchValue === '') {
					setSearchMode(false);
				}
			}
		};

		document.addEventListener('mousedown', handleClickOutsideSearchBar);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideSearchBar);
		};
	});

	const updateUrlSearchDebounced = useCallback(
		debounce((search: string) => {
			history.push({ search: qs.stringify({ search }, { skipEmptyString: true }) });
		}, 500),
		[]
	);
	const updateUrlSearch = useCallback((search: string) => {
		history.push({ search: qs.stringify({ search }, { skipEmptyString: true }) });
	}, []);

	const onSearchBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		searchInputRef.current?.focus();
		if (!inCatalog) {
			history.push(routes.catalog);
		}
	};

	const onInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			updateUrlSearch(e.currentTarget.value);
		}
	};

	const onClearBtnClick = () => {
		setSearchValue('');
		if (searchValue === '') {
			setSearchMode(false);
		}
	};

	const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};
	const onSearchInputFocus = () => {
		setSearchMode(true);
	};

	return (
		<>
			<div
				className={cn(styles.searchBar, !searchMode && styles.searchBar__collapsed)}
				ref={searchBarRef}
			>
				<input
					className={styles.searchInput}
					ref={searchInputRef}
					onFocus={onSearchInputFocus}
					onKeyPress={onInputKeyPress}
					onChange={onSearchInputChange}
					value={searchValue}
				/>
				<button className={styles.clearBtn} onClick={onClearBtnClick}>
					<div className={cn(styles.clearImg, headerStyles.navItemImg)}></div>
				</button>
				<button className={styles.searchBtn} onClick={onSearchBtnClick}>
					<div className={cn(styles.searchImg, headerStyles.navItemImg)}></div>
				</button>
			</div>
		</>
	);
};

export default SearchBar;
