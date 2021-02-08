import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import styles from './App.module.scss';
import AuthPage from './pages/AuthPage/AuthPage';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import OopsPage from './pages/OopsPage/OopsPage';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage';
import { appActions } from './redux/reducers/appReducer';
import store, { AppState } from './redux/store';
import { Toaster } from 'react-hot-toast';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import ShopItemPage from './pages/ShopItemPage/ShopItemPage';
import AccountPage from './pages/AccountPage/AccountPage';
import { routes } from './routes';
import { useMessageHandler } from './hooks/useMessageHandler';

const App = () => {
	const dispatch = useDispatch();
	const token = useSelector((state: AppState) => state.auth.token);
	const initialized = useSelector((state: AppState) => state.app.initialized);
	const location = useLocation();

	useMessageHandler();

	useEffect(() => {
		dispatch(appActions.initialize(token));
	}, [dispatch, token]);

	if (!initialized) return <></>;

	const transitionKey = location.pathname.match(routes.catalog)
		? routes.catalog
		: location.pathname;

	return (
		<div className={styles.container}>
			<Toaster />
			<Header />

			<main className={styles.main}>
				<SwitchTransition mode={`out-in`}>
					<CSSTransition
						key={transitionKey}
						timeout={250}
						classNames={{
							enter: styles.transitionEnter,
							enterActive: styles.transitionEnterActive,
							exit: styles.transitionExit,
							exitActive: styles.transitionExitActive,
						}}
					>
						<Switch location={location}>
							<Route path={routes.auth} render={() => <AuthPage />} />
							<Route path={routes.shoppingCart} render={() => <ShoppingCartPage />} />
							<Route path={routes.account} render={() => <AccountPage />} />
							<Route path={`${routes.oops}/:oopsReason?`} render={() => <OopsPage />} />
							<Route path={`${routes.shopItem}/:shopItemId?`} render={() => <ShopItemPage />} />
							<Route
								path={`${routes.catalog}/:category?/:subcategory?`}
								render={() => <MainPage />}
							/>
							<Redirect to={routes.catalog} />
						</Switch>
					</CSSTransition>
				</SwitchTransition>
			</main>
		</div>
	);
};

const AppWithProvider = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	);
};

export default AppWithProvider;
