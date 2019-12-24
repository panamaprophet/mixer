import React from 'react';
import classnames from 'classnames';

import Meter from '/components/Meter';
import Icon from '/components/Icon';

import {
    isPlaying,
    isPaused,
} from '/helpers/playback';

import style from './style.css';


const Desk = ({
    playback,

    onPlay,
    onPause,
    onRewind,

    tracks,
    effects,
}) => {
    const btnClassNames = isButtonPressed => classnames(
        style.control,
        style.button,
        isButtonPressed && style.buttonPressed,
    );

    return (
        <div className={style.desk}>
            <div className={style.tracks}>
                {tracks}
            </div>

            <div className={style.controlsContainer}>
                <div className={style.controls}>
                    <Meter analyser={playback.analyser} />

                    <button className={btnClassNames(isPlaying(playback))} onClick={onPlay}>
                        <Icon type="play" />
                        Play
                    </button>
                    <button className={btnClassNames(isPaused(playback))} onClick={onPause}>
                        <Icon type="pause" />
                        Pause
                    </button>
                    <button className={btnClassNames(false)} onClick={onRewind}>
                        <Icon type="rewind" />
                        Rewind
                    </button>
                </div>

                <div className={style.effects}>
                    {effects}
                </div>
            </div>
        </div>
    );
};

export default Desk;