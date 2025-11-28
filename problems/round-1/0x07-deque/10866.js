const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const [_, ...inputs] = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');
const MX = 5000;

const deq = [];
let head = MX;
let tail = MX;

const isEmpty = () => tail - head === 0;
const size = () => tail - head;

const push_front = (data) => {
    if (head <= 0) return;
    deq[--head] = data;
};

const push_back = (data) => {
    if (tail > 2 * MX + 1) return;
    deq[tail++] = data;
};

const pop_front = () => {
    if (isEmpty()) return -1;
    return deq[head++];
};

const pop_back = () => {
    if (isEmpty()) return -1;
    return deq[--tail];
};

const front = () => {
    if (isEmpty()) return -1;
    return deq[head];
};

const back = () => {
    if (isEmpty()) return -1;
    return deq[tail - 1];
};

const solution = () => {
    const answer = [];

    for (let input of inputs) {
        const [cmd, data] = input.trim().split(' ');

        switch (cmd) {
            case 'push_front':
                push_front(data);
                break;
            case 'push_back':
                push_back(data);
                break;
            case 'pop_front':
                answer.push(pop_front());
                break;
            case 'pop_back':
                answer.push(pop_back());
                break;
            case 'size':
                answer.push(size());
                break;
            case 'empty':
                answer.push(Number(isEmpty()));
                break;
            case 'front':
                answer.push(front());
                break;
            case 'back':
                answer.push(back());
                break;
        }
    }

    console.log(answer.join('\n'));
};

solution();
