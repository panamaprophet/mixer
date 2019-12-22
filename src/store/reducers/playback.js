import {
    PLAYBACK_STATUS,
} from '/constants';


const play = state => ({
	...state,
	status: PLAYBACK_STATUS.PLAYING
});

const pause = state => ({
	...state,
	status: PLAYBACK_STATUS.PAUSED,
});

const rewind = state => ({
	...state,
	currentPosition: 0,
	status: PLAYBACK_STATUS.PLAYING,
})

export const playbackReducer = (playback, action) => {
    switch (action.type) {
        case 'CONTROLS_PLAY': return play(playback);
        case 'CONTROLS_PAUSE': return pause(playback);
        case 'CONTROLS_REWIND': return rewind(playback);
        default:
            return playback;
    }
};