class Queue {
	constructor() {
		this._oldestIndex = 1;
		this._newestIndex = 1;
		this._storage = {};
	}
	
	enqueue(value) {
		const newestIndex = this._newestIndex;
		this._storage[newestIndex] = value;
		
		this._newestIndex++;
	}
	
	dequeue() {
		const newestIndex = this._newestIndex,
		 oldestIndex = this._oldestIndex;
		let deletedData = null;
		 
		 if(newestIndex !== oldestIndex) {
			deletedData = this._storage[oldestIndex];
			delete this._storage[oldestIndex];
			this._oldestIndex++;
			
			return deletedData;
			 
		 }
	}
}

class Node{
	constructor(value) {
		this.data = value;
		this.parent = null;
		this.children = [];
	}
}
 
class Tree {
	constructor(value) {
		let node = new Node(value);
        this._root = node;
	}

 
	traverseDF(callback) {
 
		// this is a recurse and immediately-invoking function
		(function recurse(currentNode) {
			// step 2
			console.log(currentNode,currentNode.children.length);
			for (var i = 0, length = currentNode.children.length; i < length; i++) {
				// step 3
				
				recurse(currentNode.children[i]);
			}
 
			// step 4
			console.log(currentNode,currentNode.children.length);
			callback(currentNode);
 
			// step 1
		})(this._root);
 
	}
 
	traverseBF(callback) {
		let queue = new Queue();
 
		queue.enqueue(this._root);
		
		let currentNode = queue.dequeue();
		
		while(currentNode){
			for (var i = 0, length = currentNode.children.length; i < length; i++) {
				queue.enqueue(currentNode.children[i]);
			}
			
			callback(currentNode);
			currentNode = queue.dequeue();
		}
	}
 
	contains(callback, traversal) {
		traversal.call(this, callback);
	}
 
	add(data, toData, traversal) {
		let node = new Node(data),
        parent = null;
		
		const callback = function (node) {
            if (node.data === toData) {
                parent = node;
            }
        };
 
		this.contains(callback, traversal);
 
		if (parent) {
			parent.children.push(child);
			child.parent = parent;
		} else {
			throw new Error('Cannot add node to a non-existent parent.');
		}
	};
 
	remove = function(data, fromData, traversal) {
		const tree = this;
		let parent = null,
        childToRemove = null,
        index;
 
		const callback = function (node) {
			if (node.data === fromData) {
				parent = node;
			}
		};
 
		this.contains(callback, traversal);
 
		if (parent) {
			index = findIndex(parent.children, data);
	
			if (index === undefined) {
				throw new Error('Node to remove does not exist.');
			} else {
				childToRemove = parent.children.splice(index, 1);
			}
		} else {
			throw new Error('Parent does not exist.');
		}
 
		return childToRemove;
	};
}
 
const findIndex = function (arr, data) {
	let index;

	for (var i = 0; i < arr.length; i++) {
		if (arr[i].data === data) {
			index = i;
		}
	}

	return index;
}

	const log = function (node) {
		console.log(node.data);
	}

var tree = new Tree('one');
 
tree._root.children.push(new Node('two'));
tree._root.children[0].parent = tree._root;
 
tree._root.children.push(new Node('three'));
tree._root.children[1].parent = tree;
 
tree._root.children.push(new Node('four'));
tree._root.children[2].parent = tree;
 
tree._root.children[0].children.push(new Node('five'));
tree._root.children[0].children[0].parent = tree._root.children[0];
 
tree._root.children[0].children.push(new Node('six'));
tree._root.children[0].children[1].parent = tree._root.children[0];
 
tree._root.children[2].children.push(new Node('seven'));
tree._root.children[2].children[0].parent = tree._root.children[2];