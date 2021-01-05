import { CSSProperties } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

type Props = {
	text: string;
	fullWidth?: boolean;
	type?: 'primary' | 'secondary';
	style?: CSSProperties;
};

const Button: React.FC<Props> = (props) => {
	const type = props.type ?? 'primary';

	return (
		<button
			className={cn(
				type === 'primary' ? styles.btnPrimary : styles.btnSecondary,
				props.fullWidth && styles.fullWidth
			)}
			style={props.style}
		>
			{props.text}
		</button>
	);
};

export default Button;
