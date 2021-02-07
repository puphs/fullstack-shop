import { Message } from '../../types/types';
import { InferActionsTypes } from './reducerUtils';

const initialState = {
	initialized: false as boolean,
	message: null as Message | null,
};

type State = typeof initialState;

export type Action = InferActionsTypes<typeof appActions>;

export const appReducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case INITIALIZE_SUCCESS:
			return { ...state, initialized: true };
		case INITIALIZE_FAILURE:
			return { ...state };
		case SET_MESSAGE:
			return { ...state, message: action.message };
		case HANDLE_MESSAGE:
			return { ...state, message: null };

		default:
			return state;
	}
};

export const INITIALIZE = 'app/INITIALIZE';
export const HANDLE_MESSAGE = 'app/HANDLE_MESSAGE';
export const INITIALIZE_SUCCESS = 'app/INITIALIZE_SUCCESS';
export const INITIALIZE_FAILURE = 'app/INITIALIZE_FAILURE';

export const SET_MESSAGE = 'app/SET_MESSAGE';

export type InitializeAction = ReturnType<typeof appActions.initialize>;

export const appActions = {
	initialize: (token: string | null) => ({ type: INITIALIZE, token } as const),
	initializeSuccess: () => ({ type: INITIALIZE_SUCCESS } as const),
	initializeFailure: (errorMessage: string) =>
		({ type: INITIALIZE_FAILURE, errorMessage } as const),

	setMessage: (message: Message) => ({ type: SET_MESSAGE, message } as const),
	handleMessage: () => ({ type: HANDLE_MESSAGE } as const),
};
