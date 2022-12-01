import { day1 } from './day1';
import * as fs from 'fs';

test('Day 1 example', () => {
   const result = day1(`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`);
   expect(result).toEqual([24000, 45000]);
});

test ('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day1.txt');
    const result = day1(buffer.toString());
    console.log(result);
})