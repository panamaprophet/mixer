import type {TrackEntity} from "/helpers/entities";
import type {SendId} from "/models/sends/index";
import type {TrackId, TrackState} from "/models/track";
import type {Action} from './index';


const setTrackVolume = (volume: number, trackId: TrackId, tracks: TrackEntity[]): TrackEntity[] => tracks.map(track => {
    if (track.id === trackId) {
        return {
            ...track,
            volume,
        };
    }

    return track;
});

const setTrackSendLevel = (level: number, sendId: SendId, trackId: TrackId, tracks: TrackEntity[]): TrackEntity[] => tracks.map(track => {
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

const toggleTrackMute = (trackId: TrackId, tracks: TrackEntity[]): TrackEntity[] => tracks.map(track => {
    if (track.id === trackId) {
        return {
            ...track,
            isMuted: !track.isMuted,
        };
    }

    return track;
});

const toggleTrackFxBypass = (trackId: TrackId, tracks: TrackEntity[]): TrackEntity[] => tracks.map(track => {
    if (track.id === trackId) {
        return {
            ...track,
            isSendsEnabled: !track.isSendsEnabled,
        };
    }

    return track;
});

const setTrackReadyState = (state: TrackState, trackId: TrackId, tracks: TrackEntity[]): TrackEntity[] => tracks.map(track => {
    if (track.id === trackId) {
        return {
            ...track,
            state,
        };
    }

    return track;
});


export const trackReducer = (tracks: TrackEntity[], action: Action): TrackEntity[] => {
    switch (action.type) {
        case 'SET_TRACK_VOLUME':
            return setTrackVolume(action.payload.value, action.payload.trackId, tracks);
        case 'SET_TRACK_SEND_LEVEL':
            return setTrackSendLevel(action.payload.value, action.payload.sendId, action.payload.trackId, tracks);
        case 'TRACK_MUTE_TOGGLE':
            return toggleTrackMute(action.payload.trackId, tracks);
        case 'TRACK_SEND_TOGGLE':
            return toggleTrackFxBypass(action.payload.trackId, tracks);
        case 'TRACK_SET_READY_STATE':
            return setTrackReadyState(action.payload.value, action.payload.trackId, tracks);
        case 'SET_TRACKS':
            return [...action.payload];
        default:
            return tracks;
    }
};