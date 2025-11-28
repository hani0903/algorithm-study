const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('');

const stack = [];
let pos = 0;

const isEmpty = () => pos === 0;
const push = (data) => (stack[++pos] = data);
const peek = () => (isEmpty() ? undefined : stack[pos]);
const pop = () => (isEmpty() ? undefined : stack[pos--]);
const size = () => pos;

const isPair = (open, close) => {
    if (open === '(') return close === ')';
    else if (open === '[') return close === ']';
};

const solution = () => {
    let total = 0;
    let temp = 1;

    for (let i = 0; i < input.length; i++) {
        // 여는 소괄호
        if (input[i] === '(') {
            push('(');
            temp *= 2;
        } else if (input[i] === '[') {
            // 여는 중괄호
            temp *= 3;
            push('[');
        } else if (input[i] === ')') {
            //닫는 소괄호
            if (isEmpty() || peek() !== '(') {
                // 올바르지 않은 괄호쌍
                // 스택이 비었거나 쌍이 틀린 경우
                console.log(0);
                return;
            }

            total += temp;
            temp /= 2;
            pop();
        } else if (input[i] === ']') {
            //닫는 괄호
            if (isEmpty() || peek() !== '[') {
                // 올바르지 않은 괄호쌍
                // 스택이 비었거나 쌍이 틀린 경우
                console.log(0);
                return;
            }
            total += temp;
            temp /= 3;
            pop();
        }
    }

    if (!isEmpty()) {
        console.log(0);
    } else {
        console.log(total);
    }
};
solution();
