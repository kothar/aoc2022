import { chunk, sum } from './lib/util';
import { intersection, sampleOne, toSet } from './lib/sets';

function priority(char: string) {
    if (char >= 'a') {
        return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    }
    return char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
}

export function day3(input: string) {
    const lines = input.trim().split('\n');
    const part1Priorities = lines.map(line => {
        const half = line.length / 2;
        const a = toSet(line.slice(0, half));
        const b = toSet(line.slice(half));
        const i = intersection(a, b);
        return priority(sampleOne(i));
    });
    const part1 = sum(part1Priorities);

    let sets = lines.map(line => toSet(line));
    const groups = chunk(sets, 3);
    const part2Priorities = groups.map((group) => {
        const i = intersection(...group);
        return priority(sampleOne(i));
    });
    const part2 = sum(part2Priorities);
    return [part1, part2];
}
