export const routes = {
	catalog: '/catalog',

	auth: '/auth',
	login: '/auth/login',
	register: '/auth/register',

	oops: '/oops',
	notLoggedIn: '/oops/not-logged-in',
	pageNotFound: '/oops/page-not-found',

	shopItem: '/item',

	shoppingCart: '/cart',

	account: '/account',
};

export const routeWithRedirectTo = (route: string, redirectTo: string = '/') =>
	`${route}?redirectTo=${redirectTo}`;
