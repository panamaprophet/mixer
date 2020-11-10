import type {Delay} from './delay';
import type {Reverb} from './reverb';
import type {Distortion} from './distortion';

export * from './reverb';
export * from './delay';
export * from './distortion';


export type SendId = string;

export type SendParamValue = number | string | Float32Array | AudioBuffer | BiquadFilterType;

export type Send = Reverb | Delay | Distortion;

export type SendConstructor = new (context: AudioContext, masterBus: GainNode) => Send;