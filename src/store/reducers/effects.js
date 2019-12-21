export const effectReducer = (effects, action) => {
    switch (action.type) {
        case 'SET_DELAY_TIME':
        case 'SET_DELAY_FREQUENCY': 
        case 'SET_DELAY_FEEDBACK':
        default:
            return effects;
    }
};
