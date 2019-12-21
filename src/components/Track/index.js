import React from 'react';

import Fader from '/components/Fader';


const Track = ({
	title = 'Untitled',
	volume,
	fx,

	toggleMute = () => {},
	toggleBypass = () => {},

	onTrackVolumeChange = () => {},
	onReverbMixChange = () => {},
	onDelayMixChange = () => {},
	onDistortionMixChange = () => {},
}) => {
	return (
		<div className="track">
			<Fader onChange={onTrackVolumeChange} position={volume} />
			
			<div className="buttons">
				<button className="track-button" onClick={toggleMute}>Mute</button>
				<button className="track-button" onClick={toggleBypass}>Bypass FX</button>
			</div>

			<div className="effects">
				<div className="effect">
					<span className="effect-title">Delay:</span>
					<Fader onChange={onDelayMixChange} position={fx.delay.gain.value} />
				</div>
				<div class="effect">
					<span className="effect-title">Revrb:</span>
					<Fader onChange={onReverbMixChange} position={fx.reverb.gain.value} />
				</div>
				<div className="effect">
					<span className="effect-title">Distrt:</span>
					<Fader onChange={onDistortionMixChange} position={fx.distortion.gain.value} />
				</div>
			</div>

			<div className="track-title">{title}</div>
		</div>
	);
};

export default Track;