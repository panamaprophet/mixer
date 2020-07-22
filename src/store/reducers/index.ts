import {trackReducer} from './tracks';
import {effectReducer} from './effects';
import {playbackReducer} from './playback';


type State = {
	tracks: any,
	effects: any,
	playback: any,
};

export const reducer = (state: State, action): State => {
    return {
        tracks: trackReducer(state.tracks, action),
        effects: effectReducer(state.effects, action),
        playback: playbackReducer(state.playback, action),
    };
};