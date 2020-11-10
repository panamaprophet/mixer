import type {Action} from "./index";
import {Playback, PlaybackStatus} from "/helpers/playback";


const play = (state: Playback): Playback => ({
    ...state,
    status: PlaybackStatus.PLAYING
});

const pause = (state: Playback): Playback => ({
    ...state,
    status: PlaybackStatus.PAUSED,
});

const rewind = (state: Playback): Playback => ({
    ...state,
    currentPosition: 0,
    status: PlaybackStatus.PLAYING,
});

const setPlaybackReady = (state: Playback): Playback => ({
    ...state,
    status: PlaybackStatus.READY,
});


export const playbackReducer = (playback: Playback, action: Action): Playback => {
    switch (action.type) {
        case 'PLAYBACK_PLAY':
            return play(playback);
        case 'PLAYBACK_PAUSE':
            return pause(playback);
        case 'PLAYBACK_REWIND':
            return rewind(playback);
        case 'PLAYBACK_READY':
            return setPlaybackReady(playback);
        case 'SET_PLAYBACK':
            return {...action.payload};
        default:
            return playback;
    }
};