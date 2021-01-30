export type TCategory = {
	name: string;
	subcategoriesGroups?: Array<{
		groupName: string;
		subcategories?: Array<{
			name: string;
		}>;
	}>;
};

export type TPrices = {
	discountPrice: number | null;
	standardPrice: number;
};
export type TShopItem = {
	_id: string;
	name: string;
	description: string;
	imgLink: string;
	standardPrice: TPrices['standardPrice'];
	discountPrice: TPrices['discountPrice'];
	sizes: Array<string>;
};

export type TCartItem = {
	_id: string;
	shopItem: TShopItem;
	size: string;
};

export type TFormProps<FormValues> = {
	onSubmit: (values: FormValues) => void;
};
