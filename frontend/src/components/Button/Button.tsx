import { ButtonHTMLAttributes, CSSProperties } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

type Props = {
	fullWidth?: boolean;
	styleType?: 'primary' | 'secondary' | 'special';
	style?: CSSProperties;
	loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({
	fullWidth,
	styleType,
	style,
	loading,
	children,
	...buttonAttr
}) => {
	return (
		<button
			className={cn(
				styleType === 'primary' || !styleType ? styles.btnPrimary : null,
				styleType === 'secondary' ? styles.btnSecondary : null,
				styleType === 'special' ? styles.btnSpecial : null,
				fullWidth && styles.fullWidth,
				loading && styles.loading
			)}
			disabled={loading}
			style={style}
			{...buttonAttr}
		>
			{children}
		</button>
	);
};

export default Button;
