'use strict';


import React, {useRef} from 'react';

import FaderThumb from './FaderThumb';

import {
    getX,
    getY,
    getPointerVerticalPosition,
    getPointerHorizontalPosition,
} from './helpers';


const Fader = ({
    position = 0,
    isVertical = false, 
    onChange = () => {},
}) => {
    const containerRef = useRef(null);

    const onMoveStart = event => {
        event.preventDefault();

        document.documentElement.addEventListener('mousemove', onMove);
        document.documentElement.addEventListener('mouseup', onMoveEnd);
    }

    const onMove = event => {
        event.preventDefault();

        const containerElement = containerRef.current;
        const offset = containerElement.getBoundingClientRect();

        const position = isVertical
            ? getPointerVerticalPosition(getY(event), offset)
            : getPointerHorizontalPosition(getX(event), offset);

        onChange(position);
    }

    const onMoveEnd = event => {
        event.preventDefault();

        document.documentElement.removeEventListener('mousemove', onMove);
        document.documentElement.removeEventListener('mouseup', onMoveEnd);
    }

    const className = ['fader', isVertical ? 'fader-vertical' : 'fader-horizontal'].join(' ');

    return (
        <div className={className} ref={containerRef}>
            <FaderThumb position={position} events={{onMouseDown: onMoveStart}} isVertical={isVertical} />
        </div>
    );
};

export default Fader;