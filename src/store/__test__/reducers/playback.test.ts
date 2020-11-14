import {Playback, PlaybackStatus} from '../../../helpers/playback';
import {playbackReducer} from '../../reducers/playback';


const INITIAL_STATE: Playback = {
    currentPosition: 0,
    status: PlaybackStatus.NOT_SET,
};

let state: Playback = {
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

        expect(resultState.status).toBe(PlaybackStatus.PLAYING);
    });

    it('Pause', () => {
        const resultState = playbackReducer(state, {type: 'PLAYBACK_PAUSE'});

        expect(resultState.status).toBe(PlaybackStatus.PAUSED);
    });

    it('Rewind', () => {
        const resultState = playbackReducer(state, {type: 'PLAYBACK_REWIND'});

        expect(resultState.status).toBe(PlaybackStatus.PLAYING);
    });

    it('setReadyState', () => {
        const resultState = playbackReducer(state, {type: 'PLAYBACK_READY'});

        expect(resultState.status).toBe(PlaybackStatus.READY);
    })
});