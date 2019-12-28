    import {curry} from 'ramda';

    import {mixdesk} from '../mixdesk';


    export const play = async dispatch => {
        await mixdesk.play();

        return dispatch({type: 'PLAYBACK_PLAY'});
    };

    export const pause = async dispatch => {
        await mixdesk.pause();

        return dispatch({type: 'PLAYBACK_PAUSE'});
    };

    export const rewind = async dispatch => {
        await mixdesk.rewind();

        return dispatch({type: 'PLAYBACK_REWIND'});
    };

    export const setSendParamValue = curry(async (dispatch, effectId, parameterId, value) => {
        await mixdesk.setSendParamValue(effectId, parameterId, value);

        return dispatch({
            type: 'SET_EFFECT_PARAM_VALUE',
            payload: {
                effectId,
                parameterId,
                value,
            },
        });
    });

    export const setTrackVolume = curry(async (dispatch, trackId, value) => {
        await mixdesk.setTrackVolume(trackId, value);
        
        return dispatch({
            type: 'SET_TRACK_VOLUME',
            payload: {
                trackId, 
                value,
            },
        });
    });

    export const setTrackSendLevel = curry(async (dispatch, trackId, fxId, value) => {
        await mixdesk.setTrackSendLevel(trackId, fxId, value);

        return dispatch({
            type: 'SET_TRACK_SEND_LEVEL',
            payload: {
                fxId,
                trackId,
                value,
            },
        });
    });

    export const toggleTrack = curry(async (dispatch, trackId) => { 
        await mixdesk.toggleTrack(trackId);

        return dispatch({
            type: 'TRACK_MUTE_TOGGLE',
            payload: {
                trackId,
            },
        });
    });

    export const toggleTrackFx = curry(async (dispatch, trackId) => {
        await mixdesk.toggleTrackFx(trackId);

        return dispatch({
            type: 'TRACK_FX_TOGGLE',
            payload: {
                trackId,
            },
        });
    });