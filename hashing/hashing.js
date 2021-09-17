"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
for (let line of poem) {
	createBlock(line)
 }

// Function createBlock
function createBlock(_data){
	let block = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
		data: _data,
		timestamp: Date.now()
	}
	block.hash = blockHash(block)
	Blockchain.blocks.push(block)
	console.log(block)
	return block

}

function verifyChain(Blockchain) {
	const block_length = Blockchain.blocks.length - 1
	let valid = true
	//Blockchain.blocks[7].hash = 'f71f8792459c6f89f409ec82ce724c4027b9711498aee4de48e86257158e3afb';
	Blockchain.blocks.forEach((block,i) => {
		//console.log(i);
		if (i < block_length){
			if (block.hash != Blockchain.blocks[i+1].prevHash){
				valid = false
			}
		}
	})
	return valid;
}


console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************

function blockHash(bl) {
	//let block = JSON.stringify(bl)
	return crypto.createHash("sha256").update(
		// TODO: use block data to calculate hash
		`${bl.index};${bl.prevHash};${bl.data}; ${bl.timestamp};`
	).digest("hex");
}
