import React from 'react';

import EffectParameter from '/components/EffectParameter';

import style from './style.css';


const Effect = ({
    name = 'Untitled',
    parameters = [],
    onParamChange = () => {},
}) => {
    return (
        <div className={style.effect}>
            <div className={style.title}>{name}</div>

            {parameters && parameters.map(parameter => (
                <div className={style.parameterValue} key={parameter.id}>
                    <EffectParameter {...parameter} onChange={onParamChange} />
                </div>
            ))}
        </div>
    );
}

export default Effect;