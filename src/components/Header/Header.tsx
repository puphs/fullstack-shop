import React, { Fragment, MouseEvent, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './Header.module.scss';
import SearchBar from '../SearchBar/SearchBar';

type Props = {};

const Header: React.FC<Props> = (props) => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>REACT SHOP</div>
			<div className={styles.headerNav}>
				<div className={cn(styles.search, styles.navItem)}>
					<SearchBar />
				</div>
				<div className={cn(styles.cart, styles.navItem)}>
					<div className={styles.cartItemsCount}>2</div>
					<button className={styles.cartBtn}></button>
				</div>

				<div className={cn(styles.account, styles.navItem)}>
					<span className={styles.accountName}>James</span>
					<button className={styles.accountBtn}></button>
				</div>
			</div>
		</header>
	);
};

export default Header;
