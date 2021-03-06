import { useEffect } from 'react';
import styles from './SizeSelection.module.scss';

type Props = {
	sizes: Array<string>;
	onSizeSelected: (size: string) => void;
};

const SizeSelection: React.FC<Props> = ({ sizes, onSizeSelected }) => {
	useEffect(() => {
		if (sizes.length) {
			onSizeSelected(sizes[0]);
		}
	}, [sizes]);

	const sizeElements = sizes.map((size, index) => (
		<label key={index}>
			<input
				className={styles.sizeRadio}
				type={'radio'}
				name={'sizeRadio'}
				defaultChecked={index === 0}
				hidden
				onClick={() => onSizeSelected(size)}
			/>
			<div className={styles.sizeItem}>
				<div className={styles.sizeValue}>{size}</div>
			</div>
		</label>
	));

	return (
		<div className={styles.sizeSelection}>
			<div className={styles.selectSizeText}>Select size:</div>
			<div className={styles.sizeElements}>{sizeElements}</div>
		</div>
	);
};

export default SizeSelection;
