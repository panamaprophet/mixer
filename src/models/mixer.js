'use strict'


import * as FX from './fx'
import Track from './track'


class Mixer {

	constructor(sources, onReady){

		this.context = new (window.AudioContext || window.webkitAudioContext)()

		this.analyser = this.context.createAnalyser()
		this.analyser.fftSize = 2048

		this.masterBus = this.context.createGain()
		this.masterBus.connect(this.context.destination)
		this.masterBus.connect(this.analyser)


		this.fx = [ 'Distortion', 'Reverb', 'Delay' ].map(ClassName => new FX[ClassName](this.context, this.masterBus))


		let promises = []

		this.tracks = sources.map(source => {

			let track = new Track(source.url, source.title, this.context, this.masterBus)

			promises.push(track.loadingState)

			this.fx.forEach(fx => { track.addFX(fx) })

			return track
		})

		if (typeof onReady === 'function') {
			Promise.all(promises).then(onReady)
		}
	}

	play(){

		this.tracks.forEach(track => track.play())
	}

	pause(){

		this.tracks.forEach(track => track.pause())
	}

	rewind(){

		this.tracks.forEach(track => {
			track.stop()
			track.play()
		})
	}
}


export default Mixer