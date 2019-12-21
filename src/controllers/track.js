'use strict'

import FaderController from './fader'
import TrackTemplate from '../views/track'

class TrackController {

	constructor(options) {

		this.track = options.track
		this.mountPoint = options.mountPoint

		this.template = document.createElement('template')
		this.template.innerHTML = TrackTemplate


		this.el = this.layout()
	}

	layout() {

		let track = this.track
		let element = document.importNode(this.template.content, true)


		element.querySelector('[data-name="title"]').textContent = track.title


		element.querySelector('[data-name="mute"]').addEventListener('click', e => {
			track.toggleMute()
			e.currentTarget.classList.toggle('button--pressed', track.muted)
		})


		element.querySelector('[data-name="bypass"]').addEventListener('click', e => {
			track.toggleFX()
			e.currentTarget.classList.toggle('button--pressed', track.bypassFX)
		})



		let fader = element.querySelector('[data-name="fader"]')

		let faderView = new FaderController({
			min: 0,
			max: 1,
			step: 0.05,
			value: track.ready ? 1 : 0,
			vertical: true,
			onChange: function(value) {
				track.volume = value
			}
		}, fader)


		if (!track.ready) {

			track.onReady = function(track) {
				faderView.animateTo(1)
			}

		}



		let faders = element.querySelectorAll('[data-type="fader"]')

		for (let i = 0; i < faders.length; i++) {

			let fxIdent = faders[i].getAttribute('data-fx')

			let fader = new FaderController({
				min: 0,
				max: 0.95,
				value: 0,
				step: 0.05,
				onChange: function(value) {
					track.fx[fxIdent].gain.value = value
				}
			}, faders[i])
		}



		if (this.mountPoint) {
			this.mountPoint.appendChild(element)
		}

		return element
	}
}


export default TrackController