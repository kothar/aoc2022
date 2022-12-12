import * as fs from 'fs';
import { day9, State } from './day9';
import { Vector } from './lib/vector';

describe('applyMove', () => {
    test('moves up', () => {
        expect(new State(new Vector(0, 1)).applyMove(new Vector(0,1), 1))
            .toEqual([new Vector(0, 2), new Vector(0,1)]);
    })
    test('moves down', () => {
        expect(new State(new Vector(0, -1)).applyMove(new Vector(0, -1), 1))
            .toEqual([new Vector(0, -2), new Vector(0, -1)]);
    })
    test('moves right', () => {
        expect(new State(new Vector(1)).applyMove(new Vector(1, 0), 1))
            .toEqual([new Vector(2, 0), new Vector(1, 0)]);
    })
    test('moves left', () => {
        expect(new State(new Vector(-1)).applyMove(new Vector(-1, 0), 1))
            .toEqual([new Vector(-2, 0), new Vector(-1, 0)]);
    })
    test('moves up+right', () => {
        expect(new State(new Vector(1, 1)).applyMove(new Vector(0,1), 1))
            .toEqual([new Vector(1, 2),new Vector(1, 1)]);
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
