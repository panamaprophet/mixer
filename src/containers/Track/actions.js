import {curry} from 'ramda';


export const setVolume = curry((dispatch, trackId, value) => dispatch({
    type: 'SET_TRACK_VOLUME',
    payload: {
        trackId, 
        value,
    },
}));

export const setSendLevel = curry((dispatch, trackId, fxId, value) => dispatch({
    type: 'SET_TRACK_SEND_LEVEL',
    payload: {
        fxId,
        trackId,
        value,
    },
}));

export const toggleMute = curry((dispatch, trackId) => dispatch({
    type: 'TRACK_MUTE_TOGGLE',
    payload: {
        trackId,
    },
}));

export const toggleFxBypass = curry((dispatch, trackId) => dispatch({
    type: 'TRACK_FX_TOGGLE',
    payload: {
        trackId,
    },
}));