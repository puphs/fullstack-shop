import { CSSProperties, ImgHTMLAttributes } from 'react';

type Props = {
	fixedWidth?: number;
	fixedHeight?: number;
} & ImgHTMLAttributes<HTMLImageElement>;

const Img: React.FC<Props> = ({ fixedWidth, fixedHeight, ...imgAttrs }) => {
	const containerStyle: CSSProperties = {};
	const imgStyle: CSSProperties = {};

	if (fixedWidth) {
		containerStyle.width = fixedWidth + 'px';
		imgStyle.width = '100%';
		imgStyle.height = 'auto';
	}
	if (fixedHeight) {
		containerStyle.height = fixedHeight + 'px';
		imgStyle.height = '100%';
		imgStyle.width = 'auto';
	}
	return (
		<div style={containerStyle}>
			<img style={imgStyle} {...imgAttrs} />
		</div>
	);
};
export default Img;
