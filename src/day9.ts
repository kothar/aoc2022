import { clamp, max, min } from './lib/util';

export class Vector {
    constructor(public x = 0, public y = 0) {
    }
}

export class State {

    visited = new Set<string>();

    constructor(public head = new Vector(), public tail = new Vector(), public nextState?: State) {
        this.visited.add(JSON.stringify(tail));
    }

    distance(a, b) {
        return b - a;
    }

    maxDistance() {
        return Math.max(
            Math.abs(this.distance(this.head.x, this.tail.x)),
            Math.abs(this.distance(this.head.y, this.tail.y))
        );
    }

    applyMove({ x, y }: Vector, distance: number) {
        for (let step = 0; step < distance; step++) {
            this.head.x += x;
            this.head.y += y;
            this.updateTail(this.head);
        }
        return [this.head, this.tail];
    }

    updateTail(head: Vector) {
        this.head = head;
        if (this.maxDistance() > 1) {
            this.tail.x += clamp(this.head.x - this.tail.x);
            this.tail.y += clamp(this.head.y - this.tail.y);
            this.visited.add(JSON.stringify(this.tail));
            this.nextState?.updateTail(this.tail);
        }
    }
}

function printState(move, states: State[]) {
    const maxX = max(states.map(state => state.head.x));
    const minX = min(states.map(state => state.head.x));
    const maxY = max(states.map(state => state.head.x));
    const minY = min(states.map(state => state.head.y));

    const grid: string[][] = [];
    for (let y = minY; y <= maxY; y += 1) {
        const row = [];
        for (let x = minX; x <= maxX; x += 1) {
            if (x == 0 && y == 0) {
                row.push('s');
            } else {
                row.push('.');
            }
        }
        grid.push(row);
    }

    [...states].reverse().forEach((state, index) => {
        grid[state.head.y - minY][state.head.x - minX] =
            index == 0 ? 'H' : index.toString();
    });

    console.log(move, '\n', grid.map(row => row.join('')).reverse().join('\n'));
}

export function day9(input: string) {
    const moves = input.trim().split('\n')
        .map(line => line.split(' '))
        .map(([direction, distance]) => ({ direction, distance: parseInt(distance) }));

    const states: State[] = [];
    for (let s = 0; s < 9; s++) {
        const state = new State(new Vector(), new Vector(), states[0]);
        states.unshift(state);
    }

    for (const move of moves) {
        switch (move.direction) {
            case 'U':
                states[0].applyMove(new Vector(0, 1), move.distance);
                break;
            case 'D':
                states[0].applyMove(new Vector(0, -1), move.distance);
                break;
            case 'L':
                states[0].applyMove(new Vector(-1), move.distance);
                break;
            case 'R':
                states[0].applyMove(new Vector(1), move.distance);
                break;
        }
        // printState(move, states);
    }

    return [states[0].visited.size, states[8].visited.size];
}
