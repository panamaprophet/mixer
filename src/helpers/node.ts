import {is} from 'ramda';
import {isAudioParam} from '/helpers/audio';
import {SendParamValue} from '/models/sends/index';


export const getNodeParamNormalizedValue = (node: AudioParam): number => {
    const {value, maxValue, defaultValue} = node;

    let resultValue = value;

    // @TODO: fix it in normal way
    if (defaultValue === 1) {
        resultValue = value / (1 / 100);
    } else {
        resultValue = value / (maxValue / 100);
    }

    return resultValue;
}

export const setNodeParamNormalizedValue = (node: AudioParam, value: number): AudioParam => {
    const {maxValue, minValue, defaultValue} = node;
    const dividend = defaultValue === 1 ? 1 : maxValue;
    const absoluteValue = value * (dividend / 100);

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

export const setNodeParams = (node: AudioNode, params: Record<string, SendParamValue>): AudioNode => {
    Object.keys(params).forEach(key => {
        const value = params[key];

        if (isAudioParam(node[key]) && is(Number, value)) {
            // @ts-ignore: no iterator on AudioParam`
            setNodeParamNormalizedValue(node[key], value as number);
        } else {
            // @ts-ignore: no iterator on AudioParam
            node[key] = value;
        }
    });

    return node;
}

export const connectNodes = (source: AudioNode, destination: AudioNode): AudioNode => {
    return source.connect(destination);
}

export const connectNodesSingle = (source: AudioNode, destination: AudioNode): AudioNode => {
    source.disconnect();
    return connectNodes(source, destination);
}

export const createGainNode = (context: AudioContext, defaultVolume = 1): GainNode => {
    const node = context.createGain();
    node.gain.value = defaultVolume;

    return node;
}