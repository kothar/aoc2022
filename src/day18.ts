import { Bounds, Vector } from './lib/vector';
import { int, max, min } from './lib/util';

export function day18(input: string) {
    const voxels = input.trim().split('\n')
        .map(row => row.split(',').map(int))
        .map(xyz => new Vector(...xyz));

    let part1 = 0;
    const faceCount: Record<string, number> = {}
    for (const { x, y, z } of voxels) {
        const faces = [
            [x, y, z, x + 1, y, z],
            [x, y, z, x, y + 1, z],
            [x, y, z, x, y, z + 1],
            [x - 1, y, z, x, y, z],
            [x, y - 1, z, x, y, z],
            [x, y, z - 1, x, y, z],
        ].map(values => values.join(','));

        for (const face of faces) {
            let count = faceCount[face] || 0;
            if (count == 0) {
                part1 += 1;
            } else {
                part1 -= 1;
            }
            faceCount[face] = count + 1;
        }
    }

    const bounds = Bounds.fromVectors(...voxels).expand(1);

    let part2 = 0;
    const water: Record<string, boolean> = {};
    water[bounds.min.toString()] = true;
    let updated = [bounds.min];
    while (updated.length) {
        const nextUpdated = [];

        for (const { x, y, z } of updated) {
            const faces: [number[], Vector][] = [
                [[x, y, z, x + 1, y, z], new Vector(x + 1, y, z)],
                [[x, y, z, x, y + 1, z], new Vector(x, y + 1, z)],
                [[x, y, z, x, y, z + 1], new Vector(x, y, z + 1)],
                [[x - 1, y, z, x, y, z], new Vector(x - 1, y, z)],
                [[x, y - 1, z, x, y, z], new Vector(x, y - 1, z)],
                [[x, y, z - 1, x, y, z], new Vector(x, y, z - 1)],
            ];

            for (const [face, nextPoint] of faces) {
                let waterLoc = nextPoint.toString();
                if (faceCount[face.join(',')]) {
                    part2 += 1;
                } else if (!water[waterLoc] && bounds.contains(nextPoint)) {
                    nextUpdated.push(nextPoint);
                    water[waterLoc] = true;
                }
            }
        }

        updated = nextUpdated;
    }

    return [part1, part2];
}
