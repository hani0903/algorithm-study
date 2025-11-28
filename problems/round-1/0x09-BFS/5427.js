const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const [num, ...input] = fs
    .readFileSync(filePath, 'UTF-8')
    .toString()
    .trim()
    .split('\n')
    .map((str) => str.trim())
    .filter((str) => str.length > 0);

const checkPositions = (board, firesArr, exitsArr) => {
    let sang = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === '@') sang = [i, j];
            else if (board[i][j] === '*') firesArr.push([i, j]);
            else if ((i === 0 || i === board.length - 1 || j === 0 || j === board[i].length - 1) && board[i][j] === '.')
                exitsArr.push([i, j]);
        }
    }
    return sang;
};

const BFS = (board, visited, initialArr) => {
    if (initialArr.length === 0) return;
    let head = 0;
    const queue = [];

    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];

    initialArr.forEach(([r, c]) => {
        queue.push([r, c]);
        visited[r][c] = 0;
    });

    while (head < queue.length) {
        const [cx, cy] = queue[head++];

        for (let i = 0; i < 4; i++) {
            const nx = cx + dx[i];
            const ny = cy + dy[i];

            if (nx < 0 || nx >= board.length || ny < 0 || ny >= board[0].length) continue;
            if (visited[nx][ny] !== -1 || board[nx][ny] === '#') continue;

            visited[nx][ny] = visited[cx][cy] + 1;

            queue.push([nx, ny]);
        }
    }
};

const solution = () => {
    const T = Number(num);
    const res = [];

    for (let idx = 0; idx < input.length; idx++) {
        const [w, h] = input[idx].split(' ').map(Number);
        const board = input.slice(idx + 1, idx + 1 + h).map((line) => line.split(''));
        const visitedS = Array.from({ length: h }, () => Array(w).fill(-1));
        const visitedF = Array.from({ length: h }, () => Array(w).fill(-1));

        const fires = [];
        const exits = [];

        const sang = checkPositions(board, fires, exits);

        if (sang[0] === 0 || sang[0] === board.length - 1 || sang[1] === 0 || sang[1] === board[0].length - 1) {
            res.push(1);
            idx += h;
            continue;
        }
        BFS(board, visitedS, [sang]);
        BFS(board, visitedF, fires);

        let time = 1000000;

        for (let [x, y] of exits) {
            if (visitedS[x][y] !== -1 && (visitedF[x][y] === -1 || visitedS[x][y] < visitedF[x][y])) {
                if (time > visitedS[x][y]) time = visitedS[x][y];
            }
        }

        if (time === 1000000) res.push('IMPOSSIBLE');
        else res.push(time + 1);

        idx += h;
    }

    console.log(res.join('\n'));
};

solution();
