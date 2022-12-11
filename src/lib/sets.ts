export function sampleOne<T>(set: Set<T>): T {
    return set.values().next().value;
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

export function unique(range: string): boolean {
    return toSet(range).size === range.length;
}
