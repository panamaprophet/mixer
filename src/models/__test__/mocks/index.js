import {AudioContextMock, AudioParamMock} from './webaudio';


global.AudioContext = AudioContextMock;

global.AudioParam = AudioParamMock;

global.fetch = async args => ({
    arrayBuffer() {
        return {
            bufferLength: 1,
        };
    }
});