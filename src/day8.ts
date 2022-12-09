import { sum } from './day1';

export function max(values: number[]): number {
    return values.reduce((prev, current) => Math.max(prev, current), 0);
}

export function min(values: number[]): number {
    return values.reduce((prev, current) => Math.min(prev, current), 0);
}

export function day8(input: string) {
    const trees = input.trim().split('\n')
        .map(line => line.split('').map(value => parseInt(value)));

    const minimumApproachHeights = trees.map(row => {
        let max = -1;
        return row.map((value) => {
            const oldMax = max;
            max = Math.max(max, value);
            return oldMax;
        })
    });
    for (let row = 0; row < trees.length; row += 1) {
        let max = -1;
        for (let col = trees.length - 1; col >= 0; col -= 1) {
            minimumApproachHeights[row][col] = Math.min(minimumApproachHeights[row][col], max);
            max = Math.max(max, trees[row][col]);
        }
    }
    for (let col = 0; col < trees.length; col += 1) {
        let max = -1;
        for (let row = 0; row < trees.length; row += 1) {
            minimumApproachHeights[row][col] = Math.min(minimumApproachHeights[row][col], max);
            max = Math.max(max, trees[row][col]);
        }
        max = -1;
        for (let row = trees.length - 1; row >= 0; row -= 1) {
            minimumApproachHeights[row][col] = Math.min(minimumApproachHeights[row][col], max);
            max = Math.max(max, trees[row][col]);
        }
    }

    let part1 = sum(trees.flatMap((row, rowIndex) => row
        .map((height, colIndex) => height > minimumApproachHeights[rowIndex][colIndex] ? 1 : 0)));

    function scenicScore(height: number, row: number, col: number): number {
        let numCols = trees[0].length;
        let numRows = trees.length;
        if (row == 0 || col == 0 || col == numRows - 1 || row == numCols - 1) {
            return 0;
        }

        let score = 1;
        for (let searchRow = row + 1; searchRow < numRows; searchRow += 1) {
            if (searchRow == numRows - 1 || trees[searchRow][col] >= height) {
                score *= searchRow - row;
                break;
            }
        }
        for (let searchRow = row - 1; searchRow >= 0; searchRow -= 1) {
            if (searchRow == 0 || trees[searchRow][col] >= height) {
                score *= row - searchRow;
                break;
            }
        }
        for (let searchCol = col + 1; searchCol < numCols; searchCol += 1) {
            if (searchCol == numCols - 1 || trees[row][searchCol] >= height) {
                score *= searchCol - col;
                break;
            }
        }
        for (let searchCol = col - 1; searchCol >= 0; searchCol -= 1) {
            if (searchCol == 0 || trees[row][searchCol] >= height) {
                score *= col - searchCol;
                break;
            }
        }
        return score;
    }

    let part2 = max(trees.flatMap((row, rowIndex) =>
        row.map((height, colIndex) =>
            scenicScore(height, rowIndex, colIndex))));

    return [part1, part2];
}
