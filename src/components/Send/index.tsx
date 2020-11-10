import React from 'react';
import {SendParameter} from '../SendParameter/index';
import type {SendEntity, SendParameterId} from '/helpers/entities';

import style from './style.css';


type Props = SendEntity & {
    onParamChange: (id: SendParameterId) => (value: number) => void,
};


export const Send: React.FC<Props> = ({
    name = 'Untitled',
    parameters,
    onParamChange,
}: Props) => {
    return (
        <div className={style.effect}>
            <div className={style.title}>
                {name}
            </div>

            {parameters && parameters.map(parameter => (
                <div className={style.parameterValue} key={parameter.id}>
                    {/* @ts-ignore: props on Send component should be similar to SendParameter ones */}
                    <SendParameter {...parameter} onChange={onParamChange(parameter.id)} />
                </div>
            ))}
        </div>
    );
}