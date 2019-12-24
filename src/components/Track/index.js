import React from 'react';
import classnames from 'classnames';
import {keys} from 'ramda';

import Fader from '/components/Fader';

import style from './style.css';


const Track = ({
    id,
    title = 'Untitled',
    volume = 0,
    isMuted = false,
    isEffectsDisabled = false,
    send = {},

    onMute = () => {},
    onBypass = () => {},
    onVolumeChange = () => {},
    onSendLevelChange = () => {},
}) => (
    <div className={style.track}>
        <Fader onChange={onVolumeChange} position={volume} isVertical={true} />

        <div className="buttons">
            <button
                className={classnames(style.button, isMuted && style.isPressed)}
                onClick={() => onMute(id)}>
                    Mute
            </button>
            <button 
                className={classnames(style.button, isEffectsDisabled && style.isPressed)}
                onClick={() => onBypass(id)}>
                    Bypass FX
            </button>
        </div>

        <div className={style.sends}>
            {send && keys(send).map(sendId => (
                <div className={style.send} key={sendId}>
                    <span className={style.sendTitle}>{sendId}</span>
                    <Fader onChange={onSendLevelChange(sendId)} position={send[sendId]} />
                </div>
            ))}
        </div>

        <div className={style.title}>{title}</div>
    </div>
);

export default Track;