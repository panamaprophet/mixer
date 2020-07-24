import {useRef, useReducer, useEffect} from 'react';

import {reducer} from '/store/reducers';
import {getDispatchWithLog, createState} from '/store/helpers';

import Mixer from '/models/mixer';
import Delay from '/models/fx/delay';
import Reverb from '/models/fx/reverb';
import Distortion from '/models/fx/distortion';


const useMixer = (tracks, effects = [Delay, Reverb, Distortion]) => {
    const mx = useRef();

    const [state, dispatch] = useReducer(reducer, {
        tracks: [],
        effects: [],
        playback: {},
    });

    const dispatchWithLog = getDispatchWithLog(dispatch);

    useEffect(() => {
        const onLoad = async trackStates => {
            const {tracks, effects, playback} = createState(mx.current);

            await dispatchWithLog({ type: 'SET_TRACKS', payload: tracks });
            await dispatchWithLog({ type: 'SET_EFFECTS', payload: effects });
            await dispatchWithLog({ type: 'SET_PLAYBACK', payload: playback });
            await dispatchWithLog({ type: 'PLAYBACK_READY' });
        }

        if (!mx.current) {
            mx.current = new Mixer([], effects);
        }

        // @ts-ignore
        mx.current.stop()
            .then(mx => mx.load(tracks))
            .then(onLoad);
    }, [tracks]);

    return {
        mx,
        state,
        dispatch: dispatchWithLog,
    };
}


export default useMixer;