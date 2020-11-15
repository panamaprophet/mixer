import {AudioParamMock, AudioContextMock} from './webaudio.mock';

// @ts-ignore: jest doesnt provide audiocontext
global.AudioContext = AudioContextMock;

// @ts-ignore: and audio param also
global.AudioParam = AudioParamMock;