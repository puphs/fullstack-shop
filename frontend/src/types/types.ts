export type TCategory = {
	name: string;
	subcategories?: Array<TCategory>;
};

export type TPrices = {
	discountPrice: number | null;
	standardPrice: number;
};
export type TShopItem = {
	id: number;
	name: string;
	description: string;
	imgLink: string;
	prices: TPrices;
	sizes?: Array<string>;
};
