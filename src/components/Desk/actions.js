'use strict';


import {curry, chain} from 'ramda';


const getFxById = curry((fxId, track) => track.fx.filter(({id}) => id === fxId));

const setFxGainValue = curry((value, fx) => fx.gain.value = value);

const setFxGainValueById = (track, fxId, value) => chain(
    getFxById(fxId, track),
    head,
    setFxGainValue(value),
);


export const onTrackVolumeChange = curry((track, value) => track.volume = volume);

export const onReverbMixChange = curry((track, value) => setFxGainValueById(track, 'reverb', value));

export const onDelayMixChange = curry((track, value) => setFxGainValueById(track, 'delay', value));

export const onDistortionMixChange = curry((track, value) => setFxGainValueById(track, 'distortion', value));