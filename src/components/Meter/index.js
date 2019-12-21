import React, {useRef, useEffect} from 'react';

import {getAverage, createMeterGradient} from './helpers';


const Meter = ({
	analyser,
	width = 210,
	height = 20,
}) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const context = canvasRef.current.getContext('2d');
		const array = new Uint8Array(analyser.frequencyBinCount);

		const drawMeter = () => {
			analyser.getByteFrequencyData(array);

			const average = getAverage(array);

			context.clearRect(0, 0, width, height);
			context.fillStyle = createMeterGradient(context, {width, height});
			context.fillRect(0, 0, (width / 100) * average, height);
		}

		requestAnimationFrame(drawMeter);
	}, []);

	return (
		<div className="desk__control-meter">
			<canvas className="desk__control-meter-value" width={width} height={height} ref={canvasRef}></canvas>
		</div>
	);
}

export default Meter;