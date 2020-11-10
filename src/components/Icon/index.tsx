import React from 'react';
import classnames from 'classnames';
import style from './style.css';


type IconType = 'play' | 'pause' | 'rewind';

type Props = {
    type: IconType,
};


export const Icon: React.FC<Props> = ({type}: Props) => {
    const classes = classnames(style.icon, style[`icon_type_${type}`]);

    return (<div className={classes}></div>);
}