const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';

const [t, ...input] = fs.readFileSync(filePath, 'utf-8').toString().trim().split('\n');

let lineIdx = 0;

const print = (arr) => {
    console.log(arr.length, 'by', arr[0].length);
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].join(' '));
    }
};

for (let testCase = 1; testCase <= Number(t); testCase++) {
    const [M, N, K] = input[lineIdx].split(' ').map(Number);
    const pos = input.slice(lineIdx + 1, lineIdx + 1 + K).map((line) => line.split(' ').map(Number));
    lineIdx += K + 1;

    const board = Array.from({ length: N }, () => Array.from({ length: M }).fill(0));
    const vis = Array.from({ length: N }, () => Array.from({ length: M }).fill(false));

    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];

    // 배추 위치 보드에 추가
    for (const [py, px] of pos) {
        board[px][py] = 1;
    }

    print(board);

    let areaCnt = 0;
    const Q = [];

    while (pos.length > 0) {
        // 배추의 위치
        const [sy, sx] = pos.shift();

        if (vis[sx][sy]) continue;

        vis[sx][sy] = true;
        Q.push([sx, sy]);

        while (Q.length > 0) {
            const [cx, cy] = Q.shift();

            for (let i = 0; i < 4; i++) {
                const nx = cx + dx[i];
                const ny = cy + dy[i];

                if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue; // 범위를 벗어나는 경우
                if (vis[nx][ny] || board[nx][ny] !== 1) continue; //이미 방문했거나, 배추가 심어진 영역이 아닌 경우

                console.log(`nx: ${nx}, ny: ${ny}`);

                vis[nx][ny] = true;
                Q.push([nx, ny]);
            }
        }

        areaCnt++;
    }

    console.log(areaCnt);
}
