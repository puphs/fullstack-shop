export type TCategory = {
	name: string;
	subcategories?: Array<TCategory>;
};

export type TPrices = {
	discountPrice: number | null;
	standardPrice: number;
};
export type TShopItem = {
	name: string;
	description: string;
	imgLink: string;
	standardPrice: TPrices['standardPrice'];
	discountPrice: TPrices['discountPrice'];
	sizes: Array<string>;
};

export type TCartItem = {
	shopItem: TShopItem;
	size: string;
};

export type TFormProps<FormValues> = {
	onSubmit: (values: FormValues) => void;
};
