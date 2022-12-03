import * as fs from 'fs';
import { day2 } from './day2';
import { chunk, day3, intersection, toSet } from './day3';

describe('chunk', () => {
    test('chunks in even groups', () => {
        const chunks = chunk([1, 2, 3, 4, 5, 6], 3);
        expect(chunks).toEqual([[1, 2, 3], [4, 5, 6]]);
    });
    test('chunks in uneven groups', () => {
        const chunks = chunk([1, 2, 3, 4, 5], 3);
        expect(chunks).toEqual([[1, 2, 3], [4, 5]]);
    });
    test('chunks in single group', () => {
        const chunks = chunk([1, 2, 3, 4, 5], 5);
        expect(chunks).toEqual([[1, 2, 3, 4, 5]]);
    });
    test('chunks empty list', () => {
        const chunks = chunk([], 3);
        expect(chunks).toEqual([[]]);
    });
});

describe('set', () => {
    test('convert from string', () => {
        const set = toSet('abbc');

        expect(set).toHaveLength(3);
        expect(set.includes('a')).toBeTruthy();
        expect(set.includes('b')).toBeTruthy();
        expect(set.includes('c')).toBeTruthy();
        expect(set.includes('d')).toBeFalsy();
    });
    test('convert from number', () => {
        const set = toSet(1);

        expect(set).toHaveLength(1);
        expect(set.includes(1)).toBeTruthy();
        expect(set.includes(2)).toBeFalsy();
    });
    test('convert from array', () => {
        const set = toSet([1,2,2,3]);

        expect(set).toHaveLength(3);
        expect(set.includes(1)).toBeTruthy();
        expect(set.includes(2)).toBeTruthy();
        expect(set.includes(3)).toBeTruthy();
        expect(set.includes(4)).toBeFalsy();
    });

    test('intersection', () => {
        const a = [1, 2, 3];
        const b = [2, 3, 4];
        const i = intersection(a, b);

        expect(i).toHaveLength(2);
        expect(i.includes(1)).toBeFalsy();
        expect(i.includes(2)).toBeTruthy();
        expect(i.includes(3)).toBeTruthy();
        expect(i.includes(4)).toBeFalsy();
        expect(i.includes(5)).toBeFalsy();
    });

    test('iteration', () => {
        const a = [1, 2, 3];
        const b = [2, 3, 4];
        const i = intersection(a, b);

        const elements = [];
        i.forEach((e) => {
            elements.push(e);
        });

        expect(elements).toContain(2);
        expect(elements).toContain(3);
        expect(elements).toHaveLength(2);
    });

});

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