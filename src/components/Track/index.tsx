import React from 'react';
import classnames from 'classnames';
import {keys} from 'ramda';
import {Fader} from '/components/Fader';
import style from './style.css';
import {TrackEntity} from '/helpers/entities';
import {TrackId} from '/models/track';
import {SendId} from '/models/sends/index';


type Props = TrackEntity & {
    onMute: (id: TrackId) => void,
    onBypass: (id: TrackId) => void,
    onVolumeChange: (value: number) => void,
    onSendLevelChange: (id: SendId) => (value: number) => void,
}


export const Track: React.FC<Props> = ({
    id,
    title = 'Untitled',
    volume = 0,
    isMuted = false,
    isSendsEnabled = true,
    send = {},
    onMute,
    onBypass,
    onVolumeChange,
    onSendLevelChange,
}) => (
    <div className={style.track}>
        <Fader id="volume" name="volume" onChange={onVolumeChange} value={volume} isVertical={true} />

        <div className="buttons">
            <button
                className={classnames(style.button, isMuted && style.isPressed)}
                onClick={() => onMute(id)}>
                    Mute
            </button>
            <button
                className={classnames(style.button, !isSendsEnabled && style.isPressed)}
                onClick={() => onBypass(id)}>
                    Bypass FX
            </button>
        </div>

        <div className={style.sends}>
            {send && keys(send).map(sendId => (
                <div className={style.send} key={sendId}>
                    <span className={style.sendTitle}>{sendId}</span>
                    <Fader id={sendId} name={sendId} onChange={onSendLevelChange(sendId)} value={send[sendId]} />
                </div>
            ))}
        </div>

        <div className={style.title}>{title}</div>
    </div>
);