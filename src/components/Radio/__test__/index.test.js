import React from 'react';
import {shallow} from 'enzyme';

import Radio from '../';


const props = {
    name: 'radio-test',
    value: 'one',
    values: ['one', 'two', 'three'],
    onChange: jest.fn(),
};

describe('<Radio />', () => {
    it('should renders without any errors', () => {
        const wrapper = shallow(<Radio {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    describe('active value', () => {
        it('has class isSelected', () => {
            const wrapper = shallow(<Radio {...props} />);
            const result = wrapper.find('.label').at(0).find('.control').hasClass('isSelected');

            expect(result).toBe(true);
        });
    });

    describe('onChange', () => {
        it('should be called on item click', () => {
            const wrapper = shallow(<Radio {...props} />);

            wrapper.find('.label').at(2).simulate('click');

            expect(props.onChange).toBeCalled();
        });
    });
});