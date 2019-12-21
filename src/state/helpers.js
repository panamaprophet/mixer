import {
    getNodeParamNormalizedValue,
} from '/helpers/node';


export const STATUS = {
    'PLAYING': 'PLAYING',
    'PAUSED': 'PAUSED',
};


const createTrackEntity = ({id, title, volume, muted, bypassFX, playing, fx}) => ({
    id,
    title,
    volume,
    isMuted: muted,
    isEffectsDisabled: bypassFX,
    isPlaying: playing,
    send: {
        delay: getNodeParamNormalizedValue(fx.delay.gain),
        reverb: getNodeParamNormalizedValue(fx.reverb.gain),
        distortion: getNodeParamNormalizedValue(fx.distortion.gain),
    },
});

const createEffectEntity = ({id, ...rest}) => ({
    id,
    rest,
});


export const createState = mixdesk => {
    const tracks = mixdesk.tracks.map(createTrackEntity);
    const effects = mixdesk.fx.map(createEffectEntity);
    const analyser = mixdesk.analyser;

    const controls = {
        analyser,
        status: STATUS.PAUSED,
    };

    return {
        tracks,
        effects,
        controls,
    };
};