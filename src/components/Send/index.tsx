import React from 'react';
import {SendEntity, SendParameterType} from '/helpers/entities';
import {Fader} from '/components/Fader';
import {Radio} from '/components/Radio';

import style from './style.css';
import {SendParamValue} from '/models/sends';

type Props = SendEntity & {
    onChange: (id: string) => (value: SendParamValue) => void,
};


export const Send: React.FC<Props> = ({
    name = 'Untitled',
    parameters,
    onChange,
}) => {
    return (
        <div className={style.send}>
            <div className={style.title}>
                {name}
            </div>

            {parameters && parameters.map(parameter => (
                <div className={style.parameterValue} key={parameter.id}>
                    <div className={style.parameter} key={parameter.id}>
                        <span className={style.parameterTitle}>
                            {name}:
                        </span>
                        <div className={style.parameterContainer}>
                            {parameter.type === SendParameterType.FADER && <Fader {...parameter} onChange={onChange(parameter.id)} />}
                            {parameter.type === SendParameterType.RADIO && <Radio {...parameter} onChange={onChange(parameter.id)} />}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}