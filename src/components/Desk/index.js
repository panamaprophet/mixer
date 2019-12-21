import React from 'react';

import Meter from '/components/Meter';

import {
    isPlaying,
    isPaused,
} from '/helpers/playback';


const Desk = ({
    playback,

    onPlay,
    onPause,
    onRewind,

    tracks,
    effects,
}) => (
    <div className="desk">
        <div className="desk__tracks">
            {tracks}
        </div>

        <div className="desk__controls">
            <Meter analyser={playback.analyser} />

            <button className={isPlaying(playback) ? 'button-pressed' : ''} onClick={onPlay}>Play</button>
            <button className={isPaused(playback) ? 'button-pressed' : ''} onClick={onPause}>Pause</button>
            <button onClick={onRewind}>Rewind</button>
        </div>

        <div className="desk__effects">
            {effects}
        </div>
    </div>
);

export default Desk;