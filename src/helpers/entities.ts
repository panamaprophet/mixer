import type {Track, TrackId, TrackState} from '../models/track';
import {Delay, Distortion, Reverb, Send, SendId, SendParamValue} from '/models/sends/index';
import {Playback, PlaybackStatus} from './playback';
import {getNodeParamNormalizedValue} from './node';


export type SendParameterId = string;

export enum SendParameterType {
    RADIO = 'radio',
    FADER = 'fader',
    UNKNOWN = 'unknown',
}

export type SendParameter = {
    id: SendParameterId,
    name: string,
    value: SendParamValue,
    values?: SendParamValue[],
    type: SendParameterType,
}

export type SendEntity = {
    id: SendId,
    name: string,
    parameters: SendParameter[],
}

export type TrackEntity = {
    id: TrackId,
    title: string,
    volume: number,
    state: TrackState,
    isMuted: boolean,
    isSendsEnabled: boolean,
    send: Record<SendId, number>,
}

const FilterTypes: BiquadFilterType[] = ['highpass', 'lowpass', 'bandpass'];


const createReverbEntity = ({id, responses, currentResponse}: Reverb): SendEntity => ({
    id,
    name: 'Reverb',
    parameters: [{
        name: 'Response',
        id: 'currentResponse',
        value: currentResponse,
        values: Object.keys(responses),
        type: SendParameterType.RADIO,
    }],
});

const createDelayEntity = ({id, time, feedback, frequency}: Delay): SendEntity => ({
    id,
    name: 'Delay',
    parameters: [{
        name: 'Time',
        id: 'time',
        value: time,
        type: SendParameterType.FADER,
    }, {
        name: 'Feedback',
        id: 'feedback',
        value: feedback,
        type: SendParameterType.FADER,
    }, {
        name: 'Frequency',
        id: 'frequency',
        value: frequency,
        type: SendParameterType.FADER,
    }],
});

const createDistortionEntity = ({id, filterType, frequency, strength}: Distortion): SendEntity => ({
    id,
    name: 'Distortion',
    parameters: [{
        name: 'Filter Type',
        id: 'filterType',
        value: filterType,
        values: FilterTypes,
        type: SendParameterType.RADIO,
    }, {
        name: 'Frequency',
        id: 'frequency',
        value: frequency,
        type: SendParameterType.FADER,
    }, {
        name: 'Strength',
        id: 'strength',
        value: strength,
        type: SendParameterType.FADER,
    }],
});

export const generateIdByTitle = (title: string): TrackId => title.replace(/[^A-Za-z0-9]+/gi, '').toLowerCase();

export const createTrackEntity = ({id, title, volume, isMuted, isSendsEnabled, sends, state}: Track): TrackEntity => {
    const sendIds: SendId[] = Object.keys(sends);

    const send = sendIds.reduce((result, sendId) => {
        result[sendId] = getNodeParamNormalizedValue(sends[sendId].gain);

        return result;
    }, {});

    return {
        id,
        title,
        volume,
        state,
        isMuted,
        isSendsEnabled,
        send,
    }
}

export const createSendEntity = (send: Send): SendEntity | null => {
    if (send instanceof Delay) {
        return createDelayEntity(send);
    }

    if (send instanceof Reverb) {
        return createReverbEntity(send);
    }

    if (send instanceof Distortion) {
        return createDistortionEntity(send);
    }

    return null;
};

export const createPlaybackEntity = ({
    analyser,
    status = PlaybackStatus.NOT_SET,
    currentPosition = 0,
}: {
    analyser: AnalyserNode,
    status?: PlaybackStatus,
    currentPosition?: number,
}): Playback => ({
    analyser,
    status,
    currentPosition,
});