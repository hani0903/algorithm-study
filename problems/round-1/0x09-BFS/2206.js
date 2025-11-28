const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';

const [line, ...input] = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');
const [N, M] = line.split(' ').map(Number);

const board = [];
const dist = Array.from({ length: N }, () => Array.from({ length: M }, () => Array(2).fill(0)));
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];
let res = -1;

input.forEach((line) => {
    board.push(line.split('').map(Number));
});

dist[0][0][0] = 1;
const Q = [[0, 0, 0]];
let head = 0;

while (head < Q.length) {
    const [cx, cy, broken] = Q[head++];

    if (cx === N - 1 && cy === M - 1) {
        res = dist[cx][cy][broken];
        break;
    }

    for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue; //범위를 벗어나는 경우

        if (board[nx][ny] === 0 && dist[nx][ny][broken] === 0) {
            // 벽이 아닌 경우
            dist[nx][ny][broken] = dist[cx][cy][broken] + 1;
            Q.push([nx, ny, broken]);
        }

        if (board[nx][ny] === 1 && broken === 0 && dist[nx][ny][1] === 0) {
            // 벽인데 아직 안 부순 경우
            dist[nx][ny][1] = dist[cx][cy][0] + 1;
            Q.push([nx, ny, 1]);
            continue;
        }
    }
}

console.log(res);
