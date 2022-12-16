import { int } from './lib/util';

export function contains([a, b]: number[], [c, d]: number[]): boolean {
    return a <= c && b >= d;
}

export function overlap([a, b]: number[], [c, d]: number[]): boolean {
    return (a <= c && b >= c) || (a >= c && a <= d);
}

export function day4(input: string) {
    const lines = input.trim().split('\n');

    const pairs = lines.map(line => {
        return line.split(',')
            .map(pair => {
                let range = pair.split('-');
                return range.map(int);
            });
    });

    let part1 = 0;
    let part2 = 0;
    pairs.forEach(([rangeA, rangeB]) => {
        if (contains(rangeA, rangeB) || contains(rangeB, rangeA)) {
            part1++;
        }
        if (overlap(rangeA, rangeB)) {
            part2++;
        }
    })

    return [part1, part2];
}
