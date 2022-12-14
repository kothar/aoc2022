import { unique } from './lib/sets';

export function markerPosition(packet: string, markerSize: number, test: (range: string) => boolean): number {
    for (let index = markerSize; index <= packet.length; index += 1) {
        if (test(packet.slice(index - markerSize, index))) {
            return index;
        }
    }
    return -1;
}

export function day6(input: string) {
    let part1 = markerPosition(input, 4, unique);
    let part2 = markerPosition(input, 14, unique);

    return [part1, part2];
}
