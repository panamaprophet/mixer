import React, {useContext} from 'react';

import Track from '/components/Track';
import Context from '/containers/Context';

const TrackContainer = props => {
    const {id: trackId} = props;
    const dispatch = useContext(Context);

    const setTrackVolume = value => dispatch({
        type: 'SET_TRACK_VOLUME',
        payload: {
            trackId, 
            value,
        },
    });

    const setTrackReverbMix = value => dispatch({
        type: 'SET_TRACK_FX_MIX',
        payload: {
            fxId: 'reverb',
            trackId, 
            value,
        },
    });

    const setTrackDelayMix = value => dispatch({
        type: 'SET_TRACK_FX_MIX',
        payload: {
            fxId: 'delay',
            trackId,
            value,
        },
    });

    const setTrackDistortionMix = value => dispatch({
        type: 'SET_TRACK_FX_MIX',
        payload: {
            fxId: 'distortion',
            trackId,
            value,
        },
    });

    const toggleMute = () => dispatch({
        type: 'TRACK_MUTE_TOGGLE',
        payload: {
            trackId,
        },
    });

    const toggleFxBypass = () => dispatch({
        type: 'TRACK_FX_TOGGLE',
        payload: {
            trackId,
        },
    });

    return (
        <Track
            {...props}

            onMute={toggleMute}
            onBypass={toggleFxBypass}

            onVolumeChange={setTrackVolume}

            onReverbMixChange={setTrackReverbMix}
            onDelayMixChange={setTrackDelayMix}
            onDistortionMixChange={setTrackDistortionMix}
        />
    );
}

export default TrackContainer;