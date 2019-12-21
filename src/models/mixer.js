'use strict';

import {map, chain} from 'ramda';

import Track from './track';
import {Delay, Reverb, Distortion} from './fx';
import {createContext, createAnalyser, createMasterBus, createTrackFromSource} from '/helpers/audio';
import {playAll, pauseAll, rewindAll} from '/helpers/playback';


class Mixer {
    constructor(sources, onReady = () => {}) {
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
    play() {
        return playAll(this.tracks);
    }
    pause() {
        return pauseAll(this.tracks);
    }
    rewind() {
        return rewindAll(this.tracks);
    }
}


export default Mixer;