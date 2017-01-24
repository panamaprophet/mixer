'use strict'


import FX from './fx-base'


class Distortion extends FX {

	constructor(context, masterBus){

		super(context, masterBus)


		this.ident = 'distortion'
		this._strength = 200


		this.addNode(context.createBiquadFilter(), {
			type : 'highpass',
			frequency : 138,
			Q : 1
		})

		this.addNode(context.createWaveShaper(), {
			curve : this.getCurve(this._strength),
			oversample : '4x'
		})
	}

	set filterType(value){

		this.tweakNode(0, 'type', value)
	}

	set frequency(value){

		this.tweakNode(0, 'frequency', value)
	}

	set strength(value){

		this._strength = value
		this.tweakNode(1, 'curve', this.getCurve(value))
	}

	getCurve(strength){

		var k = typeof strength === 'number' ? strength : 50,
			n_samples = 44100,
			curve = new Float32Array(n_samples),
			deg = Math.PI / 180,
			i = 0,
			x

		for ( ; i < n_samples; ++i ) {
			x = i * 2 / n_samples - 1
			curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) )
		}

		return curve
	}
}


export default Distortion