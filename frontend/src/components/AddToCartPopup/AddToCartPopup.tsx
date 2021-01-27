import { useRef, useState } from 'react';
import { TShopItem } from '../../types/types';
import Button from '../Button/Button';
import Img from '../Img/Img';
import Prices from '../Prices/Prices';
import SizeSelection from '../SizeSelection/SizeSelection';
import styles from './AddToCartPopup.module.scss';

export type PopupResult = {
	size: string;
} | null;

type Props = {
	shopItem: TShopItem;
	onPopupResult: (result: PopupResult) => void;
};

const AddToCartPopup: React.FC<Props> = ({ shopItem, onPopupResult }) => {
	const [size, setSize] = useState<string | null>(null);
	const backgroundRef = useRef<HTMLDivElement>(null);

	const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === backgroundRef.current) {
			onPopupResult(null);
		}
	};

	const onSizeSelected = (size: string) => {
		console.log(size);
		setSize(size);
	};

	const onAddToCartBtnClick = () => {
		if (size) {
			onPopupResult({ size });
		}
	};

	return (
		<div className={styles.background} onClick={onBackgroundClick} ref={backgroundRef}>
			<div className={styles.popup}>
				<div className={styles.product}>
					<Img src={shopItem.imgLink} alt={'product'} fixedWidth={220} />

					<h2 className={styles.productName}>Rainbow Sneakers</h2>
				</div>
				<div className={styles.options}>
					<SizeSelection sizes={shopItem.sizes} onSizeSelected={onSizeSelected} />

					<div className={styles.priceAndAddToCartBtn}>
						<Prices standardPrice={shopItem.standardPrice} discountPrice={shopItem.discountPrice} />
						<div className={styles.addToCartBtn}>
							<Button fullWidth onClick={onAddToCartBtnClick}>
								{'Add to cart'}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddToCartPopup;
