import { intersection, toSet } from './sets';

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
