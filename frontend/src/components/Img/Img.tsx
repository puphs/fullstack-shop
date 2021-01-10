import { CSSProperties } from 'react';

type Props = {
	src: string;
	alt: string;
	fixedWidth?: number;
	fixedHeight?: number;
};

const Img: React.FC<Props> = ({ src, alt, fixedWidth, fixedHeight }) => {
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
			<img src={src} alt={alt} style={imgStyle} />
		</div>
	);
};
export default Img;
