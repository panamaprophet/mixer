import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {has} from 'ramda';

import Track from '/models/track';

import './mocks';


describe('Track', () => {
    const context = new AudioContext();
    const masterBus = context.createGain();

    const track = new Track({
        url: '//test.example.com',
        title: 'track',
        context,
        masterBus,
    });

    describe('volume', () => {
        it('sets correctly', () => {
            const volume = 42.0;
            
            track.volume = volume;

            expect(track.volume).toBe(volume);
        });
    });

    describe('pan', () => {
        it('sets correctly', () => {
            const pan = 42.0;

            track.pan = pan;

            expect(track.pan).toBe(pan);
        });
    })
    
    describe('play()', () => {
        it('starts to play track', () => {
            track.play();

            expect(track.playing).toBe(true);
        });
    });
    
    describe('pause()', () => {
        it('pauses track', () => {
            track.play();
            track.pause();

            expect(track.playing).toBe(false);
        });
    });

    describe('mute()', () => {
        it('mutes track', () => {
            track.mute();

            expect(track.muted).toBe(true);
        });
    });

    describe('unmute()', () => {
        it('unmutes track', () => {
            track.mute();
            track.unmute();

            expect(track.muted).toBe(false);
        });
    });

    describe('toggleMute()', () => {
        it('switches track mute state', () => {
            const initialValue = track.muted;

            track.toggleMute();
            track.toggleMute();

            expect(track.muted).toBe(initialValue);
        });
    });

    describe('addFx()', () => {
        it('add fx to track chain', () => {
            const mockId = 'mockedEffect';
            const fxMock = {
                id: mockId,
                signalIn: context.createGain(),
                signalOut: context.createGain(),
            };

            track.addFx([fxMock]);

            const hasEffectInChain = has(mockId, track.fx);

            expect(hasEffectInChain).toBe(true);
        });
    });

    describe('toggleFX', () => {
        it('switches track sends state', () => {
            const initialValue = track.bypassFX;

            track.toggleFX();
            track.toggleFX();

            expect(track.bypassFX).toBe(initialValue);
        });
    });
});