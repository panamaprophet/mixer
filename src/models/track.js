'use strict'


class Track {

	constructor(url, title, context, masterBus){

		this.source = null
		this.buffer = null

		this.title = title
		this.context = context

		this.pausedAt = 0
		this.startedAt = 0

		this.muted = false
		this.playing = false
		this.ready = false
		this.bypassFX = false

		this.fx = {}


		this.bus = context.createGain()
		this.bus.gain.value = 1
		this.bus.connect(masterBus)

		this.loadingState = this.load(url)
	}


	get volume(){

		return this.bus.gain.value
	}

	set volume(value){

		this.muted ? (this.previousVolume = value) : (this.bus.gain.value = value)
	}


	load(url){

		return new Promise((resolve, reject) => {

			let context = this.context
			let xhr = new XMLHttpRequest()
			let callback = this.onLoad.bind(this)

			xhr.open('GET', url, true)
			xhr.responseType = 'arraybuffer'

			xhr.onload = () => {
				context.decodeAudioData(xhr.response, (buffer) => {
					callback(buffer)
					resolve(this)
				})
			}

			xhr.onabort = reject
			xhr.onerror = reject

			xhr.send()

		})
	}

	onLoad(buffer){

		this.buffer = buffer
		this.ready = true

		if (typeof this.onReady === 'function') {
			this.onReady(this)
		}

		console.log('Track "%s" is ready', this.title)
	}


	play(){

		if (this.playing) {
			return false
		}

		this.source = this.context.createBufferSource()
		this.source.buffer = this.buffer
		this.source.connect(this.bus)
		this.source.start(0, this.pausedAt)

		this.startedAt = this.context.currentTime - this.pausedAt
		this.pausedAt = 0
		this.playing = true
	}

	pause(){

		let elapsed = this.context.currentTime - this.startedAt

        this.stop()

        this.pausedAt = elapsed
	}

	stop(){

		if (this.source) {
			this.source.disconnect()
			this.source.stop(0)
			this.source = null
		}

		this.pausedAt = 0
		this.startedAt = 0
		this.playing = false
	}


	mute(){

		this.previousVolume = this.volume
		this.volume = 0
		this.muted = true
	}

	unmute(){

		this.muted = false
		this.volume = this.previousVolume
	}

	toggleMute(){

		this.muted ? this.unmute() : this.mute()
	}


	addFX(fx, name){

		let fxName = name || fx.ident

		if (!this.fx[fxName]){

			let bus = this.context.createGain()

			this.bus.connect(bus)

			bus.gain.value = 0
			bus.connect(fx.signalIn)

			this.fx[fxName] = bus

			return bus
		}

		return false
	}

	removeFX(){

		this.fx[name].disconnect()
	}

	toggleFX(){

		let fxNames = Object.keys(this.fx)

		if (this.bypassFX) {

			fxNames.forEach(fxName => {
				this.fx[fxName].gain.value = this.fx[fxName].previousVolume
			})

		} else {

			fxNames.forEach(fxName => {
				this.fx[fxName].previousVolume = this.fx[fxName].gain.value
				this.fx[fxName].gain.value = 0
			})

		}

		this.bypassFX = !this.bypassFX
	}
}


export default Track