import { ButtonHTMLAttributes, CSSProperties } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

type Props = {
	fullWidth?: boolean;
	styleType?: 'primary' | 'secondary';
	style?: CSSProperties;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({ fullWidth, styleType, style, children, ...buttonAttr }) => {
	return (
		<button
			className={cn(
				styleType === 'secondary' ? styles.btnSecondary : styles.btnPrimary,
				fullWidth && styles.fullWidth
			)}
			style={style}
			{...buttonAttr}
		>
			{children}
		</button>
	);
};

export default Button;
