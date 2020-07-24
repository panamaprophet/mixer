import {curry} from 'ramda';


export const play = async ({dispatch, mx}) => {
    if (mx.current) {
        await mx.current.play();
    }

    return dispatch({type: 'PLAYBACK_PLAY'});
};

export const pause = async ({dispatch, mx}) => {
    if (mx.current) {
        await mx.current.pause();
    }

    return dispatch({type: 'PLAYBACK_PAUSE'});
};

export const rewind = async ({dispatch, mx}) => {
    if (mx.current) {
        await mx.current.rewind();
    }

    return dispatch({type: 'PLAYBACK_REWIND'});
};

export const setSendParamValue = curry(async ({dispatch, mx}, effectId, parameterId, value) => {
    if (mx.current) {
        await mx.current.setSendParamValue(effectId, parameterId, value);
    }

    return dispatch({
        type: 'SET_EFFECT_PARAM_VALUE',
        payload: {
            effectId,
            parameterId,
            value,
        },
    });
});

export const setTrackVolume = curry(async ({dispatch, mx}, trackId, value) => {
    if (mx.current) {
        await mx.current.setTrackVolume(trackId, value);
    }
    
    return dispatch({
        type: 'SET_TRACK_VOLUME',
        payload: {
            trackId, 
            value,
        },
    });
});

export const setTrackSendLevel = curry(async ({dispatch, mx}, trackId, fxId, value) => {
    if (mx.current) {
        await mx.current.setTrackSendLevel(trackId, fxId, value);
    }

    return dispatch({
        type: 'SET_TRACK_SEND_LEVEL',
        payload: {
            fxId,
            trackId,
            value,
        },
    });
});

export const toggleTrack = curry(async ({dispatch, mx}, trackId) => { 
    if (mx.current) {
        await mx.current.toggleTrack(trackId);
    }

    return dispatch({
        type: 'TRACK_MUTE_TOGGLE',
        payload: {
            trackId,
        },
    });
});

export const toggleTrackFx = curry(async ({dispatch, mx}, trackId) => {
    if (mx.current) {
        await mx.current.toggleTrackFx(trackId);
    }

    return dispatch({
        type: 'TRACK_FX_TOGGLE',
        payload: {
            trackId,
        },
    });
});