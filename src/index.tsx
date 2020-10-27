import React from 'react';

import useMixer from '/hooks/useMixer';
import Desk from '/containers/Desk';
import Context from '/containers/Context';


const Mixdesk = ({tracks = []}) => {
    const context = useMixer(tracks);
    const {mx, state, dispatch} = context;

    return (
        <Context.Provider value={{mx, dispatch}}>
            <Desk {...state} />
        </Context.Provider>
    );
};


export {
    Mixdesk,
    useMixer,
};


/** example: 

import {Mixdesk} from 'mixdesk';
import {tracks} from '/config';

render(
    <Mixdesk tracks={tracks} />,
    document.getElementById('root')
);

*/
