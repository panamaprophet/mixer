import React from 'react';
import classnames from 'classnames';
import {SendParameter, SendParameterType} from '/helpers/entities';
import {SendParamValue} from '/models/sends';
import style from './style.css';


interface Props extends SendParameter {
    onChange: (value: SendParamValue) => void,
}

export const Radio: React.FC<Props> = ({
    type,
    value,
    values = [],
    onChange,
}) => {
    if  (type !== SendParameterType.RADIO) {
        return null;
    }

    const items = values.map(v => (
        <div key={String(v)} className={style.label} onClick={() => onChange(v)}>
            <div className={classnames(style.control, (v === value) && style.isSelected)} />
            <div className={style.title}>{v}</div>
        </div>
    ));

    return (<div className={style.radio}>{items}</div>);
};