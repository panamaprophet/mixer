import {reject, not} from 'ramda';

import {
    createEffectEntity,
    createPlaybackEntity,
    createTrackEntity,
} from '/helpers/entities';

const compact = reject(item => not(Boolean(item)));

export const createState = mixdesk => {
    const tracks = compact(mixdesk.tracks.map(createTrackEntity));
    const effects = compact(mixdesk.fx.map(createEffectEntity));
    const playback = createPlaybackEntity({
        analyser: mixdesk.analyser,
    });

    return {
        tracks,
        effects,
        playback,
    };
}