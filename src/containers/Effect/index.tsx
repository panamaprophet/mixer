import React, {useContext} from 'react';

import Effect from '/components/Effect';
import Context from '/containers/Context';

import {
    setSendParamValue,
} from '/store/actions';


const EffectContainer = props => {
    const dispatch = useContext(Context);

    return (
        <Effect
            {...props}
            onParamChange={setSendParamValue(dispatch, props.id)}
        />
    );
};

export default EffectContainer;