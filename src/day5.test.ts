import * as fs from 'fs';
import { day5 } from './day5';

test('Example', () => {
    const result = day5(`
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`);
    expect(result).toEqual(['CMZ', 'MCD']);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day5.txt');
    const result = day5(buffer.toString());

    expect(result).toEqual(['VRWBSFZWM', 'RBTWJWMCF']);
})