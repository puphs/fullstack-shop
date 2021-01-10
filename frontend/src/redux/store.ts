import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import cartReducer from './reducers/cartReducer';
import sidebarReducer from './reducers/sidebarReducer';

const reducers = combineReducers({
	sidebar: sidebarReducer,
	cart: cartReducer,
});
export type AppState = ReturnType<typeof reducers>;

const store = createStore(reducers, devToolsEnhancer({}));

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsTypes<
	T extends { [key: string]: (...args: Array<any>) => any }
> = ReturnType<PropertiesTypes<T>>;

export default store;
