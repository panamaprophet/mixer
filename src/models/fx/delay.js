'use strict'


import FX from './fx-base'


class Delay extends FX {

	constructor(context, masterBus){

		super(context, masterBus)


		this.ident = 'delay'


		this.addNode(context.createDelay(), { delayTime : 0.25 })			// 0
		this.addNode(context.createGain(), { gain : 0.8 })					// 1
		this.addNode(context.createBiquadFilter(), { frequency: 1120 })		// 2

		this.loop()
	}

	set time(value){

		this.tweakNode(0, 'delayTime', value)
	}

	set feedback(value){

		this.tweakNode(1, 'gain', value)
	}

	set frequency(value){

		this.tweakNode(2, 'frequency', value)
	}
}


export default Delay