const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const [first, ...input] = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

const [N, M] = first.split(' ').map(Number);
let res = 0;
let max = 0;

// 1로 연결된 걸 하나의 그림으로 정의

const solution = () => {
    const board = [];
    input.forEach((line) => board.push(line.split(' ').map(Number)));
    const vis = Array.from({ length: N }, () => Array.from({ length: M }, () => false));

    const BFS = (sx, sy) => {
        // console.log(sx, sy);
        const queue = [];
        const dx = [1, -1, 0, 0];
        const dy = [0, 0, 1, -1];

        queue.push([sx, sy]);
        vis[sx][sy] = true;
        let size = 1;

        while (queue.length) {
            const [cx, cy] = queue.shift();

            for (let i = 0; i < 4; i++) {
                const nx = cx + dx[i];
                const ny = cy + dy[i];

                if (nx >= N || nx < 0 || ny >= M || ny < 0) continue;
                if (vis[nx][ny] || board[nx][ny] === 0) continue;

                vis[nx][ny] = true;
                // console.log(nx, ny);
                queue.push([nx, ny]);
                size++;
            }
        }
        res++;
        if (max < size) max = size;

        // console.log('----------');
    };

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (!vis[i][j] && board[i][j]) {
                BFS(i, j);
            }
        }
    }

    console.log(res);
    console.log(max);
};

solution(res);
