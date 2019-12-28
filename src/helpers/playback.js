import {map, not} from 'ramda';

import {
    PLAYBACK_STATUS,
} from '/constants';


export const isPlaying = playback => playback.status === PLAYBACK_STATUS.PLAYING;

export const isPaused = playback => playback.status === PLAYBACK_STATUS.PAUSED && playback.currentPosition !== 0;

export const isReady = playback => playback.status === PLAYBACK_STATUS.READY;

export const isActive = playback => [
    PLAYBACK_STATUS.NOT_SET,
    PLAYBACK_STATUS.FAILED,
].includes(playback.status) === false;

export const isNotActive = playback => not(isActive(playback));

export const playAll = map(track => track.play());

export const pauseAll = map(track => track.pause());

export const rewindAll = map(track => {
    track.stop();
    track.play();
});