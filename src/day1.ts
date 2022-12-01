export function day1(input) {
    const lines = input.split('\n');
    let total = 0;
    const elves: number[] = [];

    for (const line of lines) {
        if (line === '') {
            elves.push(total);
            total = 0;
            continue;
        }

        total += parseInt(line);
    }
    if (total > 0) {
        elves.push(total);
    }

    elves.sort((a, b) => b - a);
    return [elves[0], elves.slice(0, 3).reduce((a, b) => a + b)];
}