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
}
