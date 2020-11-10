import {head, keys} from 'ramda';
import {SendBase} from './sendBase';
import {fetchAudioAsArrayBuffer} from '/helpers/audio';


const RESPONSES: Record<string, string> = {
    'Versatile': 'assets/audio/impulse-response/impulse-1.mp3',
    'Pattan': 'assets/audio/impulse-response/impulse-2.mp3',
    'Style': 'assets/audio/impulse-response/impulse-3.mp3',
};

export class Reverb extends SendBase {
    responses: Record<string, string>;
    #currentResponseId: string;

    constructor(context: AudioContext, masterBus: GainNode, options = {responses: RESPONSES}) {
        super({context, masterBus, id: 'reverb'});

        this.responses = options.responses;
        this.#currentResponseId = head(keys(options.responses)) || '';

        this.addNode(context.createConvolver());
        void this.loadResponse();
    }

    get currentResponse(): string {
        return this.#currentResponseId;
    }

    set currentResponse(responseId: string) {
        const responseUrl = this.responses[responseId];

        if (responseUrl) {
            this.#currentResponseId = responseId;

            void this.loadResponse();
        }
    }

    async loadResponse(): Promise<void> {
        try {
            const url = this.responses[this.#currentResponseId];
            const arrayBuffer = await fetchAudioAsArrayBuffer(url);
            const audioBuffer = await this.context.decodeAudioData(arrayBuffer);

            this.updateNode(0, {buffer: audioBuffer});
        } catch (error) {
            console.log('[ERROR LOADING RESPONSE]', error);
        }
    }
}