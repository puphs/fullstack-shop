import { getAuthData } from '../../helpers/authHelper';
import { InferActionsTypes } from './reducerUtils';

const authData = getAuthData();

enum MessageType {
	ERROR = 0,
	OK = 1,
}

const initialState = {
	token: authData?.token as string | null,

	message: null as string | null,
	messageType: MessageType.OK as MessageType,

	redirectTo: null as string | null,
};

type State = typeof initialState;

export type Action = InferActionsTypes<typeof actions>;

const authReducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case LOGIN_SUCESS:
		case REGISTER_SUCCESS:
			return { ...state, token: action.token };
		case LOGOUT_SUCCESS:
			return { ...state, token: null };
		case LOGIN_FAILURE:
		case REGISTER_FAILURE:
		case HANDLE_MESSAGE:
			return { ...state, message: action.message };
		case SET_REDIRECT_TO:
			return { ...state, redirectTo: action.redirectTo };
		default:
			return state;
	}
};

export const HANDLE_MESSAGE = 'auth/HANDLE_MESSAGE';

export const LOGIN = 'auth/LOGIN';
export const LOGIN_SUCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const LOGOUT = 'auth/LOGOUT';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

export const REGISTER = 'auth/REGISTER';
export const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

export const SET_REDIRECT_TO = 'auth/SET_REDIRECT_TO';

export type LoginAction = ReturnType<typeof actions.login>;
export type RegisterAction = ReturnType<typeof actions.register>;

export const actions = {
	handleMessage: () => ({ type: HANDLE_MESSAGE, message: null } as const),
	login: (email: string, password: string) => ({ type: LOGIN, email, password } as const),
	loginSuccess: (token: string, message?: string) =>
		({ type: LOGIN_SUCESS, token, message, messageType: MessageType.OK } as const),
	loginFailure: (message: string) =>
		({ type: LOGIN_FAILURE, message, messageType: MessageType.ERROR } as const),

	logout: () => ({ type: LOGOUT } as const),
	logoutSuccess: () => ({ type: LOGOUT_SUCCESS } as const),

	register: (email: string, name: string, password: string) =>
		({ type: REGISTER, email, name, password } as const),
	registerSuccess: (token: string) => ({ type: REGISTER_SUCCESS, token } as const),
	registerFailure: (message: string) =>
		({ type: REGISTER_FAILURE, message, messageType: MessageType.ERROR } as const),

	setRedirectTo: (redirectTo: string) => ({ type: SET_REDIRECT_TO, redirectTo } as const),
};
actions.login('asdf', 'asdf');

export default authReducer;
