import React from 'react';

import EffectParameter from '/components/EffectParameter';

import style from './style.css';


type ParameterType = 'fader' | 'radio';

type Parameter = {
    id: string,
    name: string,
    type: ParameterType,
}

type Props = {
    name: string,
    parameters: Array<Parameter>,
    onParamChange: (id) => void,
};


const Effect = ({
    name = 'Untitled',
    parameters = [],
    onParamChange = () => {},
}: Props) => {
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