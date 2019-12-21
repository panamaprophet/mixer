import React from 'react';

import Fader from '/components/Fader';


const Delay = ({
	time = 0,
	feedback = 0,
	frequency = 0,
	onTimeChange = () => {},
	onFeedbackChange = () => {},
	onFrequencyChange = () => {},
}) => {
	return (
		<div className="effect">
			<div className="title">Delay</div>

			<div className="param">
				<span className="param__title">Time:</span>
				<Fader onChange={onTimeChange} position={time} />
			</div>

			<div className="param">
				<span className="param__title">Feedback:</span>
				<Fader onChange={onFeedbackChange} position={feedback} />
			</div>

			<div className="param">
				<span className="param__title">Cutoff:</span>
				<Fader onChange={onFrequencyChange} position={frequency} />
			</div>
		</div>
	);
}

export default Delay;