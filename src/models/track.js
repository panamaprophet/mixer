'use strict';

import {generateIdByTitle} from '/helpers/entities';
import {fetchAudioAsArrayBuffer} from '/helpers/audio';

import {
    connectNodes,
    createGainNode,
    getNodeParamNormalizedValue,
    setNodeParamNormalizedValue,
} from '/helpers/node';

import {
    TRACK_STATE,
} from '/constants';

/**
 * @typedef {string} TrackId
 */

 /**
  * @typedef {string} SendId
  */

/**
 * @typedef {Object} Track
 * @property {number} volume — value normalized between 0 .. 100
 * @property {string} title
 * @property {TrackId} id
 */


class Track {
    constructor({url, title, context, masterBus, sends = []}) {
        this.id = generateIdByTitle(title);

        this.source = null;
        this.buffer = null;

        this.title = title;
        this.context = context;

        this.pausedAt = 0;
        this.startedAt = 0;

        this.muted = false;
        this.playing = false;
        this.bypassFX = false;

        this.state = TRACK_STATE.NOT_SET;
        
        this.bus = createGainNode(context);
        connectNodes(this.bus, masterBus);

        this.fx = {};
        
        if (sends.length > 0) {
            this.addFx(sends);
        }

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
            .then(audioBuffer => {
                return new Promise((resolve, reject) => 
                    this.context.decodeAudioData(audioBuffer, resolve, reject));
            })
            .then(decodedAudioData => {
                this.buffer = decodedAudioData;
                this.state = TRACK_STATE.READY;

                return this;
            })
            .catch(error => {
                this.state = TRACK_STATE.FAILED;

                console.log('[ERROR LOADING TRACK]', error);

                return this;
            });
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
        if (this.playing) {
            const elapsed = this.context.currentTime - this.startedAt;
            this.stop();
            this.pausedAt = elapsed;
        }
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
        const keys = Object.keys(this.fx);

        this.bypassFX
            ? keys.map(fxId => this.fx[fxId].gain.value = this.fx[fxId].previousVolume)
            : keys.map(fxId => {
                this.fx[fxId].previousVolume = this.fx[fxId].gain.value;
                this.fx[fxId].gain.value = 0;
            });

        this.bypassFX = !this.bypassFX;

        return this.bypassFX;
    }
}


export default Track