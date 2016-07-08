module Spriter {

    // -------------------------------------------------------------------------
    export function linear(a: number, b: number, t: number): number {
        return ((b - a) * t) + a;
    }

    // -------------------------------------------------------------------------
    export function quadratic(a: number, b: number, c: number, t: number) {
        return linear(linear(a, b, t), linear(b, c, t), t);
    }

    // -------------------------------------------------------------------------
    export function cubic(a: number, b: number, c: number, d: number, t: number) {
        return linear(quadratic(a, b, c, t), quadratic(b, c, d, t), t);
    }

    // -------------------------------------------------------------------------
    export function quartic(a: number, b: number, c: number, d: number, e: number, t: number) {
        return linear(cubic(a, b, c, d, t), cubic(b, c, d, e, t), t);
    }

    // -------------------------------------------------------------------------
    export function quintic(a: number, b: number, c: number, d: number, e: number, f: number, t: number) {
        return linear(quartic(a, b, c, d, e, t), quartic(b, c, d, e, f, t), t);
    }

    // -------------------------------------------------------------------------
    // B(t) = (1 − t)^3 * P0 + 3(1 − t)^2 * t * P1 + 3(1 − t) *  t^2 * P2 + t^3 * P3  , 0 ≤ t ≤ 1.
    function bezierCoord(p1: number, p2: number, t: number): number {
        // p0 = 0, p3 = 1
        var p0 = 0;
        var p3 = 1;

        var u = 1 - t;
        var t2 = t * t;
        var u2 = u * u;
        var u3 = u2 * u;
        var t3 = t2 * t;

        return /*u3 * p0*/ 0 + 3 * u2 * t * p1 +  3 * u * t2 * p2 + t3 * p3;
    }

    // -------------------------------------------------------------------------
    export function bezier(p1x: number, p1y: number, p2x: number, p2y: number, t: number): number {
        var epsilon = 0.001;
        var maxIterations = 10;

        // binary search

        //establish bounds
        var lower = 0;
        var upper = 1;
        var percent = (upper + lower) / 2;

        //initial x
        var x = bezierCoord(p1x, p2x, percent);

        //loop until returned x - t is less than epsilon
        var iterations = 0;
        while (Math.abs(t - x) > epsilon && iterations < maxIterations) {
            if (t > x) {
                lower = percent;
            } else {
                upper = percent;
            }

            percent = (upper + lower) / 2;
            x = bezierCoord(p1x, p2x, percent);

            ++iterations;
        }

        //we're within tolerance of the desired x value. Return the y value.
        return bezierCoord(p1y, p2y, percent);
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
