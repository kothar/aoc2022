import { clamp } from './util'

export class Vector {
    constructor(public x = 0, public y = 0) {
    }

    add(vec: Vector) {
        return new Vector(this.x + vec.x, this.y + vec.y);
    }

    sub(vec: Vector) {
        return new Vector(this.x - vec.x, this.y - vec.y);
    }

    abs() {
        return new Vector(Math.abs(this.x), Math.abs(this.y));
    }

    lookup<T>(map: T[][]) {
        return map[this.y][this.x];
    }

    equals(v: Vector) {
        return this.x === v.x && this.y === v.y;
    }

    unitDirection(v: Vector) {
        return v.sub(this).clamp(-1, 1);
    }

    clamp(min: number, max: number) {
        return new Vector(clamp(this.x, min, max), clamp(this.y, min, max))
    }
}
