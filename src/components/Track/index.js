import React from 'react';

import Fader from '/components/Fader';


const Track = ({
    title = 'Untitled',
    volume = 0,
    send,

    onMute,
    onBypass,
    onVolumeChange,
    onReverbMixChange,
    onDelayMixChange,
    onDistortionMixChange,
}) => (
    <div className="track">
        <Fader onChange={onVolumeChange} position={volume} isVertical={true} />

        <div className="buttons">
            <button className="track-button" onClick={onMute}>Mute</button>
            <button className="track-button" onClick={onBypass}>Bypass FX</button>
        </div>

        <div className="effects">
            <div className="effect">
                <span className="effect-title">Delay:</span>
                <Fader onChange={onDelayMixChange} position={send.delay} />
            </div>
            <div className="effect">
                <span className="effect-title">Revrb:</span>
                <Fader onChange={onReverbMixChange} position={send.reverb} />
            </div>
            <div className="effect">
                <span className="effect-title">Distrt:</span>
                <Fader onChange={onDistortionMixChange} position={send.distortion} />
            </div>
        </div>

        <div className="track-title">{title}</div>
    </div>
);

export default Track;