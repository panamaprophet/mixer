import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';

configure({adapter: new Adapter()});

class AudioParamMock {
    constructor() {
        // @todo: find a way to deal with webaudio api
    }
}

// @ts-ignore: jsdom
global.AudioParam = AudioParamMock;