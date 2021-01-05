import { Fragment } from 'react';
import styles from './SizeSelection.module.scss';

type Props = {};

const SizeSelection: React.FC<Props> = (props) => {
	const sizes: Array<string> = ['8', '9', '10', '11', '12'];

	const sizeElements = sizes.map((size, index) => (
		<label key={index}>
			<input className={styles.sizeRadio} type={'radio'} name={'sizeRadio'} hidden />
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
