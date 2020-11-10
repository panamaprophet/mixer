import {getNodeParamNormalizedValue} from '/helpers/node';
import {SendBase} from './sendBase';


const DEFAULT_STRENGTH = 200;

const MAX_STRENGTH = 1000;


export class Distortion extends SendBase {
    #strength = DEFAULT_STRENGTH;

    constructor(context: AudioContext, masterBus: GainNode) {
        super({context, masterBus, id: 'distortion'});

        this.addNode(context.createBiquadFilter(), {type: 'highpass', frequency: 138, Q: 1});
        this.addNode(context.createWaveShaper(), {curve: this.curve, oversample: '4x'});
    }

    set filterType(value: BiquadFilterType) {
        this.updateNode(0, {type: value});
    }

    get filterType(): BiquadFilterType {
        const node = this.chain[0] as BiquadFilterNode;

        return node.type;
    }

    set frequency(value: number) {
        this.updateNode(0, {frequency: value});
    }

    get frequency(): number {
        const node = this.chain[0] as BiquadFilterNode;

        return getNodeParamNormalizedValue(node.frequency);
    }

    set strength(value: number) {
        this.#strength = value;

        this.updateNode(1, {curve: this.curve});
    }

    get strength(): number {
        return this.#strength / (MAX_STRENGTH / 100);
    }

    get curve(): Float32Array {
        const k = this.#strength;
        const n_samples = 44100;
        const deg = Math.PI / 180;
        const result = new Float32Array(n_samples);

        for (let i = 0; i < n_samples; ++i) {
            const x = i * 2 / n_samples - 1
            result[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x))
        }

        return result;
    }
}