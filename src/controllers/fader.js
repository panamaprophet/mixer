'use strict'


class FaderController {

	constructor(options, mountPoint){

		this.min = options.min || 0
		this.max = options.max || 0.95
		this.step = options.step || 0.05
		this.value = options.value || 0

		this.isVertical = options.vertical || false

		this.onChange = options.onChange || null


		this.dragStart = this.onMouseDown.bind(this)
		this.drag = this.onMouseMove.bind(this)
		this.dragEnd = this.onMouseUp.bind(this)


		this.el = this.layout()

		if (mountPoint) {
			this.mount(mountPoint)
		}
	}


	get offset(){

		return this.el.getBoundingClientRect()
	}


	onMouseDown(event){

		event.preventDefault()

		document.documentElement.addEventListener('ontouchstart' in window ? 'touchmove' : 'mousemove', this.drag)
		document.documentElement.addEventListener('ontouchstart' in window ? 'touchend' : 'mouseup', this.dragEnd)

		return false
	}

	onMouseMove(event){

		event.preventDefault()

		let trigger = this.el.querySelector('.input__trigger')
		let offset = this.offset
		let percentage = 0

		if (this.isVertical){

			let y = event.touches ? event.touches[0].pageY : event.pageY


			if (y < offset.top) {
				y = offset.top
			}

			if (y > offset.bottom) {
				y = offset.bottom
			}


			trigger.style.bottom = (offset.bottom - y) + 'px'

			percentage = (offset.bottom - y) / (offset.height / 100)

		} else {

			let x = event.touches ? event.touches[0].pageX : event.pageX
			let rightBorder = offset.left + offset.width


			if (x > rightBorder) {
				x = rightBorder
			}

			if (x < offset.left){
				x = offset.left
			}

			trigger.style.left = (x - offset.left) + 'px'

			percentage = (x - offset.left) / (offset.width / 100)

		}

		this.value = this.max * (percentage / 100)

		this.el.setAttribute('data-value', this.value)


		if (typeof this.onChange === 'function') {

			this.onChange(this.value)
		}
	}

	onMouseUp(){

		document.documentElement.removeEventListener('ontouchstart' in window ? 'touchmove' : 'mousemove', this.drag)
		document.documentElement.removeEventListener('ontouchstart' in window ? 'touchend' : 'mouseup', this.dragEnd)
	}


	layout(){

		let element = document.createElement('div')
		let elementTrigger = document.createElement('div')

		element.appendChild(elementTrigger)
		element.classList.add('input', 'input--range', 'fader__control')


		if (!this.isVertical) {

			element.classList.add('fader__control--horizontal')
			elementTrigger.style.left = this.value / (this.max / 100) + '%'

		} else {

			elementTrigger.style.bottom = this.value / (this.max / 100) + '%'

		}


		elementTrigger.classList.add('input__trigger', 'fader__control-value')

		element.setAttribute('data-min', this.min)
		element.setAttribute('data-max', this.max)
		element.setAttribute('data-value', this.value)
		element.setAttribute('data-step', this.step)

		element.querySelector('.input__trigger').addEventListener('ontouchstart' in window ? 'touchstart' : 'mousedown', this.dragStart)

		return element
	}

	mount(mountPoint){

		let mp = (typeof mountPoint === 'string') ? document.querySelector(mountPoint) : mountPoint

		if (mp) {
			mp.appendChild(this.el)
		}
	}

	animateTo(value){

		this.value = value


		let trigger = this.el.querySelector('.fader__control-value')

		trigger.addEventListener('transitionend', e => { trigger.classList.remove('fader__control-value--animated') })

		trigger.classList.add('fader__control-value--animated')

		trigger.style.bottom = (this.value / this.max * 100) + '%'
	}
}


export default FaderController