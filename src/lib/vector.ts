import { clamp, min, max } from './util'

export class Vector {
    constructor(public x = 0, public y = 0, public z = 0) {
    }

    toString() {
        const { x, y, z } = this;
        return [x, y, z].join(',');
    }

    add(vec: Vector) {
        return new Vector(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }

    sub(vec: Vector) {
        return new Vector(this.x - vec.x, this.y - vec.y, this.z = vec.z);
    }

    abs() {
        return new Vector(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
    }

    lookup<T>(map: T[][]) {
        return map[this.y][this.x];
    }

    equals(v: Vector) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }

    unitDirection(v: Vector) {
        return v.sub(this).clamp(-1, 1);
    }

    clamp(min: number, max: number) {
        return new Vector(clamp(this.x, min, max), clamp(this.y, min, max), clamp(this.z, min, max));
    }

    manhattan(to: Vector) {
        const dv = to.sub(this).abs();
        return dv.x + dv.y + dv.z;
    }
}

export class Bounds {

    min = new Vector(Infinity, Infinity, Infinity);
    max = new Vector(-Infinity, -Infinity, -Infinity);

    constructor(min: Vector, max: Vector) {
        this.min = min;
        this.max = max;
    }

    static fromVectors(...vectors: Vector[]) {
        let xs = vectors.map(vector => vector.x);
        let ys = vectors.map(vector => vector.y);
        let zs = vectors.map(vector => vector.z);
        const minVector = new Vector(
            min(xs),
            min(ys),
            min(zs)
        )
        const maxVector = new Vector(
            max(xs),
            max(ys),
            max(zs)
        )
        return new Bounds(minVector, maxVector);
    }

    contains({ x, y, z }: Vector) {
        return x >= this.min.x && y >= this.min.y && z >= this.min.z &&
            x <= this.max.x && y <= this.max.y && z <= this.max.z;
    }

    expand(border: number) {
        return new Bounds(
            new Vector(this.min.x - border, this.min.y - border, this.min.z - border),
            new Vector(this.max.x + border, this.max.y + border, this.max.z + border)
        )
    }
}
