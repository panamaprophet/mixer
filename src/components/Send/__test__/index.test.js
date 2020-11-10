import React from 'react';
import {shallow} from 'enzyme';

import Effect from '../';


const propsMock = {
    name: 'Effect',
    parameters: [{
        id: 'effect-parameter-1',
        name: 'Effect Parameter 1',
        value: 42.0,
    }, {
        id: 'effect-parameter-2',
        name: 'Effect Parameter 2',
        value: 71.0,
    }],
    onParamChange: jest.fn(),
};

describe('<Effect />', () => {
    it('should renders without any errors', () => {
        const wrapper = shallow(
            <Effect {...propsMock} />
        );

        expect(wrapper).toMatchSnapshot();
    });

    describe('parameters', () => {
        it('should render all passed parameters', () => {
            const wrapper = shallow(
                <Effect {...propsMock} />
            );

            const result = wrapper.find('EffectParameter').length;

            expect(result).toBe(propsMock.parameters.length);
        });
    });

    describe('onParamChange', () => {
        it('should be called when parameter changes', () => {
            const wrapper = shallow(
                <Effect {...propsMock} />
            );

            wrapper.find('EffectParameter').at(0).prop('onChange')();

            expect(propsMock.onParamChange).toBeCalled();
        });
    });
});