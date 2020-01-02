'use strict';

import {head, keys} from 'ramda';

import FX from './fx-base';
import {fetchAudioAsArrayBuffer} from '/helpers/audio';


const RESPONSES = {
    'Versatile': 'assets/audio/impulse-response/impulse-1.mp3',
    'Pattan': 'assets/audio/impulse-response/impulse-2.mp3',
    'Style': 'assets/audio/impulse-response/impulse-3.mp3',
};

export default class Reverb extends FX {
    constructor(context, masterBus, options = {responses: RESPONSES}) {
        super({
            context,
            masterBus,
            id: 'reverb',
        });

        this.responses = options.responses;
        this.currentResponseId = head(keys(options.responses));

        this.addNode(context.createConvolver());
        this.loadResponse();
    }

    get currentResponse() {
        return this.currentResponseId;
    }

    set currentResponse(responseId) {
        const responseUrl = this.responses[responseId];

        if (responseUrl) {
            this.currentResponseId = responseId;

            this.loadResponse();
        }
    }

    async loadResponse() {
        const url = this.responses[this.currentResponseId];

        const arrayBuffer = 
            await fetchAudioAsArrayBuffer(url)
                .catch(error => console.log('[ERROR LOADING RESPONSE]', error));

        if (arrayBuffer.byteLength > 0) {
            const decodedDataPromise = new Promise((resolve, reject) => 
                this.context.decodeAudioData(arrayBuffer, resolve, reject));

            this.tweakNode(0, 'buffer', await decodedDataPromise);
        } else {
            console.log('[ERROR LOADING RESPONSE] arrayBuffer is empty');
        }
    }
}