import {all, head, filter} from 'ramda';
import {Mixer} from '/models/mixer';
import {Distortion} from '/models/sends/distortion';
import {getNodeParamNormalizedValue} from '/helpers/node';
import {trackMocks} from './mocks/config';
import {Track, TrackId} from '/models/track';

import './mocks/';


const getTrackById = (trackId: TrackId, tracks: Track[]) => head(filter(track => track.id === trackId, tracks));

describe('Mixer', () => {
    const mx = new Mixer(trackMocks, [Distortion]);

    describe('play()', () => {
        it('starts tracks to play', async () => {
            await mx.play();

            const result = all(({isPlaying}) => isPlaying, mx.tracks);

            expect(result).toBe(true);
        });
    });

    describe('pause()', () => {
        it('pause tracks', async () => {
            await mx.play();
            await mx.pause();

            const result = all(({isPlaying}) => isPlaying === false, mx.tracks);

            expect(result).toBe(true);
        });
    });

    describe('setTrackVolume()', () => {
        it('changes specified track volume', async () => {
            const trackId = 'drums';
            const volume = 42.0;

            await mx.setTrackVolume(trackId, volume);

            const track = getTrackById(trackId, mx.tracks);
            const result = track?.volume;

            expect(result).toBe(volume);
        });
    });

    describe('setTrackPanLevel', () => {
        it('changes specified track pan', async () => {
            const trackId = 'drums';
            const pan = 42.0;

            await mx.setTrackPanLevel(trackId, pan);

            const track = getTrackById(trackId, mx.tracks);
            const result = track?.pan;

            expect(result).toBe(pan);
        });
    });

    describe('setTrackSendLevel()', () => {
        it('changes specified track send level', async () => {
            const trackId = 'drums';
            const sendId = 'distortion';
            const sendLevel = 42.0;

            await mx.setTrackSendLevel(trackId, sendId, sendLevel);

            const track = getTrackById(trackId, mx.tracks);
            const result = getNodeParamNormalizedValue(track?.sends[sendId].gain as AudioParam);

            expect(result).toBe(sendLevel);
        });
    });

    describe('toggleTrack()', () => {
        it('toggles mute for specified track', async () => {
            const trackId = 'drums';

            await mx.toggleTrack(trackId);

            const track = getTrackById(trackId, mx.tracks);
            const result = track?.isMuted;

            expect(result).toBe(true);
        });
    });

    describe('toggleTrackFx()', () => {
        it('toggles sends for specified track', async () => {
            const trackId = 'drums';

            await mx.toggleTrackFx(trackId);

            const track = getTrackById(trackId, mx.tracks);
            const result = track?.isSendsEnabled === false;

            expect(result).toBe(true);
        });
    });

    describe('setSendParamValue()', () => {
        it('sets specified parameter value for specified send', async () => {
            const sendId = 'distortion';
            const parameterId = 'strength';
            const value = 100;
            const expectedValue = 10;

            await mx.setSendParamValue(sendId, parameterId, value);

            const send = head(filter(send => send.id === sendId, mx.sends));
            const result = send ? send[parameterId] : null;

            expect(result).toBe(expectedValue);
        });
    });
});