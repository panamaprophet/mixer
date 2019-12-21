'use strict';

import {fetchAudioAsArrayBuffer} from '/helpers/audio';
import {
    connectNodes,
    createGainNode,
    getNodeParamNormalizedValue,
    setNodeParamNormalizedValue,
} from '/helpers/node';


const generateIdByTitle = title => title.replace(/[^A-Za-z]+/gi, '').toLowerCase();


class Track {
    constructor({url, title, context, masterBus}) {
        this.id = generateIdByTitle(title);

        this.source = null;
        this.buffer = null;

        this.title = title;
        this.context = context;

        this.pausedAt = 0;
        this.startedAt = 0;

        this.muted = false;
        this.playing = false;
        this.ready = false;
        this.bypassFX = false;

        this.fx = {};

        this.bus = createGainNode(context);
        connectNodes(this.bus, masterBus);

        this.loadingState = this.load(url);
    }


    get volume() {
        return getNodeParamNormalizedValue(this.bus.gain);
    }

    set volume(value) {
        if (this.muted) {
            this.previousVolume = value;
        } else {
            setNodeParamNormalizedValue(this.bus.gain, value);
        }
    }

    load(url) {
        return fetchAudioAsArrayBuffer(url)
            .then(audioBuffer => this.context.decodeAudioData(audioBuffer))
            .then(decodedAudioData => {
                this.buffer = decodedAudioData;
                this.ready = true;

                console.log('Track "%s" is ready', this.title);

                return this;
            })
            .catch(error => console.log('[ERROR LOADING TRACK]', error));
    }


    play() {
        if (this.playing) {
            return false;
        }

        this.source = this.context.createBufferSource()
        this.source.buffer = this.buffer
        this.source.connect(this.bus)
        this.source.start(0, this.pausedAt)

        this.startedAt = this.context.currentTime - this.pausedAt
        this.pausedAt = 0
        this.playing = true
    }

    pause() {
        const elapsed = this.context.currentTime - this.startedAt;
        this.stop();
        this.pausedAt = elapsed;
    }

    stop() {
        if (this.source) {
            this.source.disconnect()
            this.source.stop(0)
            this.source = null
        }

        this.pausedAt = 0
        this.startedAt = 0
        this.playing = false
    }

    mute() {
        this.previousVolume = this.volume;
        this.volume = 0;
        this.muted = true;
    }

    unmute() {
        this.muted = false;
        this.volume = this.previousVolume;
    }

    toggleMute() {
        this.muted ? this.unmute() : this.mute();
    }

    addFx(effects) {
        return effects.map(fx => {
            const {id, signalIn} = fx;
            const bus = createGainNode(this.context, 0);

            if (this.fx[id]) {
                return false;
            }

            connectNodes(this.bus, bus);
            connectNodes(bus, signalIn);

            this.fx[id] = bus;

            return bus;
        });
    }

    removeFx(id) {
        this.fx[id].disconnect();
    }

    toggleFX() {
        const fxNames = Object.keys(this.fx)

        if (this.bypassFX) {

            fxNames.forEach(fxName => {
                this.fx[fxName].gain.value = this.fx[fxName].previousVolume
            })

        } else {

            fxNames.forEach(fxName => {
                this.fx[fxName].previousVolume = this.fx[fxName].gain.value
                this.fx[fxName].gain.value = 0
            })

        }

        this.bypassFX = !this.bypassFX
    }
}


export default Track