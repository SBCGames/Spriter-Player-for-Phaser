module Spriter {

    // -------------------------------------------------------------------------
    export function linear(a: number, b: number, t: number): number {
        return ((b - a) * t) + a;
    }

    // -------------------------------------------------------------------------
    export function quadratic(a: number, b: number, c: number, t: number) {
        return this.linear(this.linear(a, b, t), this.linear(b, c, t), t);
    }

    // -------------------------------------------------------------------------
    export function cubic(a: number, b: number, c: number, d: number, t: number) {
        return this.linear(this.quadratic(a, b, c, t), this.quadratic(b, c, d, t), t);
    }

    // -------------------------------------------------------------------------
    export function angleLinear(angleA: number, angleB: number, spin: number, t: number): number {
        // no spin
        if (spin === 0) {
            return angleA;
        }

        // spin left
        if (spin > 0) {
            if (angleB > angleA) {
                angleB -= 360;
            }
        } else {    // spin right
            if (angleB < angleA) {
                angleB += 360;
            }
        }

        return this.linear(angleA, angleB, t);
    }
}
