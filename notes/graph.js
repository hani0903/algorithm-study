class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex){
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
        return this;
    }

    removeVertex(vertex){
        for(let v of this.adjacencyList[vertex]) {
            this.removeEdge(vertex, v);
        }

        //vertex 삭제
        delete this.adjacencyList[vertex];

        return this;
    }

    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);

        return this;
    }

    removeEdge(v1, v2) {
        
        this.adjacencyList[v1] = this.adjacencyList[v1].filter((v)=> v !==v2);
        this.adjacencyList[v2] = this.adjacencyList[v2].filter((v)=> v !==v1);

        return this;
    }
}

let graph = new Graph();
console.log(graph.addVertex('Dallas'));
console.log(graph.addVertex('Tokyo'));
console.log(graph.addVertex('Aspen'));

console.log(graph.addEdge('Dallas', 'Tokyo'));
console.log(graph.addEdge('Dallas', 'Aspen'));
console.log(graph.removeEdge('Dallas', 'Tokyo'));
console.log(graph.removeVertex('Dallas'));
