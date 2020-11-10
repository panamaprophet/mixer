import {forEach} from 'ramda';
import {Track} from '../models/track';


export enum PlaybackStatus {
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
    READY = 'READY',
    FAILED = 'FAILED',
    NOT_SET = 'NOT_SET',
}

export interface Playback {
    status: PlaybackStatus;
    currentPosition: number;
    analyser?: AnalyserNode;
}


export const isPlaying = (playback: Playback): boolean => playback.status === PlaybackStatus.PLAYING;

export const isPaused = (playback: Playback): boolean => playback.status === PlaybackStatus.PAUSED; // @TODO: && playback.currentPosition !== 0;

export const isReady = (playback: Playback): boolean => playback.status === PlaybackStatus.READY;

export const isActive = (playback: Playback): boolean => (isPlaying(playback) || isPaused(playback) || isReady(playback));

export const playAll = forEach((track: Track): void => track.play());

export const pauseAll = forEach((track: Track): void => track.pause());

export const rewindAll = forEach((track: Track): void => {
    track.stop();
    track.play();
});

export const stopAll = forEach((track: Track): void => track.stop());