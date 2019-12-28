import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {all, head, filter} from 'ramda';

import Mixer from '/models/mixer';
import Delay from '/models/fx/delay';

import {getNodeParamNormalizedValue} from '/helpers/node';

import './mocks/';
import {trackMocks} from './mocks/config';


const getTrackById = (trackId, tracks) => head(filter(track => track.id === trackId, tracks));

describe('Mixer', () => {
    const mx = new Mixer(trackMocks, [Delay]);

    describe('play()', () => {
        it('starts tracks to play', async () => {
            await mx.play();

            const result = all(({playing}) => playing, mx.tracks);

            expect(result).toBe(true);
        });
    });

    describe('pause()', () => {
        it('pause tracks', async () => {
            await mx.play();
            await mx.pause();

            const result = all(({playing}) => playing === false, mx.tracks);

            expect(result).toBe(true);
        });
    });

    describe('setTrackVolume()', () => {
        it('changes specified track volume', async () => {
            const trackId = 'drums';
            const volume = 42.0;

            await mx.setTrackVolume(trackId, volume);

            const track = getTrackById(trackId, mx.tracks);
            const result = track.volume;

            expect(result).toBe(volume);
        });
    });

    describe('setTrackSendLevel()', () => {
        it('changes specified track send level', async () => {
            const trackId = 'drums';
            const sendId = 'delay';
            const sendLevel = 42.0;

            await mx.setTrackSendLevel(trackId, sendId, sendLevel);

            const track = getTrackById(trackId, mx.tracks);
            const result = getNodeParamNormalizedValue(track.fx[sendId].gain);

            expect(result).toBe(sendLevel);
        });
    });

    describe('toggleTrack()', () => {
        it('toggles mute for specified track', async () => {
            const trackId = 'drums';

            await mx.toggleTrack(trackId);

            const track = getTrackById(trackId, mx.tracks);
            const result = track.muted;

            expect(result).toBe(true);
        });
    });

    describe('toggleTrackFx()', () => {
        it('toggles sends for specified track', async () => {
            const trackId = 'drums';

            await mx.toggleTrackFx(trackId);

            const track = getTrackById(trackId, mx.tracks);
            const result = track.bypassFX;

            expect(result).toBe(true);
        });
    });

    describe('setSendParamValue()', () => {
        it('sets specified parameter value for specified send', async () => {
            const sendId = 'delay';
            const parameterId = 'frequency';
            const value = 42.0;

            await mx.setSendParamValue(sendId, parameterId, value);

            const send = head(filter(fx => fx.id === sendId, mx.fx));
            const result = send[parameterId];

            expect(result).toBe(value);
        });
    });
});