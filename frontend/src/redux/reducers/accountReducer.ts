import { TAccountType } from '../../types/types';
import { AppState } from '../store';
import { InferActionsTypes } from './reducerUtils';

const initialState = {
	account: null as TAccountType | null,
};

type State = typeof initialState;

type Action = InferActionsTypes<typeof actions>;

const accountReducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case SET_ACCOUNT:
			return { ...state, account: action.account };
		default:
			return state;
	}
};
export default accountReducer;

export const SET_ACCOUNT = 'account/SET_ACCOUNT';
export const LOAD_ACCOUNT = 'account/LOAD_ACCOUNT';
export const LOAD_ACCOUNT_FAILURE = 'account/LOAD_ACCOUNT_FAILURE';

export const CHANGE_NAME = 'account/CHANGE_NAME';
export const CHANGE_NAME_FAILURE = 'account/CHANGE_NAME_FAILURE';

export const CHANGE_PASSWORD = 'account/CHANGE_PASSWORD';
export const CHANGE_PASSWORD_FAILURE = 'account/CHANGE_PASSWORD_FAILURE';

export type LoadAccountAction = ReturnType<typeof actions.loadAccount>;
export type ChangeNameAction = ReturnType<typeof actions.changeName>;
export type ChangePasswordAction = ReturnType<typeof actions.changePassword>;

export const actions = {
	setAccount: (account: TAccountType) => ({ type: SET_ACCOUNT, account } as const),
	loadAccount: (token: string) => ({ type: LOAD_ACCOUNT, token } as const),
	loadAccountFailure: (message: string) => ({ type: LOAD_ACCOUNT_FAILURE, message } as const),

	changeName: (token: string, name: string) => ({ type: CHANGE_NAME, token, name } as const),
	changePassword: (token: string, currentPassword: string, newPassword: string) =>
		({ type: CHANGE_PASSWORD, token, currentPassword, newPassword } as const),
};
