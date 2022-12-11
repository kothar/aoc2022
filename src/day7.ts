import { sum } from './lib/util';

export function day7(input: string) {
    const lines = input.split('\n');
    let path: string[] = [];
    const dirSizes: Record<string, number> = { '': 0 };

    for (const line of lines) {
        const match = line.match(/^((\$ cd)|(\d+)|(dir)) (.*)/) || [];
        if (match[2]) {
            // Change path
            const target = match[5];
            if (target == '/') {
                path = [];
            } else if (target == '..') {
                path.pop();
            } else {
                path.push(target);
            }
        } else if (match[3]) {
            // Size
            let fileSize = parseInt((match[3]));

            // Update parent directories
            for (let index = 0; index <= path.length; index += 1) {
                let dirName = path.slice(0, index).join('/') || '';
                dirSizes[dirName] += fileSize;
            }
        } else if (match[4]) {
            // Dir
            const dir = [...path, match[5]].join('/');
            dirSizes[dir] = 0;
        }
    }

    let part1 = sum(Object.values(dirSizes).filter(size => size <= 100_000));

    const used = dirSizes[''];
    const unused = 70_000_000 - used;
    const minToDelete = 30_000_000 - unused;
    const candidates = Object.values(dirSizes)
        .filter(size => size >= minToDelete)
        .sort((a, b) => a - b);
    let part2 = candidates[0];

    return [part1, part2];
}
