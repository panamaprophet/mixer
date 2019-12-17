'use strict';

import FX from './fx-base'
import {RESPONSE_URL} from './constants';
import {fetchAudioAsArrayBuffer} from '/helpers/audio';


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

		if (arrayBuffer) {
			const decodedData = await this.context.decodeAudioData(arrayBuffer);

			this.tweakNode(0, 'buffer', decodedData);
		}
	}
}