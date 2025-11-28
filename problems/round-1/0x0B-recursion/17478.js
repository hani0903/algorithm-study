/**
 * BOJ 17478 - 재귀함수가 뭔가요?
 * https://www.acmicpc.net/problem/17478
 *
 * 회독: 1회독
 * 날짜: 2025-11-28
 * 알고리즘: 재귀
 * 난이도: Silver 5
 *
 * 시간복잡도:
 * 공간복잡도:
 *
 * 소요 시간: 25분
 *
 * 풀이 접근:
 * - 종료 조건: 교수님이 원하는 재귀 횟수에 도달한 경우
 * - 입력값의 변화: 한 번 재귀를 호출할 때마다 depth를 1 증가시킴으로써 종료조건에 가까워지도록 한다.
 * - 종료 조건인 경우 : 재귀함수가 뭔지 대답하고 종료
 * - 종료 조건이 아닌 경우: 재귀함수를 호출 하고, 재귀 함수가 종료되면  '라고 답변하였지.'를 출력
 */

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const N = Number(fs.readFileSync(filePath, 'utf-8'));

function recursion() {
    const result = ['어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.'];

    function helper(depth) {
        const depthStr = '____'.repeat(depth);
        if (depth === N) {
            result.push(`${depthStr}"재귀함수가 뭔가요?"`);
            result.push(`${depthStr}"재귀함수는 자기 자신을 호출하는 함수라네"`);
            result.push(`${depthStr}라고 답변하였지.`);
            return;
        }

        result.push(
            `${depthStr}"재귀함수가 뭔가요?"`,
            `${depthStr}"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.`,
            `${depthStr}마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.`,
            `${depthStr}그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어."`
        );
        helper(depth + 1);
        result.push(`${depthStr}라고 답변하였지.`);
    }

    helper(0);

    console.log(result.join('\n'));
}

recursion();
