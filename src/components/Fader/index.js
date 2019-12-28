'use strict';


import React, {useRef} from 'react';
import classnames from 'classnames';

import FaderThumb from './FaderThumb';

import {
    getX,
    getY,
    getPointerVerticalPosition,
    getPointerHorizontalPosition,
} from './helpers';

import style from './style.css';


const EVENTS_MAP = {
    'mousemove': 'touchmove',
    'mouseup': 'touchend',
    'mousedown': 'touchstart',
};

const hasTouchEventsSupport = () => 'ontouchstart' in window;

const getEventNameByFeature = eventName => hasTouchEventsSupport() ? EVENTS_MAP[eventName] : eventName;


const Fader = ({
    value = 0,
    isVertical = false,
    onChange = () => {},
}) => {
    const containerRef = useRef(null);

    const onMoveStart = event => {
        event.preventDefault();

        document.documentElement.addEventListener(getEventNameByFeature('mousemove'), onMove);
        document.documentElement.addEventListener(getEventNameByFeature('mouseup'), onMoveEnd);

        return false;
    }

    const onMove = event => {
        event.preventDefault();

        const containerElement = containerRef.current;
        const offset = containerElement.getBoundingClientRect();
        const x = getX(event) - document.documentElement.scrollLeft;
        const y = getY(event) - document.documentElement.scrollTop;

        const newValue = isVertical
            ? getPointerVerticalPosition(y, offset)
            : getPointerHorizontalPosition(x, offset);

        onChange(newValue);

        return false;
    }

    const onMoveEnd = event => {
        event.preventDefault();

        document.documentElement.removeEventListener(getEventNameByFeature('mousemove'), onMove);
        document.documentElement.removeEventListener(getEventNameByFeature('mouseup'), onMoveEnd);

        return false;
    }
    
    const thumbEventName = hasTouchEventsSupport() ? 'onTouchStart' : 'onMouseDown';

    return (
        <div className={classnames(style.fader, !isVertical && style.isHorisontal)} ref={containerRef}>
            <div className={style.control}>
                <FaderThumb position={value} events={{[thumbEventName]: onMoveStart}} isVertical={isVertical} />
            </div>
        </div>
    );
};

export default Fader;