import React from 'react';
import classnames from 'classnames';

import style from './style.css';


const Icon = ({type}) => (<div className={classnames(style.icon, style[`icon_type_${type}`])}></div>);

export default Icon;