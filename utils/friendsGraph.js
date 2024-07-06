const mongoose = require('mongoose');
const User = require('../models/User');

class FriendsGraph{
    FriendsadjacencyList;
    
    constructor(){
        this.FriendsadjacencyList = new Map();
    }

    addNode(node){
        if (!this.FriendsadjacencyList.has(node)) {
            this.FriendsadjacencyList.set(node, new Set());
        }
    }

    addEdge(node1,node2){
        if (this.FriendsadjacencyList.has(node1) && this.FriendsadjacencyList.has(node2)) {
            this.FriendsadjacencyList.get(node1).add(node2);
            this.FriendsadjacencyList.get(node2).add(node1);  
        }
    }

    removeEdge(node1, node2) {
        if (this.FriendsadjacencyList.has(node1) && this.FriendsadjacencyList.has(node2)) {
            this.FriendsadjacencyList.get(node1).delete(node2);
            this.FriendsadjacencyList.get(node2).delete(node1);
        }
    }


    getNeighbors(node){
        return this.FriendsadjacencyList.get(node) || new Set();
    }

    hasEdge(node1,node2){
        return this.FriendsadjacencyList.has(node1) && this.FriendsadjacencyList.get(node1).has(node2);
    }
}

const friendsGraph = new FriendsGraph();

async function initializeGraph(){
    const users = await User.find().populate('friends');
    users.forEach(user => {
        friendsGraph.addNode(user._id.toString());
        user.friends.forEach(friend => {
            friendsGraph.addNode(friend._id.toString());
            friendsGraph.addEdge(user._id.toString(), friend._id.toString());
        });
    });
}

initializeGraph().catch(err => console.error('error initializing friends graph: ',err));

async function bfs(start) {
    const queue = [start];
    const visited = {};
    const result = [];
    visited[start] = true;

    while (queue.length) {
        let current = queue.shift();
        result.push(current);

        friendsGraph.getNeighbors(current).forEach(neighbor => {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        });
    }
    return result;
}

module.exports = {
    friendsGraph,
    bfs
}