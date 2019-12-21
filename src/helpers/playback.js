import {map} from 'ramda';

import {
	PLAYBACK_STATUS,
} from '/constants';


export const isPlaying = controls => controls.status === PLAYBACK_STATUS.PLAYING;

export const isPaused = controls => controls.status === PLAYBACK_STATUS.PAUSED && controls.currentPosition !== 0;

export const playAll = map(track => track.play());

export const pauseAll = map(track => track.pause());

export const rewindAll = map(track => {
    track.stop();
    track.play();
});