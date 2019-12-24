'use strict';

import React, {useReducer, useEffect} from 'react';
import {render} from 'react-dom';

import Desk from '/containers/Desk';
import Context from '/containers/Context';

import {initialState} from '/store';
import {reducer} from '/store/reducers';
import {setTracksStatusesOnLoad, getDispatchWithLog} from '/store/helpers';


const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchWithLog = getDispatchWithLog(dispatch);

    useEffect(() => {
        setTracksStatusesOnLoad(dispatchWithLog);
    }, []);

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