'use strict'


class FX {

	constructor(context, masterBus){

		this.context = context
		this.looped = false
		this.nodes = []


		this.signalIn = context.createGain()
		this.signalIn.gain.value = 1

		this.signalOut = context.createGain()
		this.signalOut.gain.value = 1


		this.signalOut.connect(masterBus)
	}


	get gain(){

		return this.signalIn.gain.value
	}

	set gain(value){

		this.signalIn.gain.value = value
	}


	addNode(node, parameters){


		let lastNode = this.nodes[this.nodes.length - 1]

		this.nodes.push(node)


		if (parameters){

			let names = Object.keys(parameters)
			let nodeIndex = this.nodes.length - 1

			names.forEach(name => this.tweakNode(nodeIndex, name, parameters[name]))
		}


		if (lastNode){

			lastNode.disconnect()
			lastNode.connect(node)

		} else {

			this.signalIn.connect(node)

		}

		node.connect(this.signalOut)
	}

	tweakNode(nodeIndex, parameter, value){


		let node = this.nodes[nodeIndex]


		if (node[parameter] instanceof AudioParam){

			node[parameter].value = value

		} else {

			node[parameter] = value

		}
	}


	loop(){

		this.nodes[this.nodes.length - 1].connect(this.nodes[0])

		this.looped = true
	}
}


export default FX