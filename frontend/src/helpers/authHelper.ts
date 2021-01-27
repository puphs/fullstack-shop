type AuthData = { token: string; userId: string };

const AUTH_DATA = 'AUTH_DATA';

// returns true if data saved to local storage, false if not
export const saveAuthData = (authData: AuthData): boolean => {
	try {
		localStorage.setItem(AUTH_DATA, JSON.stringify(authData));
		return true;
	} catch (err) {
		return false;
	}
};

export const getAuthData = (): AuthData => {
	const dataString = localStorage.getItem(AUTH_DATA);
	console.log('You are loggined in: ', dataString ? true : false);
	return dataString ? JSON.parse(dataString) : { token: null, userId: null };
};

export const removeAuthData = () => {
	localStorage.removeItem(AUTH_DATA);
};
