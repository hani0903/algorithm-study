const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const [N, K] = fs.readFileSync(filePath, 'utf-8').toString().trim().split(' ').map(Number);

const MX = 100000;

const board = Array.from({ length: MX + 1 }).fill(0);
const dist = Array.from({ length: MX + 1 }).fill(-1);

// 포지션 초기화
board[K] = 2;
board[N] = 1;

const d = (num, idx) => {
    switch (idx) {
        case 0:
            return num + 1;
        case 1:
            return num - 1;
        case 2:
            return num * 2;
    }
};

const bfs = (sx) => {
    const dq = [];
    dq.push(sx);
    dist[sx] = 0;

    while (dq.length) {
        const cx = dq.shift();

        // 탈출 조건
        if (cx === K) return dist[cx];

        // 가중치 0: 순간이동
        const teleport = cx * 2;
        if (teleport <= MX && dist[teleport] === -1) {
            dist[teleport] = dist[cx];
            dq.unshift(teleport);
        }

        // 가중치 1: 걷기
        for (const nx of [cx - 1, cx + 1]) {
            if (nx < 0 || nx > MX) continue;
            if (dist[nx] !== -1) continue;

            dist[nx] = dist[cx] + 1;
            dq.push(nx);
        }
    }
};

console.log(bfs(N));
