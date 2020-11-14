import React from 'react';
import {shallow} from 'enzyme';
import {Send} from '../';
import {SendParameterType} from '/helpers/entities';


const propsMock = {
    id: 'test',
    name: 'Effect',
    parameters: [{
        id: 'effect-parameter-1',
        name: 'Effect Parameter 1',
        type: SendParameterType.FADER,
        value: 42.0,
    }, {
        id: 'effect-parameter-2',
        name: 'Effect Parameter 2',
        type: SendParameterType.RADIO,
        value: '71.0',
    }],
    onChange: jest.fn(() => jest.fn()),
};


describe('<Send />', () => {
    it('should renders without any errors', () => {
        const wrapper = shallow(<Send {...propsMock} />);

        expect(wrapper).toMatchSnapshot();
    });
});