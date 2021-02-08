import { TAccountType } from '../../types/types';
import { InferActionsTypes } from './reducerUtils';

const initialState = {
	account: null as TAccountType | null,
};

type State = typeof initialState;

type Action = InferActionsTypes<typeof accountActions>;

export const accountReducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case SET_ACCOUNT:
			return { ...state, account: action.account };
		default:
			return state;
	}
};

export const SET_ACCOUNT = 'account/SET_ACCOUNT';
export const LOAD_ACCOUNT = 'account/LOAD_ACCOUNT';
export const LOAD_ACCOUNT_FAILURE = 'account/LOAD_ACCOUNT_FAILURE';

export const CHANGE_NAME = 'account/CHANGE_NAME';
export const CHANGE_NAME_FAILURE = 'account/CHANGE_NAME_FAILURE';

export const CHANGE_PASSWORD = 'account/CHANGE_PASSWORD';
export const CHANGE_PASSWORD_FAILURE = 'account/CHANGE_PASSWORD_FAILURE';

export type LoadAccountAction = ReturnType<typeof accountActions.loadAccount>;
export type ChangeNameAction = ReturnType<typeof accountActions.changeName>;
export type ChangePasswordAction = ReturnType<typeof accountActions.changePassword>;

export const accountActions = {
	setAccount: (account: TAccountType) => ({ type: SET_ACCOUNT, account } as const),
	loadAccount: (token: string) => ({ type: LOAD_ACCOUNT, token } as const),
	loadAccountFailure: (message: string) => ({ type: LOAD_ACCOUNT_FAILURE, message } as const),

	changeName: (token: string, name: string) => ({ type: CHANGE_NAME, token, name } as const),
	changeNameFailure: (message: string) => ({ type: CHANGE_NAME_FAILURE, message } as const),

	changePassword: (token: string, currentPassword: string, newPassword: string) =>
		({ type: CHANGE_PASSWORD, token, currentPassword, newPassword } as const),
	changePasswordFailure: (message: string) => ({ type: CHANGE_PASSWORD_FAILURE, message } as const),
};
