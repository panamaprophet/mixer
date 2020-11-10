import React from 'react';
import classnames from 'classnames';
import {Meter} from '/components/Meter/index';
import {Icon} from '/components/Icon/index';
import {isPlaying, isPaused, Playback, isActive} from '/helpers/playback';
import style from './style.css';


type Props = {
    playback: Playback,
    onPlay: () => void,
    onPause: () => void,
    onRewind: () => void,
    tracks: React.ReactNode[],
    sends: React.ReactNode[],
}


export const Desk: React.FC<Props> = ({
    playback,
    tracks = [],
    sends = [],
    onPlay,
    onPause,
    onRewind,
}: Props) => {
    const btnClassNames = (isButtonPressed: boolean) => classnames(
        style.control,
        style.button,
        isButtonPressed && style.isButtonPressed,
    );

    const isDisabled = isActive(playback) === false;

    return (
        <div className={style.desk}>
            <div className={style.tracks}>
                {tracks}
            </div>

            <div className={style.controlsContainer}>
                <div className={style.controls}>
                    {playback.analyser && <Meter analyser={playback.analyser} />}

                    <button className={btnClassNames(isPlaying(playback))} onClick={onPlay} disabled={isDisabled}>
                        <Icon type="play" />
                        Play
                    </button>

                    <button className={btnClassNames(isPaused(playback))} onClick={onPause} disabled={isDisabled}>
                        <Icon type="pause" />
                        Pause
                    </button>

                    <button className={btnClassNames(false)} onClick={onRewind} disabled={isDisabled}>
                        <Icon type="rewind" />
                        Rewind
                    </button>
                </div>

                <div className={style.sends}>
                    {sends}
                </div>
            </div>
        </div>
    );
};