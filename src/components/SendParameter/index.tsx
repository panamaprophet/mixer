import React from 'react';
import {Fader} from '/components/Fader/index';
import {Radio} from '/components/Radio/index';
import {SendParameterType} from '/helpers/entities';
import type {SendId} from '/models/sends/index';

import style from './style.css';


type FaderProps = {
    id: SendId,
    name: string,
    type: SendParameterType.FADER,
    value: number,
    isVertical?: boolean,
    onChange: (value: number) => void,
}

type RadioProps = {
    id: SendId,
    name: string,
    type: SendParameterType.RADIO,
    value: string,
    values: string[],
    onChange: (value: string) => void,
}

export type SendParameterProps = RadioProps | FaderProps;

export const SendParameter: React.FC<SendParameterProps> = (props) => {
    const {id, name} = props;

    return (
        <div className={style.parameter} key={id}>
            <span className={style.title}>
                {name}:
            </span>
            <div className={style.controlContainer}>
                {props.type === SendParameterType.FADER && <Fader {...props} />}
                {props.type === SendParameterType.RADIO && <Radio {...props} />}
            </div>
        </div>
    );
};