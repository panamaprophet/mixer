'use strict';


import {map} from 'ramda';


export const playAll = map(track => track.play());

export const pauseAll = map(track => track.pause());

export const rewindAll = map(track => {
    track.stop();
    track.play();
});