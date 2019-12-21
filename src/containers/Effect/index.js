import React, {useContext} from 'react';

import Effect from '/components/Effect';
import Context from '/containers/Context';

import {
    onParamChange,
} from './actions';

const EffectContainer = props => {
    const dispatch = useContext(Context);

    return (
        <Effect 
            {...props} 
            onParamChange={onParamChange(dispatch, props.id)} 
        />
    );
};

export default EffectContainer;