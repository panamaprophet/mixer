import './mocks';

import {has} from 'ramda';
import {Track} from '../../models/track';
import {Delay} from '../sends';


describe('Track', () => {
    const context = new AudioContext();
    const masterBus = context.createGain();

    const track = new Track({
        url: '//test.example.com',
        title: 'track',
        context,
        masterBus,
        sends: [],
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

            expect(track.isPlaying).toBe(true);
        });
    });

    describe('pause()', () => {
        it('pauses track', () => {
            track.play();
            track.pause();

            expect(track.isPlaying).toBe(false);
        });
    });

    describe('mute()', () => {
        it('mutes track', () => {
            track.mute();

            expect(track.isMuted).toBe(true);
        });
    });

    describe('unmute()', () => {
        it('unmutes track', () => {
            track.mute();
            track.unmute();

            expect(track.isMuted).toBe(false);
        });
    });

    describe('toggleMute()', () => {
        it('switches track mute state', () => {
            const initialValue = track.isMuted;

            track.toggleMute();
            track.toggleMute();

            expect(track.isMuted).toBe(initialValue);
        });
    });

    describe('addSend()', () => {
        it('add send to track chain', () => {
            const delay = new Delay(context, masterBus);

            track.addSend(delay);

            const hasSendInChain = has(delay.id, track.sends);

            expect(hasSendInChain).toBe(true);
        });
    });

    describe('toggleFX', () => {
        it('switches track sends state', () => {
            const initialValue = track.isSendsEnabled;

            track.toggleSends();
            track.toggleSends();

            expect(track.isSendsEnabled).toBe(initialValue);
        });
    });
});