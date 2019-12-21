import {
    getNodeParamNormalizedValue,
} from '/helpers/node';

import {
    PLAYBACK_STATUS,
} from '/constants';


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
    }, {
        name: 'Frequency',
        id: 'distFrequency',
        value: frequency,
    }, {
        name: 'Strength',
        id: 'strength',
        value: strength,
    }],
});

export const generateIdByTitle = title => title.replace(/[^A-Za-z]+/gi, '').toLowerCase();

export const createTrackEntity = ({id, title, volume, muted, bypassFX, fx}) => ({
    id,
    title,
    volume,
    isMuted: muted,
    isEffectsDisabled: bypassFX,
    send: {
        delay: getNodeParamNormalizedValue(fx.delay.gain),
        reverb: getNodeParamNormalizedValue(fx.reverb.gain),
        distortion: getNodeParamNormalizedValue(fx.distortion.gain),
    },
});

/**
 * 
 * @param {Effect} effect 
 */
export const createEffectEntity = effect => {
    switch (effect.id) { //@TODO: switch to type
        case 'delay': 
            return createDelayEntity(effect);
        case 'distortion':
            return createDistortionEntity(effect);
        default:
            return null;
    }
};

export const createPlaybackEntity = ({analyser, status = PLAYBACK_STATUS.PAUSED, currentPosition = 0}) => ({
    analyser,
    status,
    currentPosition,
});