import {createPanner, fetchAudioAsArrayBuffer} from '/helpers/audio';
import {generateIdByTitle} from '/helpers/entities';
import {connectNodes, createGainNode, getNodeParamNormalizedValue, setNodeParamNormalizedValue} from '/helpers/node';
import type {SendId, Send} from './sends/index';


export type TrackId = string;

export enum TrackState {
    NOT_SET,
    LOADING,
    READY,
    FAILED,
}

export type TrackSource = {
    url: string,
    title: string,
}

export interface TrackInterface {
    id: TrackId,
    title: string,
    sends: Record<SendId, GainNode>,
    isMuted: boolean,
    isPlaying: boolean,
    isSendsEnabled: boolean,
    state: TrackState,
    loadPromise: Promise<TrackState>,
    addSend: (send: Send) => GainNode | null,
    load: (url: string) => void,
    play: () => void,
    pause: () => void,
    stop: () => void,
    mute: () => void,
    unmute: () => void,
    toggleMute: () => boolean,
    setSendLevel(id: SendId, value: number): void,
}

type TrackProps = {
    url: string,
    title: string,
    context: AudioContext,
    masterBus: GainNode,
    sends: Send[],
}

export class Track implements TrackInterface {
    id: TrackId;
    title: string;

    #context: AudioContext;
    #panner: StereoPannerNode;
    #bus: GainNode;
    #source: AudioBufferSourceNode | null = null;
    #buffer: AudioBuffer | null = null;

    sends: Record<SendId, GainNode> = {};
    #sendLevels: Record<SendId, number> = {};

    #pausedAt = 0;
    #startedAt = 0;
    #previousVolume = 0;

    isMuted = false;
    isPlaying = false;
    isSendsEnabled = true;

    state = TrackState.NOT_SET;
    loadPromise: Promise<TrackState> = Promise.resolve(this.state);


    constructor({url, title, context, masterBus, sends = []}: TrackProps) {
        this.id = generateIdByTitle(title);
        this.title = title;
        this.#context = context;
        this.#bus = createGainNode(context);
        this.#panner = createPanner(context);

        connectNodes(this.#bus, this.#panner);
        connectNodes(this.#panner, masterBus);

        sends.map(send => this.addSend(send));

        void this.load(url);
    }

    get volume(): number {
        return getNodeParamNormalizedValue(this.#bus.gain);
    }

    set volume(value: number) {
        if (this.isMuted) {
            this.#previousVolume = value;
        } else {
            setNodeParamNormalizedValue(this.#bus.gain, value);
        }
    }

    get pan(): number {
        return getNodeParamNormalizedValue(this.#panner.pan);
    }

    set pan(value: number) {
        setNodeParamNormalizedValue(this.#panner.pan, value);
    }

    addSend({id, signalIn}: Send): GainNode | null {
        if (this.sends[id]) {
            return null;
        }

        const bus = createGainNode(this.#context, 0);

        connectNodes(this.#bus, bus);
        connectNodes(bus, signalIn);

        this.sends[id] = bus;

        return bus;
    }

    removeSend(id: SendId): void {
        const send = this.sends[id];

        send?.disconnect();
    }

    toggleSends(): boolean {
        const sendIds = Object.keys(this.sends);

        sendIds.forEach(sendId => {
            const send = this.sends[sendId];

            if  (this.isSendsEnabled) {
                this.#sendLevels[sendId] = getNodeParamNormalizedValue(send.gain);
                setNodeParamNormalizedValue(send.gain, 0);
            } else {
                setNodeParamNormalizedValue(send.gain, this.#sendLevels[sendId]);
            }
        });

        this.isSendsEnabled = !this.isSendsEnabled;

        return this.isSendsEnabled;
    }

    async load(url: string): Promise<TrackState> {
        this.state = TrackState.LOADING;

        this.loadPromise = new Promise((resolve) => {
            fetchAudioAsArrayBuffer(url)
                .then(arrayBuffer => this.#context.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    this.#buffer = audioBuffer;
                    this.state = TrackState.READY;
                })
                .catch(error => {
                    this.state = TrackState.FAILED;
                    console.log('[ERROR LOADING TRACK]', error);
                })
                .finally(() => {
                    resolve(this.state);
                });
            });

        return this.loadPromise;
    }

    play(): void {
        if (this.isPlaying) {
            return;
        }

        this.#source = this.#context.createBufferSource();
        this.#source.buffer = this.#buffer;
        this.#source.connect(this.#bus);
        this.#source.start(0, this.#pausedAt);

        this.#startedAt = this.#context.currentTime - this.#pausedAt;
        this.#pausedAt = 0;
        this.isPlaying = true;
    }

    pause(): void {
        if (this.isPlaying) {
            const elapsed = this.#context.currentTime - this.#startedAt;
            this.stop();
            this.#pausedAt = elapsed;
        }
    }

    stop(): void {
        if (this.#source) {
            this.#source.disconnect();
            this.#source.stop(0);
            this.#source = null;
        }

        this.#pausedAt = 0;
        this.#startedAt = 0;
        this.isPlaying = false;
    }


    mute(): void {
        this.#previousVolume = this.volume;
        this.volume = 0;
        this.isMuted = true;
    }

    unmute(): void {
        this.isMuted = false;
        this.volume = this.#previousVolume;
    }

    toggleMute(): boolean {
        if (this.isMuted) {
            this.unmute();
        } else {
            this.mute();
        }

        return this.isMuted;
    }

    setSendLevel(id: SendId, value: number): void {
        const send = this.sends[id];

        setNodeParamNormalizedValue(send.gain, value);
    }
}