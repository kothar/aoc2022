import { sum } from './day1';

function priority(char: string) {
    if (char >= 'a') {
        return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    }
    return char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
}

function sampleOne<T>(set: Set<T>): T {
    return set.values().next().value;
}

export function chunk<T>(array: T[], chunkSize: number): T[][] {
    return array.reduce((chunks, element) => {
        let chunk = chunks.pop();
        if (chunk.length >= chunkSize) {
            chunks.push(chunk);
            chunk = [];
        }
        chunk.push(element);
        chunks.push(chunk);
        return chunks;
    }, [[]]);
}

export function toSet<T>(elements: T | T[]): Set<T> {
    if (typeof elements === 'string') {
        elements = elements.split('') as T[];
    } else if (!Array.isArray(elements)) {
        elements = [elements];
    }

    return new Set(elements);
}

export function intersection<T>(...[firstSet, ...otherSets]: Set<T>[]): Set<T> {
    const result = new Set<T>();
    firstSet.forEach(element => {
        if (otherSets.every(set => set.has(element))) {
            result.add(element);
        }
    });
    return result;
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