import { int, sum } from './lib/util';

export function mix(values: number[], steps = values.length, rounds = 1): number[] {
    let indexed = values.map((value, index) => ({ value: value, index }));
    const output = [...indexed];
    for (let round = 0; round < rounds; round += 1) {
        for (const item of indexed.slice(0, steps)) {
            const pos = output.findIndex(({index}) => index === item.index);
            output.splice(pos, 1);
            let newPos = (pos + item.value) % output.length;
            if (newPos === 0) newPos = output.length;
            output.splice(newPos, 0, item);
        }
    }
    return output.map(item => item.value);
}

export function day20(input: string) {
    const values = input.trim().split('\n').map(int);

    // Part 1
    let output = mix(values);
    let zero = output.indexOf(0);
    const part1 = sum([1000, 2000, 3000].map(pos => output[(zero + pos) % output.length]));

    // Part 2
    const key = 811589153;
    const decryptedValues = values.map(value => value * key);
    output = mix(decryptedValues, values.length, 10);
    zero = output.indexOf(0);
    const part2 = sum([1000, 2000, 3000].map(pos => output[(zero + pos) % output.length]));

    return [part1, part2];
}
