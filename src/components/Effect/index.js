import React from 'react';

import Fader from '/components/Fader';

import style from './style.css';


const EffectParameter = ({id, name, value, onChange}) => (
    <div className={style.parameter} key={id}>
        <span className={style.parameterTitle}>{name}:</span>
        <div className={style.parameterControl}>
            <Fader onChange={onChange(id)} position={value} />
        </div>
    </div>
);

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