import React from 'react';
import {shallow} from 'enzyme';

import Desk from '../';

import {
    PLAYBACK_STATUS,
} from '/constants';

const playbackMock = {
    analyser: {},
    status: PLAYBACK_STATUS.PAUSED,
    currentPosition: 0,
};

const PLAY_BUTTON = 0;
const PAUSE_BUTTON = 1;
const REWIND_BUTTON = 2;


describe('<Desk />', () => {
    it('should renders without any errors', () => {
        const wrapper = shallow(
            <Desk playback={{
                ...playbackMock,
            }} />
        );

        expect(wrapper).toMatchSnapshot();
    });

    describe('playback buttons', () => {
        it('should be disabled if mixdesk is not active', () => {
            const wrapper = shallow(
                <Desk playback={{
                    ...playbackMock,
                    status: PLAYBACK_STATUS.NOT_SET,
                }} />
            );

            const result = wrapper.find('button[disabled]').length;

            expect(result).toBe(3);
        });
    });

    describe('play button', () => {
        it('should call onPlay on press', () => {
            const onPlay = jest.fn();
            const wrapper = shallow(<Desk playback={{
                ...playbackMock,
            }} onPlay={onPlay} />);

            wrapper.find('button').at(PLAY_BUTTON).simulate('click');

            expect(onPlay).toBeCalled();
        });

        it('should have active class on playing', () => {
            const wrapper = shallow(<Desk playback={{
                ...playbackMock,
                status: PLAYBACK_STATUS.PLAYING,
            }} />);

            const result = wrapper.find('button').at(PLAY_BUTTON).hasClass('isButtonPressed');

            expect(result).toBe(true);
        });
    });

    describe('pause button', () => {
        it('should call onPause on press', () => {
            const onPause = jest.fn();
            const wrapper = shallow(<Desk playback={{
                ...playbackMock,
            }} onPause={onPause} />);

            wrapper.find('button').at(PAUSE_BUTTON).simulate('click');

            expect(onPause).toBeCalled();
        });

        it('should have active class on pause', () => {
            const wrapper = shallow(<Desk playback={{
                ...playbackMock,
                status: PLAYBACK_STATUS.PAUSED,
                currentPosition: 420,
            }} />);

            const result = wrapper.find('button').at(PAUSE_BUTTON).hasClass('isButtonPressed');

            expect(result).toBe(true);
        });
    });

    describe('rewind button', () => {
        it('should call onRewind on press', () => {
            const onRewind = jest.fn();
            const wrapper = shallow(<Desk playback={{
                ...playbackMock,
            }} onRewind={onRewind} />);

            wrapper.find('button').at(REWIND_BUTTON).simulate('click');

            expect(onRewind).toBeCalled();
        });
    });
});