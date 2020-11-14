import React, {useContext} from 'react';
import {Send} from '/components/Send/index';
import {Context} from '/containers/Context/index';
import {setSendParamValue} from '/store/actions/index';
import type {SendEntity} from '/helpers/entities';


export const SendContainer: React.FC<SendEntity> = props => {
    const context = useContext(Context);

    return (<Send {...props} onChange={setSendParamValue(context)(props.id)} />);
};