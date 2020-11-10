import React from 'react';
import style from './style.css';


type Props = {
    position: number,
    isVertical: boolean,
    events: Record<string, (event: TouchEvent | MouseEvent) => void>,
};


export const FaderThumb: React.FC<Props> = ({
    position = 0,
    isVertical = false,
    events = {},
}) => {
    const styleProperty = isVertical ? 'bottom' : 'left';
    const stylePropertyValue = `${position}%`;
    const inlineStyle = {[styleProperty]: stylePropertyValue};

    return (
        <div
            className={style.thumb}
            style={inlineStyle}
            {...events}
        >
        </div>
    );
}