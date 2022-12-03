import { sum } from './day1';

function priority(char: string) {
    if (char >= 'a') {
        return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    }
    return char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
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

export interface Set<T> {
    get length(): number

    includes(element: T): boolean

    forEach(fn: (element: T) => void)
}

export function toSet<T>(elements: T | T[]): Set<T> {
    if (typeof elements === 'string') {
        elements = elements.split('') as T[];
    } else if (!Array.isArray(elements)) {
        elements = [elements];
    }

    return elements.sort().reduce((set, currentValue, index) => {
        if (index == 0 || elements[index - 1] !== currentValue) {
            set.push(currentValue);
        }
        return set;
    }, [] as T[]);
}

export function intersection<T>(...[firstSet, ...otherSets]: Set<T>[]): Set<T> {
    const result: T[] = [];
    firstSet.forEach(element => {
        if (otherSets.every(set => set.includes(element))) {
            result.push(element);
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
        return priority(i[0]);
    });
    const part1 = sum(part1Priorities);

    let sets = lines.map(line => toSet(line));
    const groups = chunk(sets, 3);
    const part2Priorities = groups.map((group) => {
        const i = intersection(...group);
        return priority(i[0]);
    });
    const part2 = sum(part2Priorities);
    return [part1, part2];
}