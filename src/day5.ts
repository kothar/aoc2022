export function day5(input: string) {
    const [stackInput, moveInput] = input.split('\n\n')
        .map(group => group.split('\n'));
    if (stackInput[0] === '') {
        stackInput.shift();
    }

    // Parse Stacks
    const stackNumbers = stackInput.pop().split('');
    let stackCount = Math.floor(stackNumbers.length / 4) + 1;

    const stacks1: string[][] = new Array(stackCount);
    const stacks2: string[][] = new Array(stackCount);
    stackInput.map(line => line.split('')).forEach(line => {
        for (let stack = 0; stack <= stackCount; stack += 1) {
            const box = line[stack * 4 + 1];
            if (box >= 'A' && box <= 'Z') {
                stacks1[stack] ||= [];
                stacks1[stack].unshift(box);

                stacks2[stack] ||= [];
                stacks2[stack].unshift(box);
            }
        }
    });

    // Apply Moves
    moveInput.forEach(line => {
        if (line === '') {
            return;
        }

        const tokens = line.split(' ');
        const count = parseInt(tokens[1]);
        const from = parseInt(tokens[3]);
        const to = parseInt(tokens[5]);

        // Part 1 move single boxes
        for (let n = 0; n < count; n += 1) {
            const box = stacks1[from - 1].pop();
            stacks1[to - 1].push(box);
        }

        // Part 2 move multiple boxes
        const boxes = stacks2[from-1].splice(-count);
        stacks2[to - 1].push(...boxes);
    })


    let part1 = stacks1.map(stack => stack.pop()).join('');
    let part2 = stacks2.map(stack => stack.pop()).join('');

    return [part1, part2];
}