export type Position = { x: number, y: number };

export class State {

    visited = new Set<string>();

    constructor(public head: Position = { x: 0, y: 0 }, public tail: Position = { x: 0, y: 0 }) {
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

    function

    applyMove({ x, y }: Position, distance: number) {
        for (let step = 0; step < distance; step++) {
            this.head = { x: this.head.x + x, y: this.head.y + y };
            if (this.maxDistance() > 1) {
                if (this.head.x > this.tail.x) {
                    this.tail.x += 1
                } else if (this.head.x < this.tail.x) {
                    this.tail.x -= 1
                }
                if (this.head.y > this.tail.y) {
                    this.tail.y += 1
                } else if (this.head.y < this.tail.y) {
                    this.tail.y -= 1
                }
                this.visited.add(JSON.stringify(this.tail));
            }
        }
        return [this.head, this.tail];
    }
}

export function day9(input: string) {
    const moves = input.trim().split('\n')
        .map(line => line.split(' '))
        .map(([direction, distance]) => ({ direction, distance: parseInt(distance) }));

    const state = new State();

    for (const move of moves) {
        switch (move.direction) {
            case 'U':
                state.applyMove({ x: 0, y: 1 }, move.distance);
                break;
            case 'D':
                state.applyMove({ x: 0, y: -1 }, move.distance);
                break;
            case 'L':
                state.applyMove({ x: -1, y: 0 }, move.distance);
                break;
            case 'R':
                state.applyMove({ x: 1, y: 0 }, move.distance);
                break;
        }
    }

    return [state.visited.size, 0];
}
