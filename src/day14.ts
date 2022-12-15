import { int, max, min } from './lib/util';
import { Vector } from './lib/vector';

export function day14(input: string) {
    const paths = input.trim().split('\n')
        .map(line => line.split(' -> ')
            .map(pair => pair.split(',').map(int))
            .map(([x, y]) => new Vector(x, y)));

    const ys = paths.flatMap(path => path.map(({ y }) => y));
    const minY = min([0, ...ys]), maxY = max(ys);
    const xs = paths.flatMap(path => path.map(({ x }) => x));
    const minX = min([...xs, 500 - maxY - 2]), maxX = max([...xs, 500 + maxY + 2]);
    console.log({ minX, maxX, minY, maxY });

    const width = maxX - minX + 1, height = maxY - minY + 2;
    const grid = new Array(height).fill([])
        .map(() => new Array<string>(width).fill('.'));
    let workingGrid = grid;

    function draw(char: string, { x, y }: { x: number, y: number }) {
        workingGrid[y - minY][x - minX] = char;
    }

    function lookup({ x, y }: { x: number, y: number }) {
        return workingGrid[y - minY][x - minX]
    }

    const printGrid = () => console.log(workingGrid.map(row => row.join(' ')).join('\n'));

    // Build map
    paths.forEach(path => {
        let currentPoint = path.shift();
        draw('#', currentPoint);
        while (path.length > 0) {
            let nextPoint = path.shift();

            while (!currentPoint.equals(nextPoint)) {
                currentPoint = currentPoint.add(currentPoint.unitDirection(nextPoint));
                draw('#', currentPoint);
            }
            currentPoint = nextPoint;
        }
    });
    printGrid();

    const choices = [new Vector(0, 1), new Vector(-1, 1), new Vector(1, 1)];

    function addSand(floor?: number): boolean {
        let pos = new Vector(500, 0);
        if (lookup(pos) !== '.') {
            return false;
        }

        simulate: while (floor ? true : pos.y <= maxY) {
            if (!floor || pos.y < floor - 1) {
                for (const choice of choices) {
                    const below = pos.add(choice);
                    if (lookup(below) === '.') {
                        pos = below;
                        continue simulate;
                    }
                }
            }

            // Reached a blocker
            draw('o', pos);
            return true;
        }
        return false;
    }

    // Part 1

    workingGrid = grid.map(row => [...row]);
    let part1 = 0;
    while (addSand()) {
        printGrid();
        part1 += 1;
    }

    // part2
    workingGrid = grid.map(row => [...row]);
    let part2 = 0;
    while (addSand(maxY + 2)) {
        part2 += 1;
    }
    printGrid();

    return [part1, part2];
}
