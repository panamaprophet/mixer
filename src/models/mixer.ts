import {createContext, createAnalyser, createMasterBus, isContextRunning, resumeContext} from '/helpers/audio';
import {playAll, pauseAll, rewindAll, stopAll} from '/helpers/playback';
import {Track} from './track';
import type {TrackId, TrackSource} from './track';
import type {SendId, SendParamValue, Send, SendConstructor} from './sends/index';


interface MixerInterface {
    analyser: AnalyserNode;
}


export class Mixer implements MixerInterface {
    #context: AudioContext;
    #masterBus: GainNode;
    analyser: AnalyserNode;
    sends: Send[] = [];
    tracks: Track[] = [];

    constructor(sources: TrackSource[] = [], sends: SendConstructor[] = []) {
        this.#context = createContext();
        this.analyser = createAnalyser(this.#context);
        this.#masterBus = createMasterBus(this.#context, [this.analyser]);

        sends.forEach(send => {
            this.sends.push(new send(this.#context, this.#masterBus));
        });

        void this.load(sources);
    }

    /**
     * @returns {Promise<Mixer>}
     */
    async play(): Promise<this> {
        if (isContextRunning(this.#context) === false) {
            await resumeContext(this.#context);
        }

        playAll(this.tracks);

        return Promise.resolve(this);
    }

    /**
     * @returns {Promise<Mixer>}
     */
    pause(): Promise<this> {
        pauseAll(this.tracks);

        return Promise.resolve(this);
    }

    /**
     * @returns {Promise<Mixer>}
     */
    rewind(): Promise<this> {
        rewindAll(this.tracks);

        return Promise.resolve(this);
    }

    /**
     * @returns {Promise<Mixer>}
     */
    stop(): Promise<this> {
        stopAll(this.tracks);

        return Promise.resolve(this);
    }

    /**
     * @param {TrackId} id
     * @param {number} volume
     * @returns {Promise<Track[]>}
     */
    setTrackVolume(id: TrackId, volume: number): Promise<this> {
        this.tracks.map(track => {
            if (track.id === id) {
                track.volume = volume;
            }

            return track;
        });

        return Promise.resolve(this);
    }

    /**
     *
     * @param {TrackId} id
     * @param {SendId} sendId
     * @param {number} level
     * @returns {Promise<Track[]>}
     */
    setTrackSendLevel(id: TrackId, sendId: SendId, level: number): Promise<this> {
        this.tracks.map(track => {
            if (track.id === id) {
                track.setSendLevel(sendId, level);
            }

            return track;
        });

        return Promise.resolve(this);
    }

    /**
     * @param {TrackId} id
     * @param {number} value
     * @returns {Promise<Track[]>}
     */
    setTrackPanLevel(id: TrackId, value: number): Promise<this> {
        this.tracks.map(track => {
            if (track.id === id) {
                track.pan = value;
            }

            return track;
        });

        return Promise.resolve(this);
    }

    /**
     * @param {TrackId} id
     * @returns {Promise<Track[]>}
     */
    toggleTrack(id: TrackId): Promise<this> {
        this.tracks.map(track => {
            if (track.id === id) {
                track.toggleMute();
            }

            return track;
        });

        return Promise.resolve(this);
    }

    /**
     * @param {TrackId} id
     * @returns {Promise<Track[]>}
     */
    toggleTrackFx(id: TrackId): Promise<this> {
        this.tracks.map(track => {
            if (track.id === id) {
                track.toggleSends();
            }

            return track;
        });

        return Promise.resolve(this);
    }

    /**
     *
     * @param {SendId} sendId
     * @param {number|string} value
     * @retruns {Promise<Send[]>}
     */
    setSendParamValue(sendId: SendId, parameterId: string, value: SendParamValue): Promise<this> {
        this.sends.map(send => {
            if (send.id === sendId) {
                send[parameterId] = value;
            }

            return send;
        });

        return Promise.resolve(this);
    }

    load(sources: TrackSource[]): Promise<this> {
        this.tracks = sources.map(({url, title}) => new Track({
            url,
            title,
            context: this.#context,
            masterBus: this.#masterBus,
            sends: this.sends,
        }));

        const trackLoadingPromises = this.tracks.map(({loadPromise}) => loadPromise);

        return Promise.all(trackLoadingPromises).then(() => this);
    }
}