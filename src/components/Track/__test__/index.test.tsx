import React from 'react';
import {shallow, mount} from 'enzyme';
import {Track} from '../';
import {TrackState} from '/models/track';


const propsMock = {
    id: 'track',
    title: 'Track',
    volume: 42.0,
    isMuted: false,
    isSendsEnabled: true,
    send: {
        delay: 0,
        reverb: 0,
    },
    state: TrackState.NOT_SET,
    onMute: jest.fn(),
    onBypass: jest.fn(),
    onVolumeChange: jest.fn(),
    onSendLevelChange: jest.fn(() => jest.fn()),
};

const MUTE_BUTTON = 0;
const FX_BYPASS_BUTTON = 1;
const FADER_VOLUME = 0;
const FADER_SEND = 1;


describe('<Track />', () => {
    it('should renders without any errors', () => {
        const wrapper = shallow(
            <Track {...propsMock} />
        );

        expect(wrapper).toMatchSnapshot();
    });

    describe('onMute', () => {
        it('should be called on mute toggler click', () => {
            const wrapper = shallow(
                <Track {...propsMock} />
            );

            wrapper.find('button').at(MUTE_BUTTON).simulate('click');

            expect(propsMock.onMute).toBeCalled();
        });
    });

    describe('onBypass', () => {
        it('should be called on fx bypass toggler click', () => {
            const wrapper = shallow(
                <Track {...propsMock} />
            );

            wrapper.find('button').at(FX_BYPASS_BUTTON).simulate('click');

            expect(propsMock.onBypass).toBeCalled();
        });
    });

    describe('onVolumeChange', () => {
        it('should be called on volume change', () => {
            const wrapper = mount(
                <Track {...propsMock} />
            );

            wrapper.find('Fader').at(FADER_VOLUME).find('FaderThumb').simulate('mouseDown');

            window.document.documentElement.dispatchEvent(new Event('mousemove'));
            window.document.documentElement.dispatchEvent(new Event('mouseup'));

            expect(propsMock.onVolumeChange).toBeCalled();
        });
    });

    describe('onSendLevelChange', () => {
        it('should be called on send level change', () => {
            const wrapper = mount(
                <Track {...propsMock} />
            );

            wrapper.find('Fader').at(FADER_SEND).find('FaderThumb').simulate('mouseDown');

            window.document.documentElement.dispatchEvent(new Event('mousemove'));
            window.document.documentElement.dispatchEvent(new Event('mouseup'));

            expect(propsMock.onSendLevelChange).toBeCalled();
        });
    });
});