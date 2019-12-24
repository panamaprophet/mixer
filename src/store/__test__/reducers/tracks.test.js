import {filter, head} from 'ramda';

import {
    TRACK_STATE,
} from '/constants';

import {trackReducer} from '/store/reducers/tracks';


const INITIAL_STATE = [{
    id: 'drums',
    title: 'drums',
    volume: 100,
    isMuted: false,
    isEffectsDisabled: false,
    state: TRACK_STATE.READY,
    send: {
        delay: 0,
        reverb: 0,
        distortion: 0,
    },
}, {
    id: 'bass',
    title: 'bass',
    volume: 100,
    isMuted: false,
    isEffectsDisabled: false,
    state: TRACK_STATE.READY,
    send: {
        delay: 0,
        reverb: 0,
        distortion: 0,
    },
}];

let state = [
    ...INITIAL_STATE,
];


describe('Playback reducer', () => {
    beforeEach(() => {
        state = [
            ...INITIAL_STATE,
        ];
    });

    it('Track volume changed', () => {
        const trackId = 'drums';
        const value = 42.0;
        const resultState = trackReducer(state, {
            type: 'SET_TRACK_VOLUME',
            payload: {
                trackId,
                value,
            },
        });
        const resultTrack = head(filter(track => track.id === trackId, resultState));

        expect(resultTrack.volume).toBe(value);
    });

    it('Track send level changed', () => {
        const trackId = 'drums';
        const fxId = 'delay';
        const value = 42.0;
        const resultState = trackReducer(state, {
            type: 'SET_TRACK_SEND_LEVEL',
            payload: {
                trackId,
                fxId,
                value,
            },
        });
        const resultTrack = head(filter(track => track.id === trackId, resultState));

        expect(resultTrack.send[fxId]).toBe(value);
    });

    it('Track mute toggled', () => {
        const trackId = 'drums';
        const resultState = trackReducer(state, {
            type: 'TRACK_MUTE_TOGGLE',
            payload: {
                trackId,
            },
        });
        const resultTrack = head(filter(track => track.id === trackId, resultState));

        expect(resultTrack.isMuted).toBe(true);
    });

    it('Track fx bypass toggled', () => {
        const trackId = 'drums';
        const resultState = trackReducer(state, {
            type: 'TRACK_FX_TOGGLE',
            payload: {
                trackId,
            },
        });
        const resultTrack = head(filter(track => track.id === trackId, resultState));

        expect(resultTrack.isEffectsDisabled).toBe(true);
    });

    it('Track set ready state', () => {
        const trackId = 'drums';
        const resultState = trackReducer(state, {
            type: 'TRACK_SET_READY_STATE',
            payload: {
                trackId,
                state: TRACK_STATE.FAILED,
            },
        });
        const resultTrack = head(filter(track => track.id === trackId, resultState));

        expect(resultTrack.state).toBe(TRACK_STATE.FAILED);
    });
});