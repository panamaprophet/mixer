'use strict';

import FX from './fx-base';

export default class Delay extends FX {
	constructor(context, masterBus) {
		super({
			context,
			masterBus,
			id: 'delay',
		});

		this.addNode(context.createDelay(), {
			delayTime: 0.25,
		});

		this.addNode(context.createGain(), {
			gain: 0.8,
		});

		this.addNode(context.createBiquadFilter(), {
			frequency: 1120,
		});

		this.loop = true;
	}

	set time(value) {
		this.tweakNode(0, 'delayTime', value);
	}

	set feedback(value) {
		this.tweakNode(1, 'gain', value);
	}

	set frequency(value) {
		this.tweakNode(2, 'frequency', value);
	}
}