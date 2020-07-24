
const setEffectParamValue = (effectId, parameterId, value, effects) => effects.map(effect => {
    if (effectId === effect.id) {
        return {
            ...effect,
            parameters: effect.parameters.map(parameter => {
                if (parameter.id === parameterId) {
                    return {
                        ...parameter,
                        value,
                    };
                }

                return parameter;
            }),
        };
    }

    return effect;
});

export const effectReducer = (effects, {type, payload}) => {
    switch (type) {
        case 'SET_EFFECT_PARAM_VALUE':
            return setEffectParamValue(
                payload.effectId,
                payload.parameterId,
                payload.value,
                effects
            );
        case 'SET_EFFECTS':
            return [...payload];
        default:
            return effects;
    }
};
