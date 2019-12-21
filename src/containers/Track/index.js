import React, {useContext} from 'react';

import Track from '/components/Track';
import Context from '/containers/Context'

import {
    setVolume,
    setSendLevel,
    toggleMute,
    toggleFxBypass,
} from './actions';


const TrackContainer = props => {
    const {id: trackId} = props;
    const dispatch = useContext(Context);

    return (
        <Track
            {...props}

            onMute={toggleMute(dispatch)}
            onBypass={toggleFxBypass(dispatch)}
            onVolumeChange={setVolume(dispatch, trackId)}
            onSendLevelChange={setSendLevel(dispatch, trackId)}
        />
    );
}

export default TrackContainer;