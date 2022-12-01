import { compareDesc, day1, sum } from './day1';
import * as fs from 'fs';

describe('sum', () => {
    test('adds integers', () => {
        expect(sum([1, 2, 3])).toEqual(6);
    });
    test('adds floats', () => {
        expect(sum([1.1, 2.2, 3.3])).toEqual(6.6);
    });
})

describe('compareDesc', () => {
    test('gt', () => {
        expect(compareDesc(5, 8)).toBeGreaterThan(0);
    });
    test('lt', () => {
        expect(compareDesc(100, 3)).toBeLessThan(0);
    });
    test('eq', () => {
        expect(compareDesc(33, 33)).toEqual(0);
    });
});

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

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day1.txt');
    const result = day1(buffer.toString());

    expect(result).toEqual([75622, 213159]);
})