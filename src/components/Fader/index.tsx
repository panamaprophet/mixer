import React, {useRef} from 'react';
import classnames from 'classnames';
import {FaderThumb} from './FaderThumb';
import {getX, getY, getPointerVerticalPosition, getPointerHorizontalPosition} from './helpers';
import {SendParameter, SendParameterType} from '/helpers/entities';
import style from './style.css';


type FaderEvent = 'mousemove' | 'mouseup' | 'mousedown' | 'touchmove' | 'touchend' | 'touchstart';

const EVENTS_MAP: Record<string, FaderEvent> = {
    'mousemove': 'touchmove',
    'mouseup': 'touchend',
    'mousedown': 'touchstart',
};

const hasTouchEventsSupport = (): boolean => 'ontouchstart' in window;

const getEventNameByFeature = (eventName: FaderEvent): FaderEvent => (hasTouchEventsSupport() ? EVENTS_MAP[eventName] : eventName);

interface Props extends Partial<SendParameter> {
    onChange: (value: number) => void,
    isVertical?: boolean,
}

export const Fader: React.FC<Props> = ({
    type = SendParameterType.FADER,
    onChange,
    isVertical = false,
    value,
}) => {
    if (type !== SendParameterType.FADER) {
        return null;
    }

    const containerRef = useRef<HTMLDivElement>(null);

    const onMoveStart = (event: MouseEvent | TouchEvent): void => {
        event.preventDefault();

        document.documentElement.addEventListener(getEventNameByFeature('mousemove'), onMove);
        document.documentElement.addEventListener(getEventNameByFeature('mouseup'), onMoveEnd);
    }

    const onMove = (event: MouseEvent | TouchEvent): void => {
        event.preventDefault();

        const containerElement = containerRef.current;

        if (containerElement) {
            const offset = containerElement.getBoundingClientRect();
            const x = getX(event) - document.documentElement.scrollLeft;
            const y = getY(event) - document.documentElement.scrollTop;

            const newValue = isVertical
                ? getPointerVerticalPosition(y, offset)
                : getPointerHorizontalPosition(x, offset);

            onChange(newValue);
        }
    }

    const onMoveEnd = (event: MouseEvent | TouchEvent): void => {
        event.preventDefault();

        document.documentElement.removeEventListener(getEventNameByFeature('mousemove'), onMove);
        document.documentElement.removeEventListener(getEventNameByFeature('mouseup'), onMoveEnd);
    }

    const thumbEventName = hasTouchEventsSupport() ? 'onTouchStart' : 'onMouseDown';

    return (
        <div className={classnames(style.fader, !isVertical && style.isHorisontal)} ref={containerRef}>
            <div className={style.control}>
                <FaderThumb position={Number(value)} events={{[thumbEventName]: onMoveStart}} isVertical={isVertical} />
            </div>
        </div>
    );
};