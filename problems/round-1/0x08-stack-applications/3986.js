const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const [_, ...input] = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

let cnt = 0;

for (const line of input) {
    const stack = [];
    let pos = 0;

    const peek = () => {
        if (pos === 0) return -1;
        return stack[pos];
    };

    const push = (c) => {
        stack[++pos] = c;
    };

    const isEmpty = () => {
        return pos === 0;
    };
    const pop = () => {
        if (pos > 0) {
            pos--;
            return stack[pos];
        }
    };

    for (const c of line.trim()) {
        if (isEmpty() || peek() !== c) {
            push(c);
        } else if (!isEmpty() && peek() === c) {
            pop();
        }
    }

    if (isEmpty()) {
        cnt++;
    }
}

console.log(cnt);
