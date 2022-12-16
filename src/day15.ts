import { Vector } from './lib/vector';
import { int, max, min } from './lib/util';
import { contains } from './day4';

function part2RowScan(part2Search: number, sensors: { beacon: Vector; manhattan: number; position: Vector }[]) {
    for (let row = 0; row <= part2Search; row++) {
        let segments = [{ type: 'unscanned', range: [0, part2Search] }];

        for (const { position, beacon, manhattan } of sensors) {
            const yDistance = Math.abs(position.y - row);
            const xDistance = manhattan - yDistance;
            let sensorRange = [position.x - xDistance, position.y + xDistance];

            segments = segments.flatMap((segment) => {
                if (segment.type === 'unscanned' && contains(segment.range, sensorRange)) {
                    const newSegments = [];
                    if (segment.range[0] < sensorRange[0]) {
                        newSegments.push({ type: 'unscanned', range: [segment.range[0], sensorRange[0] - 1] });
                    }
                    newSegments.push({ type: 'scanned', range: sensorRange });
                    if (segment.range[1] > sensorRange[1]) {
                        newSegments.push({ type: 'unscanned', range: [sensorRange[1] + 1, segment.range[1]] });
                    }
                }
                return segment;
            })
        }
    }
}


function part2BoundaryScan(part2Search: number, sensors: { beacon: Vector; manhattan: number; position: Vector }[]) {
    // Start with smallest radius
    sensors.sort((a, b) => a.manhattan - b.manhattan);
    while (sensors.length > 0) {
        const currentSensor = sensors.shift();
        for (const sensor of sensors) {
            if (currentSensor.manhattan + sensor.manhattan + 1 == currentSensor.position.manhattan(sensor.position)) {
                // Candidate points between boundaries
                console.log('Candidate pair: ', currentSensor.position, sensor.position);
            }
        }
    }
}

export function day15(input: string, part1Row: number, part2Search: number) {
    const sensors = input.trim().split('\n')
        .map(line => line.match(/Sensor at x=(.+), y=(.+): closest beacon is at x=(.+), y=(.+)/))
        .map((groups) => {
            const position = new Vector(int(groups[1]), int(groups[2]));
            const beacon = new Vector(int(groups[3]), int(groups[4]));
            const manhattan = position.manhattan(beacon);
            return { position, beacon, manhattan };
        });

    const minX = min(sensors.map(({ position, manhattan }) => position.x - manhattan));
    const maxX = max(sensors.map(({ position, manhattan }) => position.x + manhattan));
    const minY = min(sensors.map(({ position, manhattan }) => position.y - manhattan));
    const maxY = max(sensors.map(({ position, manhattan }) => position.y + manhattan));

    // Part 2
    // const part2 = part2RowScan(part2Search, sensors);
    const part2 = part2BoundaryScan(part2Search, sensors);

    // Part 1 is slow
    let part1 = 0;
    // scan: for (let x = minX; x <= maxX; x++) {
    //     let rowPosition = new Vector(x, part1Row);
    //     for (const { position, manhattan, beacon } of sensors) {
    //         if (position.manhattan(rowPosition) <= manhattan) {
    //             if (!beacon.equals(rowPosition)) {
    //                 part1 += 1;
    //             }
    //             continue scan;
    //         }
    //     }
    //
    //     // No sensor in range
    // }
    return [part1, part2];
}
