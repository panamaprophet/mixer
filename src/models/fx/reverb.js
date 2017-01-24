'use strict'


import FX from './fx-base'


class Reverb extends FX {

	constructor(context, masterBus){

		super(context, masterBus)


		this.ident = 'reverb'


		this.addNode(context.createConvolver())

		this.responseUrl = 'assets/audio/reverb-impulse-response.wav'

		this.loadResponse()
	}

	loadResponse(){

		let xhr = new XMLHttpRequest()

		xhr.onload = () => { this.context.decodeAudioData(xhr.response, buffer => { this.tweakNode(0, 'buffer', buffer) }) }
		xhr.open('GET', this.responseUrl, true)
		xhr.responseType = 'arraybuffer'
		xhr.send()
	}
}


export default Reverb