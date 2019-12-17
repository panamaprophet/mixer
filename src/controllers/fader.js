'use strict'


import {min, max} from 'ramda';


const getY = event => event.touches ? event.touches[0].pageY : event.pageY;

const getX = event => event.touches ? event.touches[0].pageX : event.pageX;

const getPointerVerticalPosition = (position, {top, bottom, height}) => {
    const value = bottom - min(min(position, top), bottom);

    return {
        value,
        percentage: value / (height / 100),
    };
};

const getPointerHorizontalPosition = (position, {width, left}) => {
    const value = max(min(position, left + width), left) - left;

    return {
        value,
        percentage: value / (width / 100),
    }
};


class FaderController {
    constructor({
        min = 0,
        max = 0.95,
        step = 0.05,
        value = 0,
        isVertical = false,
        onChange = () => {},
    }, mountPoint) {
        this.min = min;
        this.max = max;
        this.step = step;
        this.value = value;

        this.isVertical = isVertical;
        this.onChange = onChange;

        this.dragStart = this.onMouseDown.bind(this);
        this.drag = this.onMouseMove.bind(this);
        this.dragEnd = this.onMouseUp.bind(this);

        this.el = this.layout();

        if (mountPoint) {
            this.mount(mountPoint);
        }
    }


    get offset() {
        return this.el.getBoundingClientRect()
    }

    setTriggerPosition(position, units = 'px') {
        const el = this.el.querySelector('.input__trigger');

        if (this.isVertical) {
            el.style.bottom = position + units;
        } else {
            el.style.left = position + units;
        }
    }


    onMouseDown(event) {
        event.preventDefault();

        document.documentElement.addEventListener('mousemove', this.drag);
        document.documentElement.addEventListener('mouseup', this.dragEnd);
    }

    onMouseMove(event) {
        event.preventDefault();

        const {offset, isVertical} = this;
        const position = isVertical
            ? getPointerVerticalPosition(getY(event), offset)
            : getPointerHorizontalPosition(getX(event), offset);

        this.setTriggerPosition(position.value);

        this.value = this.max * (position.percentage / 100);
        this.el.setAttribute('data-value', this.value);
        this.onChange(this.value);
    }

    onMouseUp(event) {
        event.preventDefault();

        document.documentElement.removeEventListener('mousemove', this.drag);
        document.documentElement.removeEventListener('mouseup', this.dragEnd);
    }


    layout() {
        let element = document.createElement('div')
        let elementTrigger = document.createElement('div')

        element.appendChild(elementTrigger)
        element.classList.add('input', 'input--range', 'fader__control')

        const initialTriggerPositionInPercent = this.value / (this.max / 100);

        setTriggerPosition(initialTriggerPositionInPercent, '%');

        if (!this.isVertical) {
            element.classList.add('fader__control--horizontal')
        }


        elementTrigger.classList.add('input__trigger', 'fader__control-value')

        element.setAttribute('data-min', this.min)
        element.setAttribute('data-max', this.max)
        element.setAttribute('data-value', this.value)
        element.setAttribute('data-step', this.step)

        element.querySelector('.input__trigger').addEventListener('ontouchstart' in window ? 'touchstart' : 'mousedown', this.dragStart)

        return element
    }

    mount(mountPoint) {

        let mp = (typeof mountPoint === 'string') ? document.querySelector(mountPoint) : mountPoint

        if (mp) {
            mp.appendChild(this.el)
        }
    }

    animateTo(value) {

        this.value = value


        let trigger = this.el.querySelector('.fader__control-value')

        trigger.addEventListener('transitionend', e => {
            trigger.classList.remove('fader__control-value--animated')
        })

        trigger.classList.add('fader__control-value--animated')

        trigger.style.bottom = (this.value / this.max * 100) + '%';
    }
}


export default FaderController