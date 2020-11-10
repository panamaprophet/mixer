import React, {useRef, useEffect} from 'react';
import {getAverage, createMeterGradient} from './helpers';
import style from './style.css';


type Props = {
    analyser: AnalyserNode,
    width?: number,
    height?: number,
}


export const Meter: React.FC<Props> = ({
    analyser,
    width = 210,
    height = 20,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const context = canvasRef.current?.getContext('2d');

        const drawMeter = () => {
            if (!context) {
                return;
            }

            const array = new Uint8Array(analyser.frequencyBinCount);

            analyser.getByteFrequencyData(array);

            const average = getAverage(array) as number;

            context.clearRect(0, 0, width, height);
            context.fillStyle = createMeterGradient(context, {width, height});
            context.fillRect(0, 0, (width / 100) * average, height);

            requestAnimationFrame(drawMeter);
        }

        drawMeter();
    }, []);

    return (
        <div className={style.meter}>
            <canvas className={style.meterValue} width={width} height={height} ref={canvasRef}></canvas>
        </div>
    );
}