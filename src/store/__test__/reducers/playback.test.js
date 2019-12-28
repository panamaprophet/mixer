import {
    PLAYBACK_STATUS,
} from '/constants';

import {playbackReducer} from '/store/reducers/playback';


const INITIAL_STATE = {
    currentPosition: 0,
    status: PLAYBACK_STATUS.NOT_SET,
    analyser: {},
};

let state = {
    ...INITIAL_STATE,
};

describe('Playback reducer', () => {
    beforeEach(() => {
        state = {
            ...INITIAL_STATE,
        };
    });

    it('Play', () => {
        const resultState = playbackReducer(state, {type: 'PLAYBACK_PLAY'});

        expect(resultState.status).toBe(PLAYBACK_STATUS.PLAYING);
    });

    it('Pause', () => {
        const resultState = playbackReducer(state, {type: 'PLAYBACK_PAUSE'});

        expect(resultState.status).toBe(PLAYBACK_STATUS.PAUSED);
    });

    it('Rewind', () => {
        const resultState = playbackReducer(state, {type: 'PLAYBACK_REWIND'});

        expect(resultState.status).toBe(PLAYBACK_STATUS.PLAYING);
    });

    it('setReadyState', () => {
        const resultState = playbackReducer(state, {type: 'PLAYBACK_READY'});

        expect(resultState.status).toBe(PLAYBACK_STATUS.READY);
    })
});