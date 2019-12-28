import React from 'react';
import classnames from 'classnames';

import style from './style.css';


const Radio = ({
    name,
    value: currentValue, 
    values = [],
    onChange = () => {},
}) => (
    <div className={style.radio}>
        {values && values.map(value => (
            <div
                key={value}
                className={style.label}
                onClick={() => onChange(value)}
            >
                <div className={classnames(style.control, (value === currentValue) && style.isSelected)} />
                <div className={style.title}>{value}</div>
            </div>
        ))}
    </div>
);

export default Radio;