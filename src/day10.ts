import { CPU, parseInstruction } from './lib/cpu';

export function day10(input: string) {
    const instructions = input.trim().split('\n')
        .map(parseInstruction);

    let part1 = 0;
    const sampleCycles = [20, 60, 100, 140, 180, 220];
    const sampleTrace = [];

    // Init display
    const display = new Array(6).fill([])
        .map(() => new Array<string>(40).fill(' '));

    function cycleListener({ X, cycle }: CPU) {
        // Part 1
        if (sampleCycles.includes(cycle)) {
            sampleTrace.push(X);
            part1 += cycle * X;
        }

        // Part 2
        const row = Math.floor((cycle - 1) / 40);
        const pixel = (cycle - 1) % 40;
        if (Math.abs(pixel - X) <= 1) {
            display[row][pixel] = '#';
        }
    }

    let cpu = new CPU({ cycleListener });
    cpu.execute(instructions);

    console.log(sampleTrace);
    console.log(display.map(row => row.join(' ')).join('\n'));

    return [part1, 0];
}
