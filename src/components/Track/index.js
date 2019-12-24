import React from 'react';
import classnames from 'classnames';

import Fader from '/components/Fader';

import style from './style.css';


const Track = ({
    id,
    title = 'Untitled',
    volume = 0,
    isMuted,
    isEffectsDisabled,
    send,

    onMute,
    onBypass,
    onVolumeChange,
    onSendLevelChange,
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
            <div className={style.send}>
                <span className={style.sendTitle}>Delay:</span>
                <Fader onChange={onSendLevelChange('delay')} position={send.delay} />
            </div>
            <div className={style.send}>
                <span className={style.sendTitle}>Revrb:</span>
                <Fader onChange={onSendLevelChange('reverb')} position={send.reverb} />
            </div>
            <div className={style.send}>
                <span className={style.sendTitle}>Distrt:</span>
                <Fader onChange={onSendLevelChange('distortion')} position={send.distortion} />
            </div>
        </div>

        <div className={style.title}>{title}</div>
    </div>
);

export default Track;