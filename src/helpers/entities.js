import {map} from 'ramda';

import {
    getNodeParamNormalizedValue,
} from '/helpers/node';

import {
    PLAYBACK_STATUS,
    FILTER_TYPES,
} from '/constants';


const createReverbEntity = ({id, responses, currentResponse}) => ({
    id,
    name: 'Reverb',
    parameters: [{
        name: 'Response',
        id: 'currentResponse',
        value: currentResponse,
        values: Object.keys(responses),
        type: 'radio',
    }],
});

const createDelayEntity = ({id, time, feedback, frequency}) => ({
    id,
    name: 'Delay',
    parameters: [{
        name: 'Time',
        id: 'time',
        value: time,
    }, {
        name: 'Feedback',
        id: 'feedback',
        value: feedback,
    }, {
        name: 'Frequency',
        id: 'frequency',
        value: frequency,
    }],
});

const createDistortionEntity = ({id, filterType, frequency, strength}) => ({
    id,
    name: 'Distortion',
    parameters: [{
        name: 'Filter Type',
        id: 'filterType',
        value: filterType,
        values: Object.values(FILTER_TYPES),
        type: 'radio',
    }, {
        name: 'Frequency',
        id: 'frequency',
        value: frequency,
    }, {
        name: 'Strength',
        id: 'strength',
        value: strength,
    }],
});


export const generateIdByTitle = title => title.replace(/[^A-Za-z0-9]+/gi, '').toLowerCase();


export const createTrackEntity = ({id, title, volume, muted, bypassFX, fx, state}) => ({
    id,
    title,
    volume,
    state,
    isMuted: muted,
    isEffectsDisabled: bypassFX,
    send: map(send => getNodeParamNormalizedValue(send.gain), fx),
});

export const createEffectEntity = effect => {
    switch (effect.id) { //@TODO: switch to type
        case 'delay': 
            return createDelayEntity(effect);
        case 'distortion':
            return createDistortionEntity(effect);
        case 'reverb':
            return createReverbEntity(effect);
        default:
            return null;
    }
};

export const createPlaybackEntity = ({analyser, status = PLAYBACK_STATUS.PAUSED, currentPosition = 0}) => ({
    analyser,
    status,
    currentPosition,
});