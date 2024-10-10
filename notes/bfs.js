class Node{
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {

    constructor(){
        this.root = null;        
    }

    add(value) {
        //노드가 아예 없다면
        if(this.root === null) {
            this.root = new Node(value);
            return this;
        }

        //루트가 있다면 자리 찾기
        let current = this.root;
        while(true) {

            //작다면 왼쪽으로
            if(value < current.value) {
                if(current.left === null) {
                    current.left = new Node(value);
                    return this;
                }
                current = current.left;

            }else if(value > current.value) {
                if(current.right === null) {
                    current.right = new Node(value);
                    return this;
                }
                current = current.right;                

            }else{
                return;
            }
        }
    }

    BFS() {
        let current = this.root;
        const queue = [];
        const visited = [];        
        queue.push(current);

        while(queue.length) {

            current = queue.shift();
            visited.push(current.value);
    
            if(current.left !== null){
                queue.push(current.left);
            }
    
            if(current.right !== null){
                queue.push(current.right);
            }            
        }

        return visited;
    }
}

const bst = new BinarySearchTree();

//체크 다 함
bst.add(10);
bst.add(15);
bst.add(6);
bst.add(8);
bst.add(20);
console.log(bst.add(3));

console.log(bst.BFS());







