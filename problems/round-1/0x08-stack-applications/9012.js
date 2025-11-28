const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const [_, ...input] = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');
const res = [];

for (let line of input) {
    const stack = [];
    let pos = 0;

    const isEmpty = () => pos === 0;

    const push = (data) => {
        stack[++pos] = data;
    };

    const pop = () => {
        if (isEmpty()) return undefined;
        return stack[pos--];
    };

    const peek = () => {
        if (isEmpty) return undefined;
        return stack[pos];
    };

    for (let i = 0; i < line.length; i++) {
        if (line[i] === '(') {
            push('(');
        } else if (line[i] === ')') {
            if (isEmpty()) {
                push(-1);
                break;
            }
            pop();
        }
    }

    isEmpty() ? res.push('YES') : res.push('NO');
}

console.log(res.join('\n'));
