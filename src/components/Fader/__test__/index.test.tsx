import React from 'react';
import {shallow, mount} from 'enzyme';

import {Fader} from '../';


const nop = () => { return; }


describe('<Fader />', () => {
    it('should renders without any errors', () => {
        const wrapper = shallow(<Fader value={0} onChange={nop} />);

        expect(wrapper).toMatchSnapshot();
    });

    describe('value', () => {
        it('should be passed to thumb', () => {
            const value = 42.0;
            const wrapper = shallow(<Fader value={value} onChange={nop} />);
            const result = wrapper.find('FaderThumb').prop('position');

            expect(result).toBe(value);
        });
    });

    describe('isVertical', () => {
        it('should have isHorisontal class on false', () => {
            const wrapper = shallow(<Fader isVertical={false} value={0} onChange={nop} />);
            const result = wrapper.hasClass('isHorisontal');

            expect(result).toBe(true);
        });

        it('should omit isHorisontal class on true', () => {
            const wrapper = shallow(<Fader isVertical={true} value={0} onChange={nop} />);
            const result = wrapper.hasClass('isHorisontal');

            expect(result).toBe(false);
        });
    });

    describe('onChange', () => {
        it('should be called on value change', () => {
            const onChangeMock = jest.fn();
            const wrapper = mount(<Fader value={0} onChange={onChangeMock} />);

            wrapper.find('FaderThumb').simulate('mouseDown');

            window.document.documentElement.dispatchEvent(new Event('mousemove'));
            window.document.documentElement.dispatchEvent(new Event('mouseup'));

            expect(onChangeMock).toBeCalled();
        });
    });
});