'use strict'

import {
	reduce
} from 'ramda';

import TrackController from './track'
import FaderController from './fader'

import MixerTemplate from '/views/mixer'
import Mixer from '/models/mixer'


const COLOR_GREEN = '#05860f';
const COLOR_YELLOW = '#f9ef5c';
const COLOR_RED = '#861615';

/**
 * @param {AudioContext} context
 * @param {Canvas} canvas
 * @returns {CanvasGradient}
 */
const createMeterGradient = (context, {
	width,
	height
}) => {
	const gradient = context.createLinearGradient(0, 0, width, height);

	gradient.addColorStop(0.0, COLOR_GREEN);
	gradient.addColorStop(0.8, COLOR_YELLOW);
	gradient.addColorStop(0.9, COLOR_RED);

	return gradient;
}

/**
 * @param {Number[]} items
 * @returns {Number}
 */
const getAverage = items => reduce((acc, item) => acc += item, 0, items) / items.length;



class MixerController {

	constructor(sources, mountPoint) {
		this.mixer = new Mixer(sources, this.enablePlayback.bind(this))
		this.tracks = []
		this.mountPoint = (typeof mountPoint === 'string') ? document.querySelector(mountPoint) : mountPoint
		this.template = document.createElement('template') //document.querySelector(template || '#desk')
		this.template.innerHTML = MixerTemplate
		this._fillStyle = null

		this.bootstrap()
	}

	get canvas() {
		return this.mountPoint.querySelector('[data-name="master-level"]')
	}

	get context() {
		return this.canvas.getContext('2d');
	}

	get fillStyle() {
		this._fillStyle = this._fillStyle || createMeterGradient(this.context, this.canvas);

		return this._fillStyle;
	}


	bootstrap() {
		let tracks = this.buildTracks()
		let mixer = this.buildMixer()

		mixer.querySelector('[data-name="tracks"]').appendChild(tracks)

		let mountPoint = this.mountPoint

		while (mountPoint.firstChild) {
			mountPoint.removeChild(mountPoint.firstChild)
		}

		mountPoint.appendChild(mixer)

		this.drawMeter()
	}

	buildTracks() {

		let wrapper = document.createDocumentFragment()

		this.tracks = this.mixer.tracks.map(track => new TrackController({
			track: track,
			mountPoint: wrapper
		}))

		return wrapper
	}

	buildMixer() {
		let template = this.template
		let element = document.importNode(template.content, true)

		element.querySelector('[data-name="play"]').addEventListener('click', this.mixer.play.bind(this.mixer))
		element.querySelector('[data-name="pause"]').addEventListener('click', this.mixer.pause.bind(this.mixer))
		element.querySelector('[data-name="rewind"]').addEventListener('click', this.mixer.rewind.bind(this.mixer))


		let effects = element.querySelectorAll('[data-type="fader"]')

		for (let i = 0; i < effects.length; i++) {

			let effect = effects[i]
			let param = effect.getAttribute('data-param')
			let paramChain = param.split('.')

			let effectInput = new FaderController({
				min: 0,
				max: effect.getAttribute('data-max'),
				step: effect.getAttribute('data-step'),
				value: effect.getAttribute('data-value'),
				onChange: (value) => {
					let fx = this.mixer.fx.filter(fx => paramChain[0] === fx.id)[0]

					if (fx) {
						fx[paramChain[1]] = value
					}
				}

			}, effect)
		}

		return element
	}

	drawMeter() {
		let canvas = this.canvas
		let context = this.context
		let analyser = this.mixer.analyser

		let array = new Uint8Array(analyser.frequencyBinCount)

		analyser.getByteFrequencyData(array);

		const average = getAverage(array);

		context.clearRect(0, 0, canvas.width, canvas.height)
		context.fillStyle = this.fillStyle;
		context.fillRect(0, 0, (canvas.width / 100) * average, canvas.height);

		requestAnimationFrame(this.drawMeter.bind(this));
	}

	enablePlayback(tracks) {
		const controls = this.mountPoint.querySelectorAll('.desk__control');

		controls.forEach(control => control.removeAttribute('disabled'));

		console.log('Tracks %o loaded', tracks);
	}
}


export default MixerController