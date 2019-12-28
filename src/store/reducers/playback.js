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
});

const setPlaybackReady = state => ({
    ...state,
    status: PLAYBACK_STATUS.READY,
});

export const playbackReducer = (playback, action) => {
    switch (action.type) {
        case 'PLAYBACK_PLAY':
            return play(playback);
        case 'PLAYBACK_PAUSE':
            return pause(playback);
        case 'PLAYBACK_REWIND': 
            return rewind(playback);
        case 'PLAYBACK_READY': 
            return setPlaybackReady(playback);
        default:
            return playback;
    }
};