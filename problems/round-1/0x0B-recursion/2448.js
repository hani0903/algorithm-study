/**
 * BOJ 2448 - 별 찍기 -11
 * https://www.acmicpc.net/problem/2448
 *
 * 회독: 1회독
 * 날짜: 2025-11-28
 * 알고리즘: 재귀
 * 난이도: Gold 4
 *
 * 시간복잡도:
 * 공간복잡도:
 *
 * 소요 시간: 1시간 (풀이 확인)
 *
 * 풀이 접근:
 * -
 * -
 */

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const N = Number(fs.readFileSync(filePath, 'utf-8').trim());

const width = 2 * N - 1;
const arr = Array.from({ length: N }, () => Array(width).fill(' '));

function drawTriangle(row, col, size) {
    if (size === 3) {
        arr[row][col] = '*';
        arr[row + 1][col - 1] = '*';
        arr[row + 1][col + 1] = '*';
        arr[row + 2][col - 2] = '*';
        arr[row + 2][col - 1] = '*';
        arr[row + 2][col] = '*';
        arr[row + 2][col + 1] = '*';
        arr[row + 2][col + 2] = '*';
        return;
    }

    const half = size / 2;

    // 위쪽 삼각형
    drawTriangle(row, col, half);

    // 왼쪽 아래 삼각형
    drawTriangle(row + half, col - half, half);

    // 오른쪽 아래 삼각형
    drawTriangle(row + half, col + half, half);
}

drawTriangle(0, Math.floor(width / 2), N);

console.log(arr.map((line) => line.join('')).join('\n'));
