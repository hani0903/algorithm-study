const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const [first, ...input] = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

const [M, N] = first.split(' ').map(Number);

const oob = (x, y) => {
    return x < 0 || y < 0 || x >= N || y >= M;
};

const board = [];
const dist = Array.from({ length: N }, () => Array.from({ length: M }).fill(-1));
const ripenTomatoes = [];
// 보드 초기화
input.forEach((line) => board.push(line.split(' ').map(Number)));

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (board[i][j] === 1) ripenTomatoes.push([i, j]);
    }
}

const bfs = (ripenTomatoes) => {
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    const queue = [];
    let days = 0;
    let head = 0;

    for (let [x, y] of ripenTomatoes) {
        queue.push([x, y]);
        dist[x][y] = 0;
    }

    while (head < queue.length) {
        const [cx, cy] = queue[head++];

        for (let i = 0; i < 4; i++) {
            const nx = cx + dx[i];
            const ny = cy + dy[i];

            if (oob(nx, ny)) continue;
            if (board[nx][ny] !== 0 || dist[nx][ny] !== -1) continue;

            queue.push([nx, ny]);
            dist[nx][ny] = dist[cx][cy] + 1;
            if (days < dist[nx][ny]) days = dist[nx][ny];
        }
    }

    return days;
};

const days = bfs(ripenTomatoes);

let isAllRipen = true;

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (board[i][j] === 0 && dist[i][j] === -1) isAllRipen = false;
    }
}

if (isAllRipen) {
    console.log(days);
} else {
    console.log(-1);
}
