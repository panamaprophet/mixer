import React, {useEffect} from 'react';
import {map, curry, reject, not} from 'ramda';

import {
    TRACK_STATE,
} from '/constants';

import {
    createEffectEntity,
    createPlaybackEntity,
    createTrackEntity,
} from '/helpers/entities';

import {mixdesk} from './mixdesk';


const compact = reject(item => not(Boolean(item)));

const getLoadingState = track => track.loadingState;

const getLoadingStates = ({tracks}) => map(getLoadingState, tracks);

/**
 * Dispatches set ready state action with provided track params
 *
 * @param {function} dispatch
 * @param {Track}
 */
const dispatchSetTrackState = curry((dispatch, {id, state}) => dispatch({
    type: 'TRACK_SET_READY_STATE',
    payload: {
        trackId: id,
        state,
    },
}));

/**
 * Updates tracks statuses in store
 *
 * @param {function} — dispatch
 * @returns {Promise<Track[]>}
 */
export const setTracksStatusesOnLoad = dispatch => 
    Promise
        .all(getLoadingStates(mixdesk))
        .then(map(dispatchSetTrackState(dispatch)));

/**
 * Brings dispatch arguments to console
 *
 * @param {function} — original dispatch
 * @returns {function} — curried version with original dispatch binded
 */
export const getDispatchWithLog = curry((dispatch, args) => {
    console.log('[DISPATCH LOG]', args);

    return dispatch(args);
});

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