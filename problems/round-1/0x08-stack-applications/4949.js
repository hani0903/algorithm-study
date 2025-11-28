const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

const isPair = (open, close) => {
    if (open === '(') {
        return close === ')';
    }
    if (open === '[') {
        return close === ']';
    }
};

const res = [];

for (let idx = 0; idx < input.length - 1; idx++) {
    const stack = [];
    const arr = input[idx].split('').map((i) => i.trim());

    for (let i = 0; i < arr.length; i++) {
        const c = arr[i];

        if (c === '[' || c === '(') {
            stack.push(c);
        } else if (c === ']' || c === ')') {
            const popped = stack.pop();

            if (!isPair(popped, c)) {
                stack.push('no');
                break;
            }
        }
    }

    if (stack.length > 0) {
        res.push('no');
    } else {
        res.push('yes');
    }
}

console.log(res.join('\n'));
