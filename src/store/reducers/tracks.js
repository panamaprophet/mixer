const setTrackVolume = (volume, trackId, tracks) => tracks.map(track => {
    if (track.id === trackId) {
        return {
            ...track,
            volume,
        };
    } 

    return track;
});

const setTrackSendLevel = (level, sendId, trackId, tracks) => tracks.map(track => {
    if (track.id === trackId) {
        return {
            ...track,
            send: {
                ...track.send,
                [sendId]: level,
            },
        };
    }

    return track;
});

const toggleTrackMute = (trackId, tracks) => tracks.map(track => {
    if (track.id === trackId) {
        return {
            ...track,
            isMuted: !track.isMuted,
        };
    }

    return track;
});

const toggleTrackFxBypass = (trackId, tracks) => tracks.map(track => {
    if (track.id === trackId) {
        return {
            ...track,
            isEffectsDisabled: !track.isEffectsDisabled,
        };
    }

    return track;
});

const setTrackReadyState = (state, trackId, tracks) => tracks.map(track => {
    if (track.id === trackId) {
        return {
            ...track,
            state,
        };
    }

    return track;
});

export const trackReducer = (tracks, {type, payload}) => {
    switch (type) {
        case 'SET_TRACK_VOLUME':
            return setTrackVolume(
                payload.value,
                payload.trackId,
                tracks
            );
        case 'SET_TRACK_SEND_LEVEL':
            return setTrackSendLevel(
                payload.value,
                payload.fxId,
                payload.trackId,
                tracks
            );
        case 'TRACK_MUTE_TOGGLE':
            return toggleTrackMute(
                payload.trackId,
                tracks
            );
        case 'TRACK_FX_TOGGLE':
            return toggleTrackFxBypass(
                payload.trackId,
                tracks
            );
        case 'TRACK_SET_READY_STATE':
            return setTrackReadyState(
                payload.state,
                payload.trackId,
                tracks,
            );
        default:
            return tracks;
    }
};