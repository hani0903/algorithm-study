const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim();

let board;

function solve(n, x, y) {
    // base condition: 크기가 1이면 별 하나를 찍고 종료
    if (n === 1) {
        board[x][y] = '*';
        return;
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // 중앙 공백 처리
            if (i === 1 && j === 1) continue;

            solve(Math.floor(n / 3), x + Math.floor(n / 3) * i, y + Math.floor(n / 3) * j);
        }
    }
}

const n = Number(input);

board = Array.from({ length: n }, () => Array(n).fill(' '));

// 재귀 함수 호출
solve(n, 0, 0);

for (let i = 0; i < n; i++) {
    console.log(board[i].join(''));
}
