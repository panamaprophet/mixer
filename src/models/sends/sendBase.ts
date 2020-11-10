import {last, head} from 'ramda';
import {setNodeParams, connectNodes, connectNodesSingle, createGainNode, setNodeParamNormalizedValue, getNodeParamNormalizedValue} from '/helpers/node';
import type {SendId, SendParamValue} from './index';


type ConstructorParams = {
    id: SendId;
    context: AudioContext;
    masterBus: GainNode;
}

interface SendInterface {
    id: SendId;
    signalIn: GainNode;
    signalOut: GainNode;
}


export class SendBase implements SendInterface {
    [key: string]: unknown;
    id: SendId;
    signalIn: GainNode;
    signalOut: GainNode;

    #isLooped = false;

    protected context: AudioContext;
    protected chain: AudioNode[] = [];

    constructor({id, context, masterBus}: ConstructorParams) {
        this.id = id;
        this.context = context;
        this.signalIn = createGainNode(context);
        this.signalOut = createGainNode(context);

        connectNodes(this.signalOut, masterBus);
    }

    get gain(): number {
        return getNodeParamNormalizedValue(this.signalIn.gain);
    }

    set gain(value: number) {
        setNodeParamNormalizedValue(this.signalIn.gain, value);
    }

    set loop(value: boolean) {
        const lastNode = last<AudioNode>(this.chain);
        const firstNode = head<AudioNode>(this.chain);

        // @todo: consider additional check here for lastNode !== firstNode
        if (lastNode && firstNode) {
            connectNodes(lastNode, firstNode);
        }

        this.#isLooped = value;
    }

    get loop(): boolean {
        return this.#isLooped;
    }

    addNode(node: AudioNode, parameters: Record<string, SendParamValue> = {}): void {
        setNodeParams(node, parameters);

        if (this.chain.length === 0) {
            connectNodes(this.signalIn, node);
        } else {
            const lastNode = last(this.chain);

            if (lastNode) {
                connectNodesSingle(lastNode, node);
            }
        }

        connectNodes(node, this.signalOut);

        this.chain.push(node);
    }

    updateNode(nodeIndex: number, params: Record<string, SendParamValue>): AudioNode | null {
        const node = this.chain[nodeIndex];

        if (!node) {
            return null;
        }

        Object.keys(params).map(name => setNodeParams(node, {[name]: params[name]}));

        return node;
    }
}