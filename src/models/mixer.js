'use strict';

import {map} from 'ramda';

import Delay from './fx/delay';
import Reverb from './fx/reverb';
import Distortion from './fx/distortion';
import {
    createContext,
    createAnalyser,
    createMasterBus,
    createTrackFromSource,
    isContextRunning,
    resumeContext,
} from '/helpers/audio';
import {setNodeParams,setNodeParamNormalizedValue} from '/helpers/node';
import {playAll, pauseAll, rewindAll} from '/helpers/playback';


/**
 * @typedef {Object} Mixer
 * @property {GainNode} masterBus
 * @property {AudioContext} context
 * @property {AnalyserNode} analyser
 * @property {Track[]} tracks
 * @property {Send[]} fx
 */


class Mixer {
    constructor(sources = []) {
        this.context = createContext();
        this.analyser = createAnalyser(this.context);
        this.masterBus = createMasterBus(this.context, [this.analyser]);

        this.fx = [
            new Delay(this.context, this.masterBus),
            new Reverb(this.context, this.masterBus),
            new Distortion(this.context, this.masterBus),
        ];

        const tracks = map(createTrackFromSource(this.context, this.masterBus), sources);

        tracks.map(track => track.addFx(this.fx));

        this.tracks = tracks;
    }

    /**
     * @returns {Promise<Mixer>}
     */
    async play() {
        const {context} = this;

        if (isContextRunning(context) === false) {
            await resumeContext(context);
        }

        playAll(this.tracks);

        return this;
    }

    /**
     * @returns {Promise<Mixer>}
     */
    async pause() {
        pauseAll(this.tracks);

        return this;
    }

    /**
     * @returns {Promise<Mixer>}
     */
    async rewind() {
        rewindAll(this.tracks);

        return this;
    }

    /**
     * @param {TrackId} trackId 
     * @param {number} volume
     * @returns {Promise<Track[]>}
     */
    async setTrackVolume(trackId, volume) {
        return this.tracks.map(track => {
            if (track.id === trackId) {
                track.volume = volume;
            }

            return track;
        });
    }

    /**
     * 
     * @param {TrackId} trackId 
     * @param {SendId} sendId 
     * @param {number} level 
     * @returns {Promise<Track[]>}
     */
    async setTrackSendLevel(trackId, sendId, level) {
        return this.tracks.map(track => {
            if (track.id === trackId) {
                setNodeParamNormalizedValue(track.fx[sendId].gain, level);
            }

            return track;
        });
    }

    /**
     * @param {TrackId} trackId 
     * @returns {Promise<Track[]>}
     */
    async toggleTrack(trackId) {
        return this.tracks.map(track => {
            if (track.id === trackId) {
                track.toggleMute();
            }

            return track;
        });
    }

    /**
     * @param {TrackId} trackId 
     * @returns {Promise<Track[]>}
     */
    async toggleTrackFx(trackId) {
        return this.tracks.map(track => {
            if (track.id === trackId) {
                track.toggleFX();
            }

            return track;
        });
    }

    /**
     * 
     * @param {SendId} sendId 
     * @param {number|string} value 
     * @retruns {Promise<Send[]>}
     */
    async setSendParamValue(sendId, parameterId, value) {
        return this.fx.map(fx => {
            if (fx.id === sendId) {
                setNodeParams(fx, {[parameterId]: value});
            }

            return fx;
        });
    }
}


export default Mixer;