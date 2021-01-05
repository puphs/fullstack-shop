import React from 'react';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import ShopItem from './components/ShopItem/ShopItem';

const App = () => {
	return (
		<div className={styles.container}>
			<Header />
			<ShopItem />
		</div>
	);
};

export default App;
