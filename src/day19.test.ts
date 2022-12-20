import * as fs from 'fs';
import { day19 } from './day19';

test('Example 1', () => {
    const result = day19(`
Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.
`);
    expect(result).toEqual([33, 10]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day19.txt');
    const result = day19(buffer.toString());

    expect(result).toEqual([4244, 26484]);
});
