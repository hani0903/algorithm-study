// class Graph{
//     constructor(){
//         this.adjacencyList = {};
//     }
//     addVertex(vertex){
//         if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
//     }
//     addEdge(v1,v2){
//         this.adjacencyList[v1].push(v2);
//         this.adjacencyList[v2].push(v1);
//     }

//     breadthFirst(start){
//         const queue = [start];
//         const result = [];
//         const visited = {};
//         visited[start] = true;

//         let currentVertex;

//         while(queue.length) {
//             currentVertex = queue.shift();
//             result.push(currentVertex);

//             this.adjacencyList[currentVertex].forEach(neighbor => {
//                 if(!visited[neighbor]){
//                     visited[neighbor] = true;
//                     queue.push(neighbor);
//                 }
//             });
//         }
//         return result;
//     }
// }

function solution() {

    let input = '101111\n101010\n101011\n111011'.split('\n');

    let graph = [];

    for(i of input) {
        graph.push(input.split(''));
    }

    console.log(graph);
}

solution();
