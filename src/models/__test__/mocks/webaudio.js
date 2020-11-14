/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-classes-per-file */


export class AudioNodeMock {
    connect() {}
    disconnect() {}
}

export class AudioParamMock extends AudioNodeMock {
    constructor() {
        super();

        this.maxValue = 100;
        this.minValue = 0;
        this.value = 1;
        this.defaultValue = 1;
    }
}

export class AnalyserMock extends AudioNodeMock {}

export class BiquadFilterMock extends AudioNodeMock {
    constructor() {
        super();

        this.frequency = new AudioParamMock();
    }
}

export class ConvolverMock extends AudioNodeMock {}

export class WaveShaperMock extends AudioNodeMock {}

export class GainMock extends AudioNodeMock {
    constructor() {
        super();

        this.gain = new AudioParamMock();
        this.gain.value = 1;
    }
}

export class DelayMock extends AudioNodeMock {
    constructor() {
        super();
    }
}

export class StereoPannerMock extends AudioNodeMock {
    constructor() {
        super();

        this.pan = new AudioParamMock();
        this.pan.value = 0;
    }
}

export class AudioBufferSourceNodeMock extends AudioNodeMock {
    start() {}
    stop() {}
}

export class AudioContextMock {
    constructor() {

    }
    createAnalyser() {
        return new AnalyserMock();
    }
    createGain() {
        return new GainMock();
    }
    createDelay() {
        return new DelayMock();
    }
    createBiquadFilter() {
        return new BiquadFilterMock();
    }
    createConvolver() {
        return new ConvolverMock();
    }
    createWaveShaper() {
        return new WaveShaperMock();
    }
    decodeAudioData() {
        return Promise.resolve();
    }
    resume() {
        return Promise.resolve();
    }
    createBufferSource() {
        return new AudioBufferSourceNodeMock();
    }
    createStereoPanner() {
        return new StereoPannerMock();
    }
}
