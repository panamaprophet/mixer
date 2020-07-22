import React from 'react';

import Fader from '/components/Fader';
import Radio from '/components/Radio';

import style from './style.css';


const EffectParameterMap = {
    'fader': Fader,
    'radio': Radio,
};

const getControlByType = type => EffectParameterMap[type];


const EffectParameter = ({
    onChange,
    ...props
}) => {
    const {
        id,
        name,
        type = 'fader',
    } = props;

    const Control = getControlByType(type);

    return Control
    ? (
        <div className={style.parameter} key={id}>
            <span className={style.title}>{name}:</span>
            <div className={style.controlContainer}>
                <Control {...props} onChange={onChange(id)} />
            </div>
        </div>
    ) : null;
};

export default EffectParameter;