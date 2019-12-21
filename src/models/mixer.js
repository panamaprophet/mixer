'use strict';

import {map} from 'ramda';

import {Delay, Reverb, Distortion} from './fx';
import {
    createContext,
    createAnalyser,
    createMasterBus,
    createTrackFromSource,
    isContextRunning,
    resumeContext,
} from '/helpers/audio';
import {playAll, pauseAll, rewindAll} from '/helpers/playback';


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
    async play() {
        const {context} = this;

        if (isContextRunning(context) === false) {
            await resumeContext(context);
        }

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