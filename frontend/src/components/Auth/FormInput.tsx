import { FieldRenderProps } from 'react-final-form';
import styles from './FormInput.module.scss';
import cn from 'classnames';
import { FocusEvent, InputHTMLAttributes, useRef, useState } from 'react';

type Props = {
	fieldName: string;
	inputType?: string;
} & FieldRenderProps<string> &
	InputHTMLAttributes<HTMLInputElement>;

const FormInput: React.FC<Props> = ({ fieldName, input, meta, inputType }) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(true);

	const inputRef = useRef<HTMLInputElement>(null);

	if (inputRef.current?.value) {
		if (isCollapsed) requestAnimationFrame(() => setIsCollapsed(false));
	}

	const onInputFocus = (e: FocusEvent<HTMLInputElement>) => {
		input.onFocus(e);

		setIsFocused(true);
		setIsCollapsed(false);
	};
	const onInputBlur = (e: FocusEvent<HTMLInputElement>) => {
		input.onBlur(e);

		setIsFocused(false);
		if (!e.target.value) setIsCollapsed(true);
	};

	return (
		<div
			className={cn(
				styles.container,
				meta.error && meta.touched ? styles.container__error : null,
				!isCollapsed && styles.container__hasText,
				isFocused && styles.container__focused
			)}
		>
			<span className={styles.inputText}>
				{meta.error && meta.touched ? meta.error : fieldName}
			</span>
			<input
				className={styles.input}
				{...input}
				ref={inputRef}
				onFocus={onInputFocus}
				onBlur={onInputBlur}
				type={inputType}
			/>
		</div>
	);
};

export default FormInput;
