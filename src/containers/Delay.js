import React from 'react';

import Delay from '/components/Effects/Delay';
import Context from '/containers/Context';


const DelayContainer = props => {
    const dispatch = useContext(Context);

    const onTimeChange = value => dispatch({
        type: 'SET_DELAY_TIME',
        payload: value,
    });

    const onFeedbackChange = value => dispatch({
        type: 'SET_DELAY_FEEDBACK',
        payload: value,
    });

    const onFrequencyChange = value => dispatch({
        type: 'SET_DELAY_FREQUENCY',
        payload: value,
    });

    return (
        <Delay 
            {...props}
            onTimeChange={onTimeChange}
            onFeedbackChange={onFeedbackChange}
            onFrequencyChange={onFrequencyChange}
        />
    );
}

export default DelayContainer;