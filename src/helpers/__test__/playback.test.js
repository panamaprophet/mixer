import {
    PLAYBACK_STATUS,
} from '/constants';

import * as Playback from '/helpers/playback';


describe('playback helpers', () => {
    describe('isPlaying()', () => {
        it('returns positive value', () => {
            const playbackMock = {status: PLAYBACK_STATUS.PLAYING};
            const result = Playback.isPlaying(playbackMock);

            expect(result).toBe(true);
        });

        it('returns negative value', () => {
            const playbackMock = {status: PLAYBACK_STATUS.PAUSED};
            const result = Playback.isPlaying(playbackMock);

            expect(result).toBe(false);
        });
    });

    describe('isPaused()', () => {
        it('returns positive value', () => {
            const playbackMock = {status: PLAYBACK_STATUS.PAUSED};
            const result = Playback.isPaused(playbackMock);

            expect(result).toBe(true);
        });

        it('returns negative value', () => {
            const playbackMock = {status: PLAYBACK_STATUS.PLAYING};
            const result = Playback.isPaused(playbackMock);

            expect(result).toBe(false);
        });
    });
});