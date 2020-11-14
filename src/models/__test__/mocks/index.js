import {AudioContextMock, AudioParamMock} from './webaudio';


global.AudioContext = AudioContextMock;

global.AudioParam = AudioParamMock;

global.fetch = () => Promise.resolve({
    arrayBuffer: () => {
        return {
            bufferLength: 1,
        };
    }
});