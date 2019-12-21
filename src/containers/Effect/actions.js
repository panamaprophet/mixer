import {curry} from 'ramda';


export const onParamChange = curry((dispatch, effectId, parameterId, value) => dispatch({
    type: 'SET_EFFECT_PARAM_VALUE',
    payload: {
        effectId,
        parameterId,
        value,
    }
}));