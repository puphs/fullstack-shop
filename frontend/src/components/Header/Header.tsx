import React, { Fragment, MouseEvent, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './Header.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';

type Props = {};

const Header: React.FC<Props> = (props) => {
	const cartItems = useSelector((state: AppState) => state.cart.cartItems);

	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<Link className={styles.logo} to="/">
					REACT SHOP
				</Link>
				<div className={styles.headerNav}>
					<div className={styles.search}>
						<SearchBar />
					</div>
					<NavLink
						className={cn(styles.cart, styles.navItem)}
						activeClassName={styles.navItem__active}
						to={'/cart'}
					>
						{cartItems && cartItems.length !== 0 && (
							<div className={styles.cartItemsCount}>{cartItems.length}</div>
						)}

						<div className={cn(styles.cartImg, styles.navItemImg)}></div>
					</NavLink>

					<NavLink
						to={'/account'}
						className={cn(styles.account, styles.navItem)}
						activeClassName={styles.navItem__active}
					>
						<span className={styles.accountName}></span>
						<div className={cn(styles.accountImg, styles.navItemImg)}></div>
					</NavLink>
				</div>
			</div>
			<div className={styles.line}></div>
		</header>
	);
};

export default Header;
