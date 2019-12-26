'use strict';

import {keys, curry} from 'ramda';

import Track from '/models/track';

import {
    CONTEXT_STATE,
} from '/constants';


export const createContext = () => new (window.AudioContext || window.webkitAudioContext)();

export const createMasterBus = (context, connections = []) => {
    const gain = context.createGain();

    gain.connect(context.destination);
    connections.map(connection => gain.connect(connection));

    return gain;
};

export const createAnalyser = (context, parameters = {fftSize: 2048}) => {
    const analyser = context.createAnalyser();

    keys(parameters).map(key => analyser[key] = parameters[key]);

    return analyser;
};

export const createTrackFromSource = curry(({context, masterBus, sends = []}, {url, title}) => new Track({
    url,
    title,
    context,
    masterBus,
    sends,
}));

export const isAudioParam = (node, parameter) => node[parameter] instanceof AudioParam;

export const fetchAudioAsArrayBuffer = url => fetch(url).then(response => response.arrayBuffer());

export const isContextRunning = context => context.state === CONTEXT_STATE.RUNNING;

/**
 * @returns {Promise}
 */
export const resumeContext = context => context.resume();

