import React from 'react';
import classnames from 'classnames';

import style from './style.css';


type IconType = 'play' | 'pause' | 'rewind';

type Props = {
    type: IconType,
};


const Icon = ({type}: Props) => (<div className={classnames(style.icon, style[`icon_type_${type}`])}></div>);

export default Icon;