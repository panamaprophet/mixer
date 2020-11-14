import React from 'react';
import {shallow} from 'enzyme';
import {Desk} from '../';
import {PlaybackStatus} from '/helpers/playback';


const playbackMock = {
    status: PlaybackStatus.PAUSED,
    currentPosition: 0,
};

const props = {
    onPlay: jest.fn(),
    onPause: jest.fn(),
    onRewind: jest.fn(),
    playback: playbackMock,
}

const PLAY_BUTTON = 0;
const PAUSE_BUTTON = 1;
const REWIND_BUTTON = 2;


describe('<Desk />', () => {
    it('should renders without any errors', () => {
        const wrapper = shallow(<Desk {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    describe('playback buttons', () => {
        it('should be disabled if mixdesk is not active', () => {
            const p = {
                ...props,
                playback: {
                    ...props.playback,
                    status: PlaybackStatus.NOT_SET,
                },
            };

            const wrapper = shallow(<Desk {...p} />);
            const result = wrapper.find('button[disabled]').length;

            expect(result).toBe(3);
        });
    });

    describe('play button', () => {
        it('should call onPlay on press', () => {
            const wrapper = shallow(<Desk {...props} />);

            wrapper.find('button').at(PLAY_BUTTON).simulate('click');

            expect(props.onPlay).toBeCalled();
        });

        it('should have active class on playing', () => {
            const p = {
                ...props,
                playback: {
                    ...props.playback,
                    status: PlaybackStatus.PLAYING,
                },
            };

            const wrapper = shallow(<Desk {...p} />);
            const result = wrapper.find('button').at(PLAY_BUTTON).hasClass('isButtonPressed');

            expect(result).toBe(true);
        });
    });

    describe('pause button', () => {
        it('should call onPause on press', () => {
            const wrapper = shallow(<Desk {...props} />);
            wrapper.find('button').at(PAUSE_BUTTON).simulate('click');

            expect(props.onPause).toBeCalled();
        });

        it('should have active class on pause', () => {
            const p = {
                ...props,
                playback: {
                    ...props.playback,
                    status: PlaybackStatus.PAUSED,
                    currentPosition: 420,
                },
            };

            const wrapper = shallow(<Desk {...p} />);
            const result = wrapper.find('button').at(PAUSE_BUTTON).hasClass('isButtonPressed');

            expect(result).toBe(true);
        });
    });

    describe('rewind button', () => {
        it('should call onRewind on press', () => {
            const wrapper = shallow(<Desk {...props} />);

            wrapper.find('button').at(REWIND_BUTTON).simulate('click');

            expect(props.onRewind).toBeCalled();
        });
    });
});