import React from 'react';

import Meter from '/components/Meter';


const Desk = ({
    analyser,

    play,
    pause,
    rewind,

    tracks,
    effects,
}) => (
    <div className="desk">
        <div className="desk__tracks">
            {tracks}
        </div>

        <div className="desk__controls">
            <Meter analyser={analyser} />

            <button className="desk__button" onClick={play}>Play</button>
            <button className="desk__button" onClick={pause}>Pause</button>
            <button className="desk__button" onClick={rewind}>Rewind</button>
        </div>

        <div className="desk__effects">
            {effects}
        </div>
    </div>
);

export default Desk;