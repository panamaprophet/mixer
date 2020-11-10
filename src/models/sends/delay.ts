import {getNodeParamNormalizedValue} from '/helpers/node';
import {SendBase} from './sendBase';


const DEFAULT_FEEDBACK = 80;
const DEFAULT_TIME = 25;
const DEFAULT_FREQUENCY = 5; // 1120 of 20000 in percents

export class Delay extends SendBase {
    constructor(context: AudioContext, masterBus: GainNode) {
        super({context, masterBus, id: 'delay'});

        this.addNode(context.createDelay(), {delayTime: DEFAULT_TIME});
        this.addNode(context.createGain(), {gain: DEFAULT_FEEDBACK});
        this.addNode(context.createBiquadFilter(), {frequency: DEFAULT_FREQUENCY});

        this.loop = true;
    }

    set time(value: number) {
        this.updateNode(0, {delayTime: value});
    }

    get time(): number {
        const node = this.chain[0] as DelayNode;

        return getNodeParamNormalizedValue(node.delayTime);
    }

    set feedback(value: number) {
        this.updateNode(1, {gain: value});
    }

    get feedback(): number {
        const node = this.chain[1] as GainNode;

        return getNodeParamNormalizedValue(node.gain);
    }

    set frequency(value: number) {
        this.updateNode(2, {frequency: value});
    }

    get frequency(): number {
        const node = this.chain[2] as BiquadFilterNode;

        return getNodeParamNormalizedValue(node.frequency);
    }
}