'use strict';

import {keys} from 'ramda';

import Track from 'models/track';


export const createContext = () => new window.AudioContext();

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

export const createTrackFromSource = (context, masterBus, {url, title}) => new Track({
    url,
    title,
    context,
    masterBus,
});

export const isAudioParam = (node, parameter) => node[parameter] instanceof AudioParam;

export const fetchAudioAsArrayBuffer = url => fetch(url).then(response => response.audioBuffer());