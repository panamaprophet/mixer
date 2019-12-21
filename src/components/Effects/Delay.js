import React from 'react';

import Fader from '/components/Fader';


const Delay = ({
	onChange = () => {},
}) => {
	return (
		<div className="effect">
			<div className="title">Delay</div>

			<div className="param">
				<span className="param__title">Time:</span>
				<Fader onChange={onChange('time')} />
			</div>

			<div className="param">
				<span className="param__title">Feedback:</span>
				<Fader onChange={onChange('feedback')} />
			</div>

			<div className="param">
				<span className="param__title">Cutoff:</span>
				<Fader onChange={onChange('frequency')} max="4000" step="10" />
			</div>
		</div>
	);
}

export default Delay;