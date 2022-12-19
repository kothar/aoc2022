import * as fs from 'fs';
import { day18 } from './day18';

test('Example 1', () => {
    const result = day18(`
1,1,1
2,1,1
`);
    expect(result).toEqual([10, 10]);
});

test('Example 2', () => {
    const result = day18(`
2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5
`);
    expect(result).toEqual([64, 58]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day18.txt');
    const result = day18(buffer.toString());

    expect(result).toEqual([4244, 26484]);
});
