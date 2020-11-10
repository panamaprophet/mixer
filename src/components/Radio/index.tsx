import React from 'react';
import classnames from 'classnames';

import style from './style.css';


type Props = {
    name: string,
    value: number | string,
    values?: string[],
    onChange: (value: string) => void,
}


export const Radio: React.FC<Props> = ({
    value,
    values = [],
    onChange,
}) => {
    const items = values.map(v => (
        <div key={v} className={style.label} onClick={() => onChange(v)}>
            <div className={classnames(style.control, (v === value) && style.isSelected)} />
            <div className={style.title}>{v}</div>
        </div>
    ));

    return (<div className={style.radio}>{items}</div>);
};