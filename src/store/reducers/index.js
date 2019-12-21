import {trackReducer} from './tracks';
import {effectReducer} from './effects';
import {playbackReducer} from './playback';


export const reducer = (state, action) => {
    return {
        tracks: trackReducer(state.tracks, action),
        effects: effectReducer(state.effects, action),
        playback: playbackReducer(state.playback, action),
    };
};