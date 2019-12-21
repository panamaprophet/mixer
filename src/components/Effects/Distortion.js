import React from 'react';

import Fader from '/components/Fader';


const Distortion = ({
	onChange = () => {},
}) => {
	return (
		<div className="effect" data-name="effect-distortion">
			<div className="title">Distortion</div>

			<div className="param">
				<span className="param-title">Filter:</span>
				<label>High <input onChange={onChange('filterType')} name="distortion-filterType" type="radio" value="highpass" /></label>
				<label>Low <input onChange={onChange('filterType')} name="distortion-filterType" type="radio" value="lowpass" /></label>
				<label>Band <input onChange={onChange('filterType')} name="distortion-filterType" type="radio" value="bandpass" /></label>
			</div>

			<div className="param">
				<span className="param-title">Frequency:</span>
				<Fader onChange={onChange('frequency')} />
			</div>

			<div className="param">
				<span className="param-title">Strength:</span>
				<Fader onChange={onChange('strength')} />
			</div>
		</div>
	);
}

export default Distortion;