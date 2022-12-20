import * as fs from 'fs';
import { day20, mix } from './day20';

describe('mix', () => {
    test('small', () => {
        expect(mix([1, 2, 3], 1)).toEqual([2, 1, 3]);
        expect(mix([1, 2, 3], 2)).toEqual([1, 3, 2]);
        expect(mix([1, 2, 3])).toEqual([1, 2, 3]);
        expect(mix([1, -2, 3])).toEqual([1, -2, 3]);
        expect(mix([1, 2, 6, 3])).toEqual([1, 6, 2, 3]);
    });

    test('negative jump', () => {
        expect(mix([1, 2, -6, 3], 1)).toEqual([2, 1, -6, 3]);
        expect(mix([1, 2, -6, 3], 2)).toEqual([1, -6, 2, 3]);
        expect(mix([1, 2, -6, 3], 3)).toEqual([1, -6, 2, 3]);
        expect(mix([1, 2, -6, 3])).toEqual([1, -6, 2, 3]);
    });

    test('Example 1', () => {
        expect(mix([1, 2, -3, 3, -2, 0, 4])).toEqual([1, 2, -3, 4, 0, 3, -2])
    });

    test('Example 1 - 2 rounds', () => {
        expect(mix([1, 2, -3, 3, -2, 0, 4], 7, 2)).toEqual([1, 4, 2, 3, -2, 0, -3])
    });

    test('Puzzle input', () => {
        //                    -3
        expect(mix([-7703, -8679, 2426, 9099, 2017, -6881, 7220, -8684], 1))
            .toEqual([-8679, 2426, 9099, 2017, -7703, -6881, 7220, -8684])
    });
});

test('Example 1', () => {
    const result = day20(`
1
2
-3
3
-2
0
4
`);
    expect(result).toEqual([3, 1623178306]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day20.txt');
    const result = day20(buffer.toString());

    expect(result).toEqual([3466, 9995532008348]);
});
