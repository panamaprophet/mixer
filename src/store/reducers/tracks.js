// mixdesk.setTrackVolume(trackId, volume) => mixdesk.tracks[index].volume = volume
const setTrackVolume = (volume, trackId, tracks) => tracks.map(track => {
    if (track.id === trackId) {
        return {
            ...track,
            volume,
        };
    } 

    return track;
});

// mixdesk.setTrackSendLevel(trackId, sendId, level) => mixdesk.tracks[index].fx[sendId].gain.value = level
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

// mixdesk.toggleTrack(trackId) => mixdesk.tracks[index].toggleMute();
const toggleTrackMute = (trackId, tracks) => tracks.map(track => {
    if (track.id === trackId) {
        return {
            ...track,
            isMuted: !track.isMuted,
        };
    }

    return track;
});

// mixdesk.toggleTrackFx(trackId) => mixdesk.tracks[index].toggleFX();
const toggleTrackFxBypass = (trackId, tracks) => tracks.map(track => {
    if (track.id === trackId) {
        return {
            ...track,
            isEffectsDisabled: !track.isEffectsDisabled,
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
        default:
            return tracks;
    }
};