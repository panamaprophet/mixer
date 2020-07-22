import React, {SyntheticEvent} from 'react';

import style from './style.css';


type Props = {
    position: number,
    isVertical: boolean,
    events: {
        [key: string]: (event: SyntheticEvent) => void,
    }
};


const FaderThumb = ({
    position = 0, 
    isVertical = false,
    events = {},
}: Props) => {
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