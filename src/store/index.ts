import {
    createSendEntity,
    createPlaybackEntity,
    createTrackEntity,
} from '/helpers/entities';
import {Mixer} from '/models/mixer';
import type {MixerState} from '/containers/Context/index';
import {Action} from './reducers/index';


const notNull = <T>(item: T | null): item is T => item !== null;

const compact = <T>(items: (T | null)[]): T[] => items.filter(notNull);


export const getDispatchWithLog = (dispatch: React.Dispatch<Action>) => (action: Action): void => {
    console.log('[DISPATCH LOG]', action);

    return dispatch(action);
}

export const createState = (mixdesk: Mixer): MixerState => {
    const tracks = compact(mixdesk.tracks.map(createTrackEntity));
    const sends = compact(mixdesk.sends.map(createSendEntity));
    const playback = createPlaybackEntity(mixdesk);

    return {
        tracks,
        sends,
        playback,
    };
}