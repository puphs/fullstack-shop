import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from './reducers/cartReducer';
import sidebarReducer from './reducers/sidebarReducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import authReducer from './reducers/authReducer';
import shopReducer from './reducers/shopReducer';
import appReducer from './reducers/appReducer';

const reducers = combineReducers({
	sidebar: sidebarReducer,
	cart: cartReducer,
	auth: authReducer,
	shop: shopReducer,
	app: appReducer,
});
export type AppState = ReturnType<typeof reducers>;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
