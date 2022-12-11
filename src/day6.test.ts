import * as fs from 'fs';
import { day6, markerPosition } from './day6';
import { unique } from './lib/sets';

describe('unique', () => {
    test('empty', () => {
        expect(unique('')).toBeTruthy();
    })
    test('detects unique range', () => {
        expect(unique('abcd')).toBeTruthy();
    })
    test('detects non-unique range', () => {
        expect(unique('abaa')).toBeFalsy();
    })
});

describe('markerPosition', ()=> {
    test('detects marker at start', () => {
       expect(markerPosition('aaa123', 3, (range) => range === 'aaa')).toEqual(3);
    });
    test('detects marker at end', () => {
       expect(markerPosition('aaa123', 3, (range) => range === '123')).toEqual(6);
    });
    test('detects marker in middle', () => {
       expect(markerPosition('aaa123', 3, (range) => range === 'aa1')).toEqual(4);
    });
    test('missing marker', () => {
       expect(markerPosition('aaa123', 3, (range) => range === 'xyz')).toEqual(-1);
    });
    test('short input', () => {
       expect(markerPosition('aa', 3, (range) => range === 'aaa')).toEqual(-1);
    });
    test('empty input', () => {
       expect(markerPosition('', 3, (range) => range === 'aaa')).toEqual(-1);
    });
})

test('Example 1', () => {
    const result = day6(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`);
    expect(result).toEqual([7, 19]);
});
test('Example 2', () => {
    const result = day6(`bvwbjplbgvbhsrlpgdmjqwftvncz`);
    expect(result).toEqual([5, 23]);
});
test('Example 3', () => {
    const result = day6(`nppdvjthqldpwncqszvftbrmjlhg`);
    expect(result).toEqual([6, 23]);
});
test('Example 4', () => {
    const result = day6(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`);
    expect(result).toEqual([10, 29]);
});
test('Example 5', () => {
    const result = day6(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`);
    expect(result).toEqual([11, 26]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day6.txt');
    const result = day6(buffer.toString());

    expect(result).toEqual([1876, 2202]);
})
