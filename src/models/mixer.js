'use strict'

import {map} from 'ramda';


import Track from './track';

import {
	Delay,
	Reverb,
	Distortion,
} from './fx';

import {
	createContext,
	createAnalyser,
	createMasterBus,
	createTrackFromSource,
} from '/helpers/audio';

import {
	playAll,
	pauseAll,
	rewindAll,
} from '/helpers/playback';


class Mixer {
	constructor(sources, onReady) {
		this.context = createContext();
		this.analyser = createAnalyser(this.context);
		this.masterBus = createMasterBus(this.context, [this.analyser]);
		
		this.tracks = [];

		this.fx = [
			new Delay(this.context, this.masterBus),
			new Reverb(this.context, this.masterBus),
			new Distortion(this.context, this.masterBus),
		];

		const trackPromises = map(createTrackFromSource(this.context, this.masterBus), sources);

		Promise.all(trackPromises)
			.then(map(track => track.addFx(this.fx)))
			.then(map(track => this.tracks.push(track)))
			.then(map(onReady));
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