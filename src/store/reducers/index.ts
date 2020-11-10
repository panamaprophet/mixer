import {trackReducer} from './tracks';
import {sendReducer} from './send';
import {playbackReducer} from './playback';
import type {MixerState} from '/containers/Context/index';
import type {Playback} from '/helpers/playback';
import type {SendEntity, TrackEntity} from '/helpers/entities';
import type {TrackId, TrackState} from '/models/track';
import type {SendId, SendParamValue} from '/models/sends/index';


type PlaybackAction =
    | {type: 'PLAYBACK_PLAY'}
    | {type: 'PLAYBACK_PAUSE'}
    | {type: 'PLAYBACK_REWIND'}
    | {type: 'PLAYBACK_READY'}
    | {type: 'SET_PLAYBACK', payload: Playback};

type SendAction =
    | {type: 'SET_SEND_PARAM_VALUE', payload: {sendId: SendId, parameterId: string, value: SendParamValue}}
    | {type: 'SET_SENDS', payload: SendEntity[]};

type TrackAction =
    | {type: 'SET_TRACK_VOLUME', payload: {value: number, trackId: TrackId}}
    | {type: 'SET_TRACK_SEND_LEVEL', payload: {value: number, sendId: SendId, trackId: TrackId}}
    | {type: 'TRACK_MUTE_TOGGLE', payload: {trackId: TrackId}}
    | {type: 'TRACK_SEND_TOGGLE', payload: {trackId: TrackId}}
    | {type: 'TRACK_SET_READY_STATE', payload: {trackId: TrackId, value: TrackState}}
    | {type: 'SET_TRACKS', payload: TrackEntity[]};

export type Action = SendAction | TrackAction | PlaybackAction;


export const reducer = (state: MixerState, action: Action): MixerState => {
    return {
        tracks: trackReducer(state.tracks, action),
        sends: sendReducer(state.sends, action),
        playback: playbackReducer(state.playback, action),
    };
};