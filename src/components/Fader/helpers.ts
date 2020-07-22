'use strict';


import {min, max} from 'ramda';

/**
 * @returns {number} vertical coordinate from touch or mouse event
 */
export const getY = event => event.touches ? event.touches[0].pageY : event.pageY;

/**
 * @returns {number} horizontal coordinate from touch or move event
 */
export const getX = event => event.touches ? event.touches[0].pageX : event.pageX;

/**
 * @returns {number} relative position in percents
 */
export const getPointerVerticalPosition = (position, {top, bottom, height}) => {
    let value = position;

    if (value < top) value = top;
    if (value > bottom) value = bottom;

    value = bottom - value;

    return value / (height / 100);
};

/**
 * @returns {number} relative position in percents
 */
export const getPointerHorizontalPosition = (position, {width, left}) => {
    let value = position; // max(min(position, left + width), left) - left;

    const rightBorder = left + width;

    if (value > rightBorder) value = rightBorder;
    if (value < left) value = left;

    value = value - left;

    return value / (width / 100);
};