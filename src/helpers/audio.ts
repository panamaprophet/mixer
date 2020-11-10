import {keys, is} from 'ramda';


export enum ContextState {
    RUNNING = 'running',
    SUSPENDED = 'suspended',
}


export const createContext = (): AudioContext => new (window.AudioContext || window.webkitAudioContext)();

export const createMasterBus = (context: AudioContext, connections: AudioNode[] = []): GainNode => {
    const gain = context.createGain();

    gain.connect(context.destination);
    connections.map(connection => gain.connect(connection));

    return gain;
};

export const createAnalyser = (context: AudioContext, parameters = {fftSize: 2048}): AnalyserNode => {
    const analyser = context.createAnalyser();

    keys(parameters).map(key => analyser[key] = parameters[key]);

    return analyser;
};

export const createPanner = (context: AudioContext): StereoPannerNode => context.createStereoPanner();

export const isAudioParam = is(AudioParam); // <T>(value: T): boolean => value instanceof AudioParam;

export const fetchAudioAsArrayBuffer = (url: string): Promise<ArrayBuffer> => fetch(url).then(response => response.arrayBuffer());

export const isContextRunning = (context: AudioContext): boolean => context.state === ContextState.RUNNING;

export const resumeContext = (context: AudioContext): Promise<void> => context.resume();

