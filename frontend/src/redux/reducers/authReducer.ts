import { getAuthData } from '../../helpers/authHelper';
import { InferActionsTypes } from './reducerUtils';

const authData = getAuthData();

const initialState = {
	userId: authData?.userId as string | null,
	token: authData?.token as string | null,
};

type State = typeof initialState;

export type Action = InferActionsTypes<typeof actions>;

const authReducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case LOGIN_SUCESS:
		case REGISTER_SUCCESS:
			return { ...state, token: action.token, userId: action.userId };
		case LOGOUT_SUCCESS:
			return { ...state, token: null, userId: null };
		case LOGIN_FAILURE:
			return state;
		case REGISTER_FAILURE:
			return state;
		default:
			return state;
	}
};

export const LOGIN = 'auth/LOGIN';
export const LOGIN_SUCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const LOGOUT = 'auth/LOGOUT';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

export const REGISTER = 'auth/REGISTER';
export const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

export type LoginAction = ReturnType<typeof actions.login>;
export type RegisterAction = ReturnType<typeof actions.register>;

export const actions = {
	login: (email: string, password: string) => ({ type: LOGIN, email, password } as const),
	loginSuccess: (token: string, userId: string) => ({ type: LOGIN_SUCESS, token, userId } as const),
	loginFailure: (errorMessage: string) => ({ type: LOGIN_FAILURE, errorMessage } as const),

	logoutSuccess: () => ({ type: LOGOUT_SUCCESS } as const),

	register: (email: string, name: string, password: string) =>
		({ type: REGISTER, email, name, password } as const),
	registerSuccess: (token: string, userId: string) =>
		({ type: REGISTER_SUCCESS, token, userId } as const),
	registerFailure: (errorMessage: string) => ({ type: REGISTER_FAILURE, errorMessage } as const),
};
actions.login('asdf', 'asdf');

export default authReducer;
