'use strict';

import React, {useReducer} from 'react';
import {render} from 'react-dom';

import Desk from '/containers/Desk';
import Context from '/containers/Context';

import {initialState} from '/store';
import {reducer} from '/store/reducers';


const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const dispatchWithLog = args => {
        console.log('[DISPATCH LOG]', args);

        return dispatch(args);
    }

    return (
        <Context.Provider value={dispatchWithLog}>
            <Desk {...state} />
        </Context.Provider>
    );
};

render(
    <App />,
    document.getElementById('root')
);