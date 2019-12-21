'use strict';


import {min, max} from 'ramda';


/**
 * @typedef {Object} PointerPosition
 * @property {number} value - absolute value in pixels
 * @property {number} percentage - relative value in percents
 */


/**
 * @returns {number} vertical coordinate from touch or mouse event
 */
export const getY = event => event.touches ? event.touches[0].pageY : event.pageY;

/**
 * @returns {number} horizontal coordinate from touch or move event
 */
export const getX = event => event.touches ? event.touches[0].pageX : event.pageX;

/**
 * @returns {PointerPosition}
 */
export const getPointerVerticalPosition = (position, {top, bottom, height}) => {
    const value = bottom - min(min(position, top), bottom);

    return {
        value,
        percentage: value / (height / 100),
    };
};

/**
 * @returns {PointerPosition}
 */
export const getPointerHorizontalPosition = (position, {width, left}) => {
    const value = max(min(position, left + width), left) - left;

    return {
        value,
        percentage: value / (width / 100),
    }
};