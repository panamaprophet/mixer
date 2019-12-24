'use strict';

import {last, head} from 'ramda';
import {setNodeParams, connectNodes, connectNodesSingle, createGainNode} from '/helpers/node';


class FX {
    constructor({id, context, masterBus}) {
        this.id = id;
        this.isLooped = false;
        this.chain = [];

        this.context = context;

        this.signalIn = createGainNode(context);
        this.signalOut = createGainNode(context);

        connectNodes(this.signalOut, masterBus);
    }

    get isChainEmpty() {
        return this.chain.length === 0;
    }

    get gain() {
        return this.signalIn.gain.value;
    }

    set gain(value) {
        this.signalIn.gain.value = value;
    }

    addNode(node, parameters = {}) {
        setNodeParams(node, parameters);

        this.isChainEmpty
            ? connectNodes(this.signalIn, node)
            : connectNodesSingle(last(this.chain), node);

        connectNodes(node, this.signalOut);

        this.chain.push(node);
    }

    tweakNode(nodeIndex, parameter, value) {
        const node = this.chain[nodeIndex];

        if (!node) {
            return false;
        }

        return setNodeParams(node, {
            [parameter]: value,
        });
    }

    set loop(value) {
        const lastNode = last(this.chain);
        const firstNode = head(this.chain);

        connectNodes(lastNode, firstNode);

        this.isLooped = value;
    }

    get loop() {
        return this.isLooped;
    }
}


export default FX