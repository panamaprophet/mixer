'use strict';

import {
    getNodeParamNormalizedValue,
} from '/helpers/node';

import FX from './fx-base';


const DEFAULT_FEEDBACK = 0.8;
const DEFAULT_TIME = 0.25;
const DEFAULT_FREQUENCY = 1120;

export default class Delay extends FX {
    constructor(context, masterBus) {
        super({
            context,
            masterBus,
            id: 'delay',
        });

        this.addNode(context.createDelay(), {
            delayTime: DEFAULT_TIME,
        });

        this.addNode(context.createGain(), {
            gain: DEFAULT_FEEDBACK,
        });

        this.addNode(context.createBiquadFilter(), {
            frequency: DEFAULT_FREQUENCY,
        });

        this.loop = true;
    }

    set time(value) {
        this.tweakNode(0, 'delayTime', value);
    }

    get time() {
        return getNodeParamNormalizedValue(this.chain[0].delayTime);
    }

    set feedback(value) {
        this.tweakNode(1, 'gain', value);
    }

    get feedback() {
        return getNodeParamNormalizedValue(this.chain[1].gain);
    }

    set frequency(value) {
        this.tweakNode(2, 'frequency', value);
    }

    get frequency() {
        return getNodeParamNormalizedValue(this.chain[2].frequency);
    }
}