export const sum = (array: number[]): number => array.reduce((a, b) => a + b);
export const compareDesc = (a: number, b: number) => b - a

export function day1(input) {
    const groups = input.trim().split('\n\n');
    const elves = groups.map(group => {
        const lines = group.split('\n');
        const integers = lines.map(line => parseInt(line));
        const total = sum(integers);
        return total;
    });

    elves.sort(compareDesc);
    return [elves[0], sum(elves.slice(0, 3))];
}