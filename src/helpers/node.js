'use strict';

import {keys} from 'ramda';

import {isAudioParam} from '/helpers/audio';


export const getNodeParamNormalizedValue = node => {
    const {value, maxValue, defaultValue} = node;

    if (defaultValue === 1) {
        return value / (1 / 100);
    }

    return value / (maxValue / 100);
}

export const setNodeParamNormalizedValue = (node, value) => {
    const {maxValue, minValue} = node;
    const absoluteValue = value * (maxValue / 100);

    if (absoluteValue < minValue) {
        node.value = minValue;

        return node;
    }

    if (absoluteValue > maxValue) {
        node.value = maxValue;

        return node;
    }

    node.value = absoluteValue;

    return node;
}

/**
 * @TODO: 
 * make function accepts value between 0 .. 100 and denormolize it by minValue/maxValue properties of node, use it in setters
 * make normalizer function to use in getters to get the value in percents
 */
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