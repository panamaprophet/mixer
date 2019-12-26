'use strict';

import FX from './fx-base'
import {fetchAudioAsArrayBuffer} from '/helpers/audio';


const RESPONSE_URL = '/assets/audio/reverb-impulse-response.wav';

export default class Reverb extends FX {
    constructor(context, masterBus) {
        super({
            context,
            masterBus,
            id: 'reverb',
        });

        this.addNode(context.createConvolver());
        this.loadResponse(RESPONSE_URL);
    }

    async loadResponse(url) {
        const arrayBuffer = 
            await fetchAudioAsArrayBuffer(url)
                .catch(error => console.log('[ERROR LOADING RESPONSE]', error));

        if (arrayBuffer.bufferLength > 0) {
            const decodedDataPromise = new Promise((resolve, reject) => 
                this.context.decodeAudioData(arrayBuffer, resolve, reject));

            this.tweakNode(0, 'buffer', await decodedDataPromise);
        } else {
            console.log('[ERROR LOADING RESPONSE] arrayBuffer is empty');
        }
    }
}