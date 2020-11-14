import {filter, head} from 'ramda';
import {TrackState} from '/models/track';
import {trackReducer} from '../../reducers/tracks';
import {TrackEntity} from '/helpers/entities';


const INITIAL_STATE: TrackEntity[] = [{
    id: 'drums',
    title: 'drums',
    volume: 100,
    isMuted: false,
    isSendsEnabled: true,
    state: TrackState.READY,
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
    isSendsEnabled: true,
    state: TrackState.READY,
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

        expect(resultTrack?.volume).toBe(value);
    });

    it('Track send level changed', () => {
        const trackId = 'drums';
        const sendId = 'delay';
        const value = 42.0;
        const resultState = trackReducer(state, {
            type: 'SET_TRACK_SEND_LEVEL',
            payload: {
                trackId,
                sendId,
                value,
            },
        });
        const resultTrack = head(filter(track => track.id === trackId, resultState));

        expect(resultTrack?.send[sendId]).toBe(value);
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

        expect(resultTrack?.isMuted).toBe(true);
    });

    it('Track fx bypass toggled', () => {
        const trackId = 'drums';
        const resultState = trackReducer(state, {
            type: 'TRACK_SEND_TOGGLE',
            payload: {
                trackId,
            },
        });
        const resultTrack = head(filter(track => track.id === trackId, resultState));

        expect(resultTrack?.isSendsEnabled).toBe(false);
    });

    it('Track set ready state', () => {
        const trackId = 'drums';
        const resultState = trackReducer(state, {
            type: 'TRACK_SET_READY_STATE',
            payload: {
                trackId,
                value: TrackState.FAILED,
            },
        });
        const resultTrack = head(filter(track => track.id === trackId, resultState));

        expect(resultTrack?.state).toBe(TrackState.FAILED);
    });
});