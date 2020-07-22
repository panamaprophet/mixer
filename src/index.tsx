import React, {useReducer, useEffect} from 'react';
import {render} from 'react-dom';

import Desk from '/containers/Desk';
import Context from '/containers/Context';

import {mixdesk} from '/store/mixdesk';
import {reducer} from '/store/reducers';
import {
    setReadyStateOnLoad,
    getDispatchWithLog,
    createState,
} from '/store/helpers';

import {tracks} from '/config';


type Props = {
    tracks?: any,
    eventListener?: (...args) => void,
};


const App = ({
    tracks = [], 
    eventListener = (...args) => {},
}: Props) => {
    const [state, dispatch] = useReducer(reducer, createState(mixdesk));
    const dispatchWithLog = getDispatchWithLog(dispatch);

    useEffect(() => {
        mixdesk.load(tracks).then(trackStates => {
            const {tracks} = createState(mixdesk);

            setReadyStateOnLoad((...args) => {
                dispatchWithLog(...args);
                dispatchWithLog({ type: 'SET_TRACKS', payload: tracks });
                eventListener(...args);
            }, mixdesk);
        });
    }, [tracks]);

    return (
        <Context.Provider value={dispatchWithLog}>
            <Desk {...state} />
        </Context.Provider>
    );
};

render(
    <App tracks={tracks} />,
    document.getElementById('root')
);