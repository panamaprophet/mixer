import React from 'react';

import style from './style.css';


const FaderThumb = ({
    position = 0, 
    isVertical = false,
    events = {},
}) => {
    const styleProperty = isVertical ? 'bottom' : 'left';
    const stylePropertyValue = position + '%';

    return (
        <div
            className={style.thumb}
            style={{
                [styleProperty]: stylePropertyValue,
            }}
            {...events}
        >
        </div>
    );
};

export default FaderThumb;