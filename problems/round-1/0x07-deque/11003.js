const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

const [N, L] = input[0].split(' ').map(Number);
const A = input[1].split(' ').map(Number);

const deq = [];

let head = 0;
let tail = 0;

const push_back = (data) => {
    deq[tail++] = data;
};

const pop_front = () => {
    if (tail === head) return undefined;
    return deq[head++];
};

const pop_back = () => {
    if (tail === head) return undefined;
    return deq[--tail];
};

const front = () => {
    if (tail === head) return undefined;
    return deq[head];
};

const back = () => {
    if (tail === head) return undefined;
    return deq[tail - 1];
};

const size = () => tail - head;

const solution = () => {
    let result = [];

    for (let i = 0; i < N; i++) {
        // deq의 맨 앞 원소의 인덱스가 i - L보다 작다면 제거
        if (size() > 0 && front() <= i - L) {
            pop_front();
        }

        // deq에 요소가 존재하며 가장 뒤 요소의 값이 A_i보다 크거나 같다면
        while (size() > 0 && A[back()] >= A[i]) {
            pop_back(); // 모두 제거
        }

        // 새로운 숫자를 뒤에 추가
        push_back(i); // [인덱스, 값] 형태로 저장

        result.push(A[front()]); // 현재 구간의 최솟값은 항상 deq의 맨 앞 원소
        if ((i + 1) % 10000 === 0) {
            process.stdout.write(result.join(' ') + ' ');
            result = [];
        }
    }

    console.log(result.join(' '));
};

solution();
