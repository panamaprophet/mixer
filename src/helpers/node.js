'use strict';


import {keys} from 'ramda';

import {
    isAudioParam,
} from '/helpers/audio';


export const setNodeParams = (node, params) => keys(params).forEach(key => {
    if (isAudioParam(node, key)) {
        node[key].value = params[key];
    } else {
        node[key] = params[key];
    }

    return node;
});


export const connectNodes = (source, destination) => 
    source.connect(destination);

export const connectNodesSingle = (source, destination) => {
    source.disconnect();
    connectNodes(source, destination);
};

export const createGainNode = (context, defaultVolume = 1) => {
    const gain = context.createGain();
    gain.gain.value = defaultVolume;

    return gain;
};