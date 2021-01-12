import { FieldRenderProps } from 'react-final-form';
import styles from './FormInput.module.scss';
import cn from 'classnames';
import { FocusEvent, useState } from 'react';

type Props = {
	fieldName: string;
} & FieldRenderProps<number>;

const FormInput: React.FC<Props> = ({ fieldName, input, meta }) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(true);

	const onInputFocus = () => {
		setIsFocused(true);
		setIsCollapsed(false);
	};
	const onInputBlur = (e: FocusEvent<HTMLInputElement>) => {
		setIsFocused(false);
		if (!e.target.value) setIsCollapsed(true);
	};

	return (
		<div
			className={cn(
				styles.container,
				meta.error && styles.container__error,
				!isCollapsed && styles.container__hasText
			)}
		>
			<span className={styles.inputText}>{fieldName}</span>
			<input className={styles.input} {...input} onFocus={onInputFocus} onBlur={onInputBlur} />
		</div>
	);
};

export default FormInput;
