'use strict';

import {
    getNodeParamNormalizedValue,
} from '/helpers/node';

import {
    STRENGTH_MIN,
    STRENGTH_MAX,
} from './constants';

import FX from './fx-base';


const strengthToNode = value => ({
    maxValue: STRENGTH_MAX,
    minValue: STRENGTH_MIN,
    value,
});


export default class Distortion extends FX {
    constructor(context, masterBus) {
        super({
            context,
            masterBus,
            id: 'distortion',
        });

        this._strength = 200;

        this.addNode(context.createBiquadFilter(), {
            type: 'highpass',
            frequency: 138,
            Q: 1
        })

        this.addNode(context.createWaveShaper(), {
            curve: this.getCurve(this._strength),
            oversample: '4x'
        })
    }

    set filterType(value) {
        this.tweakNode(0, 'type', value)
    }

    get filterType() {
        return this.chain[0].type;
    }

    set frequency(value) {
        this.tweakNode(0, 'frequency', value)
    }

    get frequency() {
        return getNodeParamNormalizedValue(this.chain[0].frequency);
    }

    set strength(value) {
        this._strength = value
        this.tweakNode(1, 'curve', this.getCurve(value))
    }

    get strength() {
        return getNodeParamNormalizedValue(strengthToNode(this._strength));
    }

    getCurve(strength) {
        var k = typeof strength === 'number' ? strength : 50,
            n_samples = 44100,
            curve = new Float32Array(n_samples),
            deg = Math.PI / 180,
            i = 0,
            x

        for (; i < n_samples; ++i) {
            x = i * 2 / n_samples - 1
            curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x))
        }

        return curve
    }
}