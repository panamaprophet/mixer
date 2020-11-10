import {converge, divide, sum, length} from 'ramda';


const LEVEL_LOW = '#05860f';

const LEVEL_MIDDLE = '#f9ef5c';

const LEVEL_HIGH = '#861615';


/**
 * @param {AudioContext} context
 * @param {Canvas} canvas
 * @returns {CanvasGradient}
 */
export const createMeterGradient = (context: CanvasRenderingContext2D, {
    width,
    height,
}: {
    width: number,
    height: number,
}): CanvasGradient => {
    const gradient = context.createLinearGradient(0, 0, width, height);

    gradient.addColorStop(0.0, LEVEL_LOW);
    gradient.addColorStop(0.8, LEVEL_MIDDLE);
    gradient.addColorStop(0.9, LEVEL_HIGH);

    return gradient;
}

export const getAverage = converge(divide, [sum, length]);