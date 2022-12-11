import * as fs from 'fs';
import { day3 } from './day3';

test('Example', () => {
    const result = day3(`
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`);
    expect(result).toEqual([157, 70]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day3.txt');
    const result = day3(buffer.toString());

    expect(result).toEqual([8349, 2681]);
})
