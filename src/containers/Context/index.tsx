import {createContext} from 'react';
import type {SendEntity, TrackEntity} from '/helpers/entities';
import {Playback, PlaybackStatus} from '/helpers/playback';
import type {Mixer} from '/models/mixer';
import type {Action} from '/store/reducers/index';


export interface MixerState {
    tracks: TrackEntity[],
    sends: SendEntity[],
    playback: Playback,
}

export type MixerContext = {
    mx: React.RefObject<Mixer>,
    state: MixerState,
    dispatch: React.Dispatch<Action>,
}


const defaultContext = {
    tracks: [],
    sends: [],
    playback: {
        status: PlaybackStatus.NOT_SET,
        currentPosition: 0,
    }
};

const nop = () => { return; }


export const Context = createContext<MixerContext>({mx: {current: null}, state: defaultContext, dispatch: nop});