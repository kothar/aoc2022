import * as fs from 'fs';
import { day9, State } from './day9';

describe('applyMove', () => {
    test('moves up', () => {
        expect(new State({ x: 0, y: 1 }, { x: 0, y: 0 }).applyMove({ x: 0, y: 1 }, 1))
            .toEqual([{ x: 0, y: 2 }, { x: 0, y: 1 }]);
    })
    test('moves down', () => {
        expect(new State({ x: 0, y: -1 }, { x: 0, y: 0 }).applyMove({ x: 0, y: -1 }, 1))
            .toEqual([{ x: 0, y: -2 }, { x: 0, y: -1 }]);
    })
    test('moves right', () => {
        expect(new State({ x: 1, y: 0 }, { x: 0, y: 0 }).applyMove({ x: 1, y: 0 }, 1))
            .toEqual([{ x: 2, y: 0 }, { x: 1, y: 0 }]);
    })
    test('moves left', () => {
        expect(new State({ x: -1, y: 0 }, { x: 0, y: 0 }).applyMove({ x: -1, y: 0 }, 1))
            .toEqual([{ x: -2, y: 0 }, { x: -1, y: 0 }]);
    })
    test('moves up+right', () => {
        expect(new State({ x: 1, y: 1 }, { x: 0, y: 0 }).applyMove({ x: 0, y: 1 }, 1))
            .toEqual([{ x: 1, y: 2 }, { x: 1, y: 1 }]);
    })
})

test('Example 1', () => {
    const result = day9(`
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`);
    expect(result).toEqual([13, 1]);
});

test('Example 2', () => {
    const result = day9(`
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`);
    expect(result).toEqual([88, 36]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day9.txt');
    const result = day9(buffer.toString());

    expect(result).toEqual([6503, 2724]);
})
