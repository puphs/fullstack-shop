import { InferActionsTypes } from './reducerUtils';

const initialState = {
	initialized: false as boolean,
};

type State = typeof initialState;

export type Action = InferActionsTypes<typeof actions>;

const appReducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case INITIALIZE_SUCCESS:
			return { ...state, initialized: true };
		case INITIALIZE_FAILURE:
			return { ...state };
		default:
			return state;
	}
};

export const INITIALIZE = 'app/INITIALIZE';
export const INITIALIZE_SUCCESS = 'app/INITIALIZE_SUCCESS';
export const INITIALIZE_FAILURE = 'app/INITIALIZE_FAILURE';

export type InitializeAction = ReturnType<typeof actions.initialize>;

export const actions = {
	initialize: (token: string | null) => ({ type: INITIALIZE, token } as const),
	initializeSuccess: () => ({ type: INITIALIZE_SUCCESS } as const),
	initializeFailure: (errorMessage: string) =>
		({ type: INITIALIZE_FAILURE, errorMessage } as const),
};

export default appReducer;
