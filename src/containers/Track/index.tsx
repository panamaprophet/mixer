import React, {useContext} from 'react';
import {Context} from '/containers/Context/index';
import {Track} from '/components/Track/index';
import {setTrackVolume, setTrackSendLevel, toggleTrack, toggleTrackFx} from '/store/actions/index';
import type {TrackEntity} from '/helpers/entities';


export const TrackContainer: React.FC<TrackEntity> = props => {
    const {id: trackId} = props;
    const context = useContext(Context);

    return (
        <Track
            {...props}

            onMute={toggleTrack(context)}
            onBypass={toggleTrackFx(context)}
            onVolumeChange={setTrackVolume(context)(trackId)}
            onSendLevelChange={setTrackSendLevel(context)(trackId)}
        />
    );
}