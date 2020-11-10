import {MixerContext} from '/containers/Context/index';
import {SendId, SendParamValue} from '/models/sends/index';
import {TrackId} from '/models/track';


export const play = async ({dispatch, mx}: MixerContext): Promise<void> => {
    await mx.current?.play();

    return dispatch({type: 'PLAYBACK_PLAY'});
};

export const pause = async ({dispatch, mx}: MixerContext): Promise<void> => {
    await mx.current?.pause();

    return dispatch({type: 'PLAYBACK_PAUSE'});
};

export const rewind = async ({dispatch, mx}: MixerContext): Promise<void> => {
    await mx.current?.rewind();

    return dispatch({type: 'PLAYBACK_REWIND'});
};

export const setSendParamValue = ({mx, dispatch}: MixerContext) => (sendId: SendId) => (parameterId: string) => async (value: SendParamValue): Promise<void> => {
    await mx.current?.setSendParamValue(sendId, parameterId, value);

    return dispatch({
        type: 'SET_SEND_PARAM_VALUE',
        payload: {
            sendId,
            parameterId,
            value,
        },
    });
};

export const setTrackVolume = ({mx, dispatch}: MixerContext) => (trackId: TrackId) => async (value: number): Promise<void> => {
    await mx.current?.setTrackVolume(trackId, value);

    return dispatch({
        type: 'SET_TRACK_VOLUME',
        payload: {
            trackId,
            value,
        },
    });
};

export const setTrackSendLevel = ({dispatch, mx}: MixerContext) => (trackId: TrackId) => (sendId: SendId) => async (value: number): Promise<void> => {
    await mx.current?.setTrackSendLevel(trackId, sendId, value);

    return dispatch({
        type: 'SET_TRACK_SEND_LEVEL',
        payload: {
            sendId,
            trackId,
            value,
        },
    });
};

export const toggleTrack = ({dispatch, mx}: MixerContext) => async (trackId: TrackId): Promise<void> => {
    await mx.current?.toggleTrack(trackId);

    return dispatch({
        type: 'TRACK_MUTE_TOGGLE',
        payload: {
            trackId,
        },
    });
};

export const toggleTrackFx = ({dispatch, mx}: MixerContext) => async (trackId: TrackId): Promise<void> => {
    await mx.current?.toggleTrackFx(trackId);

    return dispatch({
        type: 'TRACK_SEND_TOGGLE',
        payload: {
            trackId,
        },
    });
};