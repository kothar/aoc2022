import * as fs from 'fs';
import { comparePacket, day13, parsePacket } from './day13';

describe('Parse packet', () => {
    test('empty', () => {
        expect(parsePacket('[]'.split(''))).toEqual([]);
    });
    test('single digit', () => {
        expect(parsePacket('[3]'.split(''))).toEqual([3]);
    });
    test('multiple digits', () => {
        expect(parsePacket('[233]'.split(''))).toEqual([233]);
    });
    test('list digits', () => {
        expect(parsePacket('[1,2,3,4]'.split(''))).toEqual([1, 2, 3, 4]);
    });
    test('nested packet', () => {
        expect(parsePacket('[[1]]'.split(''))).toEqual([[1]]);
    });
    test('mixed packet', () => {
        expect(parsePacket('[1,2,[3,4,5]]'.split(''))).toEqual([1, 2, [3, 4, 5]]);
    });
});

describe('Compare packet', () => {
    test('empty', () => {
        expect(comparePacket([], [])).toEqual(0);
    });
    test('digits', () => {
        expect(comparePacket([1], [1])).toEqual(0);
        expect(comparePacket([1], [2])).toEqual(-1);
        expect(comparePacket([3], [2])).toEqual(1);
    });
    test('arrays', () => {
        expect(comparePacket([1, 2], [1, 2])).toEqual(0);
        expect(comparePacket([1], [1, 2])).toEqual(-1);
        expect(comparePacket([1, 2], [1])).toEqual(1);
    });
    test('nested', () => {
        expect(comparePacket([1, [2]], [1, 2])).toEqual(0);
        expect(comparePacket([1, [2]], [1, [2, 3]])).toEqual(-1);
    });
});

test('Example 1', () => {
    const result = day13(`
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`);
    expect(result).toEqual([13, 140]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day13.txt');
    const result = day13(buffer.toString());

    expect(result).toEqual([5882, 24948]);
});
