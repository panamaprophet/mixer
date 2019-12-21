import React from 'react';

import Fader from '/components/Fader';


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
    <div className="track">
        <Fader onChange={onVolumeChange} position={volume} isVertical={true} />

        <div className="buttons">
            <button
                className={isMuted ? 'button-pressed' : ''}
                onClick={() => onMute(id)}>
                    Mute
            </button>
            <button 
                className={isEffectsDisabled ? 'button-pressed' : ''}
                onClick={() => onBypass(id)}>
                    Bypass FX
            </button>
        </div>

        <div className="sends">
            <div className="send">
                <span className="send-title">Delay:</span>
                <Fader onChange={onSendLevelChange('delay')} position={send.delay} />
            </div>
            <div className="send">
                <span className="send-title">Revrb:</span>
                <Fader onChange={onSendLevelChange('reverb')} position={send.reverb} />
            </div>
            <div className="send">
                <span className="send-title">Distrt:</span>
                <Fader onChange={onSendLevelChange('distortion')} position={send.distortion} />
            </div>
        </div>

        <div className="track-title">{title}</div>
    </div>
);

export default Track;