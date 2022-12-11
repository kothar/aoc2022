import { compareDesc, sum } from './lib/util';

export function day1(input) {
    const groups = input.trim().split('\n\n');
    const elves = groups.map(group => {
        const lines = group.split('\n');
        const integers = lines.map(line => parseInt(line));
        return sum(integers);
    });

    elves.sort(compareDesc);
    return [elves[0], sum(elves.slice(0, 3))];
}
