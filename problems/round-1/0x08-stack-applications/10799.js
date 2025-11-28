const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('');

let cnt = 0;
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

const size = () => pos;

const pop = () => {
    if (pos > 0) {
        pos--;
        return stack[pos];
    }
};

// 레이저면 -> stack 크기만큼 잘림
// 쇠가 끝나는 ')'면 하나만 잘리고 쇠 개수가 1적어짐

for (let i = 0; i < input.length; i++) {
    // 여는 괄호인 경우
    if (input[i] === '(') {
        // 레이저인 경우
        if (input[i + 1] === ')') {
            cnt += size();
            i += 1;
        } else {
            //쇠인 경우
            push('(');
        }
    } else {
        // 닫는 괄호인 경우
        cnt++;
        pop();
    }
}

console.log(cnt);
