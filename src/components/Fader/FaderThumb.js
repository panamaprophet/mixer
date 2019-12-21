import React from 'react';


const FaderThumb = ({
    position = 0, 
    isVertical = false,
    events = {},
}) => {
    const styleProperty = isVertical ? 'bottom' : 'left';
    const stylePropertyValue = position + '%';
    const style = {
        [styleProperty]: stylePropertyValue,
    };

    return (
        <div
            className="fader-thumb"
            style={style}
            {...events}
        >
        </div>
    );
};

export default FaderThumb;