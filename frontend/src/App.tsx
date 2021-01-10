import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import styles from './App.module.scss';
import AddToCartPopup from './components/AddToCartPopup/AddToCartPopup';
import Header from './components/Header/Header';
import ShopItem from './components/ShopItem/ShopItem';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Sidebar from './components/Sidebar/Sidebar';
import store from './redux/store';
import { TShopItem } from './types/types';

const App = () => {
	const shopItem: TShopItem = {
		id: 0,
		name: 'name',
		description: 'descr',
		imgLink:
			'http://ae01.alicdn.com/kf/HTB1gZ22RXXXXXa_aVXXq6xXFXXXW.jpg?size=70946&height=832&width=790&hash=5fb45556337dbbc6af7c7229e424e83f',
		prices: {
			discountPrice: 330.2,
			standardPrice: 390,
		},
	};

	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className={styles.container}>
					<Header />
					{/* <ShopItem shopItem={shopItem} /> */}

					{/* <AddToCartPopup /> */}
					<main className={styles.main}>
						{/* <div className={styles.sidebar}>
							<Sidebar />
						</div> */}
						{/* <div className={styles.content}> */}
						{/* <div className={styles.shopItems}>
								<ShopItem shopItem={shopItem} />
								<ShopItem shopItem={shopItem} />
								<ShopItem shopItem={shopItem} />
							</div> */}
						{/* </div> */}
						<ShoppingCart />
					</main>
					{/* <SizeSelection /> */}
					{/* <AddToCartPopup /> */}
					{/* <Button text="hello" /> */}
				</div>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
