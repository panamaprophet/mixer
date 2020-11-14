import {PlaybackStatus, isPlaying, isPaused, Playback} from '../playback';


const DEFAULT_STATE: Playback = {
    currentPosition: 0,
    status: PlaybackStatus.NOT_SET,
}

describe('playback helpers', () => {
    describe('isPlaying()', () => {
        it('returns positive value', () => {
            const playbackMock = {...DEFAULT_STATE, status: PlaybackStatus.PLAYING};
            const result = isPlaying(playbackMock);

            expect(result).toBe(true);
        });

        it('returns negative value', () => {
            const playbackMock = {...DEFAULT_STATE, status: PlaybackStatus.PAUSED};
            const result = isPlaying(playbackMock);

            expect(result).toBe(false);
        });
    });

    describe('isPaused()', () => {
        it('returns positive value', () => {
            const playbackMock = {...DEFAULT_STATE, status: PlaybackStatus.PAUSED};
            const result = isPaused(playbackMock);

            expect(result).toBe(true);
        });

        it('returns negative value', () => {
            const playbackMock = {...DEFAULT_STATE, status: PlaybackStatus.PLAYING};
            const result = isPaused(playbackMock);

            expect(result).toBe(false);
        });
    });
});