import React from 'react';
import {useMixer} from '/hooks/useMixer/index';
import {DeskContainer} from '/containers/Desk/index';
import {Context} from '/containers/Context/index';
import type {TrackSource} from './models/track'


type Props = {
    tracks: TrackSource[],
};


export const Mixdesk: React.FC<Props> = ({tracks = []}) => {
    const context = useMixer(tracks);
    const {state} = context;

    return (
        <Context.Provider value={context}>
            <DeskContainer {...state} />
        </Context.Provider>
    );
};