import type {Action} from "./index";
import type {SendEntity} from "/helpers/entities";
import type {SendId, SendParamValue} from "/models/sends/index";


const setSendParamValue = (sendId: SendId, parameterId: string, value: SendParamValue, sends: SendEntity[]): SendEntity[] => {
    return sends.map(send => {
        if (sendId === send.id) {
            return {
                ...send,
                parameters: send.parameters.map(param => {
                    if (param.id === parameterId) {
                        return {
                            ...param,
                            value,
                        }
                    }

                    return param;
                }),
            }
        }

        return send;
    });
}

export const sendReducer = (sends: SendEntity[], action: Action): SendEntity[] => {
    switch (action.type) {
        case 'SET_SEND_PARAM_VALUE':
            return setSendParamValue(action.payload.sendId, action.payload.parameterId, action.payload.value, sends);
        case 'SET_SENDS':
            return [...action.payload];
        default:
            return sends;
    }
};
