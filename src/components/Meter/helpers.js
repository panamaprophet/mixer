import {converge, divide, sum, length} from 'ramda';


const COLOR_GREEN = '#05860f';
const COLOR_YELLOW = '#f9ef5c';
const COLOR_RED = '#861615';

/**
 * @param {AudioContext} context
 * @param {Canvas} canvas
 * @returns {CanvasGradient}
 */
export const createMeterGradient = (context, {
    width,
    height,
}) => {
    const gradient = context.createLinearGradient(0, 0, width, height);

    gradient.addColorStop(0.0, COLOR_GREEN);
    gradient.addColorStop(0.8, COLOR_YELLOW);
    gradient.addColorStop(0.9, COLOR_RED);

    return gradient;
}

export const getAverage = converge(divide, [sum, length]);