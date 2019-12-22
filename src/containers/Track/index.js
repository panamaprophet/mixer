import React, {useContext} from 'react';

import Track from '/components/Track';
import Context from '/containers/Context'

import {
    setTrackVolume,
    setTrackSendLevel,
    toggleTrack,
    toggleTrackFx,
} from '/store/actions';


const TrackContainer = props => {
    const {id: trackId} = props;
    const dispatch = useContext(Context);

    return (
        <Track
            {...props}

            onMute={toggleTrack(dispatch)}
            onBypass={toggleTrackFx(dispatch)}
            onVolumeChange={setTrackVolume(dispatch, trackId)}
            onSendLevelChange={setTrackSendLevel(dispatch, trackId)}
        />
    );
}

export default TrackContainer;