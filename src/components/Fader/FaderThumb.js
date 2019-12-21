import React from 'react';


const FaderThumb = ({
	position = 0, 
	isVertical = false,
	onMoveStart = () => {},
	onMove = () => {},
	onMoveEnd = () => {},
}) => {
	const styleProperty = isVertical ? 'bottom' : 'left';
	const stylePropertyValue = position + 'px';

	return (
		<div
			className="fader-thumb"
			style={{[styleProperty]: stylePropertyValue}}
			onMouseMove={onMove}
			onMouseUp={onMoveEnd}
			onMouseDown={onMoveStart}
		>
		</div>
	);
};

export default FaderThumb;