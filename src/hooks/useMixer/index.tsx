import {useRef, useReducer, useEffect} from 'react';
import {reducer} from '/store/reducers/index';
import {getDispatchWithLog, createState} from '../../store/index';
import {Mixer} from '/models/mixer';
import {Delay, Reverb, Distortion, SendConstructor} from '/models/sends/index';
import {PlaybackStatus} from '/helpers/playback';
import type {MixerContext} from '/containers/Context/index';
import type {TrackSource} from '/models/track';


export const useMixer = (tracks: TrackSource[], effects: SendConstructor[] = [Delay, Reverb, Distortion]): MixerContext => {
    const mx = useRef<Mixer>();

    const [state, dispatch] = useReducer(reducer, {
        tracks: [],
        sends: [],
        playback: {
            status: PlaybackStatus.NOT_SET,
            currentPosition: 0,
        },
    });

    const dispatchWithLog = getDispatchWithLog(dispatch);

    useEffect(() => {
        const onLoad = (): void => {
            if (!mx.current) {
                throw Error('Mixer instance is not available by ref after initialization');
            }

            const {tracks, sends, playback} = createState(mx.current);

            dispatchWithLog({ type: 'SET_TRACKS', payload: tracks });
            dispatchWithLog({ type: 'SET_SENDS', payload: sends });
            dispatchWithLog({ type: 'SET_PLAYBACK', payload: playback });
            dispatchWithLog({ type: 'PLAYBACK_READY' });
        }

        if (!mx.current) {
            mx.current = new Mixer([], effects);
        }

        void mx.current.stop()
            .then(mx => mx.load(tracks))
            .then(onLoad);
    }, [tracks]);

    return {
        // @ts-ignore: should be properly instantiated
        mx,
        state,
        dispatch: dispatchWithLog,
    };
}