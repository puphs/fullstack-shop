export type Category = {
	name: string;
	subcategories?: Array<Category>;
};
