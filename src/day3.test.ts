import * as fs from 'fs';
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

        expect(set.size).toEqual(3);
        expect(set.has('a')).toBeTruthy();
        expect(set.has('b')).toBeTruthy();
        expect(set.has('c')).toBeTruthy();
        expect(set.has('d')).toBeFalsy();
    });
    test('convert from number', () => {
        const set = toSet(1);

        expect(set.size).toEqual(1);
        expect(set.has(1)).toBeTruthy();
        expect(set.has(2)).toBeFalsy();
    });
    test('convert from array', () => {
        const set = toSet([1,2,2,3]);

        expect(set.size).toEqual(3);
        expect(set.has(1)).toBeTruthy();
        expect(set.has(2)).toBeTruthy();
        expect(set.has(3)).toBeTruthy();
        expect(set.has(4)).toBeFalsy();
    });

    test('intersection', () => {
        const a = new Set([1, 2, 3]);
        const b = new Set([2, 3, 4]);
        const i = intersection(a, b);

        expect(i.size).toEqual(2);
        expect(i.has(1)).toBeFalsy();
        expect(i.has(2)).toBeTruthy();
        expect(i.has(3)).toBeTruthy();
        expect(i.has(4)).toBeFalsy();
        expect(i.has(5)).toBeFalsy();
    });

    test('iteration', () => {
        const a = new Set([1, 2, 3]);
        const b = new Set([2, 3, 4]);
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