const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const N = Number(fs.readFileSync(filePath, 'utf-8'));

let head = 0;
let tail = 0;

const queue = [];

const isEmpty = () => head === tail;
const size = () => tail - head;
const push = (data) => {
    queue[tail++] = data;
};

const pop = () => {
    if (isEmpty()) return -1;
    return queue[head++];
};

const init = () => {
    for (let i = 1; i <= N; i++) {
        push(i);
    }
};

const solution = () => {
    init();

    while (size() > 1) {
        pop();

        if (size() <= 1) break;
        const popped = pop();

        push(popped);
    }

    console.log(queue[head]);
};

solution();
