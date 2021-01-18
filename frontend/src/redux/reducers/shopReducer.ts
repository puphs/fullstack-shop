import { TShopItem } from '../../types/types';
import { InferActionsTypes } from './reducerUtils';

const initialState = {
	shopItems: [] as Array<TShopItem>,
};

type State = typeof initialState;
type Action = InferActionsTypes<typeof actions>;

const shopReducer = (state: State, action: Action): State => {
	switch (action.type) {
		default:
			return state;
	}
};

export const actions = {};

export default shopReducer;
