import { chunk, compareDesc, sum } from './util';

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
