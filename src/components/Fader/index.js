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


const Fader = ({
    value = 0,
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

        const value = isVertical
            ? getPointerVerticalPosition(getY(event), offset)
            : getPointerHorizontalPosition(getX(event), offset);

        onChange(value);
    }

    const onMoveEnd = event => {
        event.preventDefault();

        document.documentElement.removeEventListener('mousemove', onMove);
        document.documentElement.removeEventListener('mouseup', onMoveEnd);
    }

    return (
        <div className={classnames(style.fader, !isVertical && style.isHorisontal)} ref={containerRef}>
            <div className={style.control}>
                <FaderThumb position={value} events={{onMouseDown: onMoveStart}} isVertical={isVertical} />
            </div>
        </div>
    );
};

export default Fader;