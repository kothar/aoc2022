import { Vector } from './lib/vector';
import { max, min } from './lib/util';

type Location = {
    visited: boolean;
    height: string;
    distance?: number;
}

class State {

    distance: number;

    constructor(readonly position: Vector, readonly previousState?: State) {
        this.distance = previousState ? previousState.distance + 1 : 0;
    }

    setDistances(map: Location[][]) {
        this.previousState?.setDistances(map);
        this.position.lookup(map).distance = this.distance;
    }
}

function intHeight(height: string): number {
    switch (height) {
        case 'S':
            height = 'a';
            break;
        case 'E':
            height = 'z';
            break;
    }
    return height.charCodeAt(0) - 'a'.charCodeAt(0);
}

function distanceFrom(startState: State, map: Location[][]) {
    const frontier = [startState];

    while (frontier.length) {
        const state = frontier.shift();
        const location = state.position.lookup(map);
        const parentLocation = state.previousState?.position?.lookup(map);
        if (location.visited || (parentLocation && (intHeight(location.height) - intHeight(parentLocation.height)) > 1)) {
            continue;
        }
        location.visited = true;

        if (location.height === 'E') {
            state.setDistances(map);
            return state.distance;
        }

        if (state.position.x > 0) {
            frontier.push(new State(state.position.add(new Vector(-1, 0)), state));
        }
        if (state.position.x < map[0].length - 1) {
            frontier.push(new State(state.position.add(new Vector(1, 0)), state));
        }
        if (state.position.y > 0) {
            frontier.push(new State(state.position.add(new Vector(0, -1)), state));
        }
        if (state.position.y < map.length - 1) {
            frontier.push(new State(state.position.add(new Vector(0, 1)), state));
        }
    }
}

export function day12(input: string) {
    const map: Location[][] = input.trim().split('\n')
        .map(line => line.split('').map(height => ({ height, visited: false })));

    // Part 1
    const startX = max(map.map(row => row.findIndex(({ height }) => height === 'S')));
    const startY = map.findIndex(row => row[startX].height === 'S');
    const part1Start = new State(new Vector(startX, startY));
    const part1 = distanceFrom(part1Start, map);
    console.log(map.map(row => row.map(loc => loc.height + ':' +
        ((loc.distance || '') + '   ').slice(0, 3) || '   ').join(' ')).join('\n'));

    const distances = [part1];
    map.forEach((row, y) => {
        row.forEach((loc, x) => {
            if (loc.height === 'a') {
                map.forEach(row => row.forEach(loc => {
                    loc.visited = false;
                    loc.distance = undefined;
                }))
                console.log('Start position found at', x, y);
                const distance = distanceFrom(new State(new Vector(x, y)), map);

                console.log(map.map(row => row.map(loc => loc.height + ':' +
                    ((loc.distance || '') + '   ').slice(0, 3) || '   ').join(' ')).join('\n'));

                if (distance) {
                    distances.push(distance);
                }
            }
        });
    })

    return [part1, min(distances)];
}
