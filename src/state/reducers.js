import {mixdesk} from './mixdesk';


export const trackReducer = (tracks, {type, payload}) => {
    switch (type) {
        case 'SET_TRACK_VOLUME':
            return tracks.map((track, index) => {
                if (track.id === payload.trackId) {
                    track.volume = payload.value;

                    // @TODO: use different approach to handle side effects
                    // WARNING: it's here for development test cases only
                    mixdesk.tracks[index].volume = payload.value;
                }

                return track;
            });
        case 'SET_TRACK_FX_MIX':
            return tracks.map((track, index) => {
                if (track.id === payload.trackId) {
                    track.send[payload.fxId] = payload.value;
                }

                return track;
            });
        case 'TRACK_MUTE_TOGGLE':
        case 'TRACK_FX_TOGGLE':
        default:
            return tracks;
    }
};

export const effectReducer = (effects, action) => {
    switch (action.type) {
        case 'SET_DELAY_TIME':
        case 'SET_DELAY_FREQUENCY': 
        case 'SET_DELAY_FEEDBACK':
        default:
            return effects;
    }
};

export const controlsReducer = (controls, action) => {
    switch (action.type) {
        case 'CONTROLS_PLAY': 
        case 'CONTROLS_PAUSE':
        case 'CONTROLS_REWIND': 
        default:
            return controls;
    }

};

export const combinedReducer = (state, action) => {
    return {
        tracks: trackReducer(state.tracks, action),
        effects: effectReducer(state.effects, action),
        controls: controlsReducer(state.controls, action),
    };
};