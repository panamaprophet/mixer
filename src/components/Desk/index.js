import React from 'react';

import Delay from '/components/Effects/Delay';
import Distortion from '/components/Effects/Distortion';
import Meter from '/components/Meter';
import Track from '/components/Track';

import {
	onTrackVolumeChange,
	onReverbMixChange,
	onDelayMixChange,
	onDistortionMixChange,
} from './actions';


const Desk = ({
	tracks,
	fx: effects,
	analyser,
	onChange = () => {},
}) => {
	const {delay, distortion} = effects;

	return (
		<div className="desk">
			<div className="desk__faders">
				{tracks && tracks.map(track => (
					<Track
						title={track.title}

						toggleMute={() => track.toggleMute()}
						toggleBypass={() => track.toggleFX()}

						onTrackVolumeChange={onTrackVolumeChange(track)}
						onReverbMixChange={onReverbMixChange(track)}
						onDelayMixChange={onDelayMixChange(track)}
						onDistortionMixChange={onDistortionMixChange(track)}
					/>
				))}
			</div>

			<div className="desk__controls">
				<Meter analyser={analyser} />

				<button className="desk__button" disabled>Play</button>
				<button className="desk__button" disabled>Pause</button>
				<button className="desk__button" disabled>Rewind</button>
			</div>

			<div className="desk__effects">
				<Delay {...delay} onChange={onChange('delay')} />
				<Distortion {...distortion} onChange={onChange('distortion')} />
			</div>
		</div>
	);
};


export default Desk;