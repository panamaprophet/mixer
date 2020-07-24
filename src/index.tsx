import React, {} from 'react';
import {render} from 'react-dom';

import useMixer from '/hooks/useMixer';
import Desk from '/containers/Desk';
import Context from '/containers/Context';

import {tracks} from '/config';


const App = ({tracks = []}) => {
    const context = useMixer(tracks);
    const {mx, state, dispatch} = context;

    return (
        <Context.Provider value={{mx, dispatch}}>
            <Desk {...state} />
        </Context.Provider>
    );
};

render(
    <App tracks={tracks} />,
    document.getElementById('root')
);