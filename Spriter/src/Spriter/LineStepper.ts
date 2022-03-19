import { Baseline } from "./Structure/Baseline";
import { Key }      from "./Structure/Key";

export class LineStepper {

    private _line: Baseline;

    private _currentIndex: number;
    private _nextIndex: number;
    private _lastTime: number;

    // -------------------------------------------------------------------------
    public constructor() {
        this.reset();
    }

    // -------------------------------------------------------------------------
    public get current(): Key {
        return this._line.at(this._currentIndex);
    }

    // -------------------------------------------------------------------------
    public get currentIndex(): number {
        return this._currentIndex;
    }

    // -------------------------------------------------------------------------
    public get next(): Key {
        return this._line.at(this._nextIndex);
    }

    // -------------------------------------------------------------------------
    public get nextIndex(): number {
        return this._nextIndex;
    }

    // -------------------------------------------------------------------------
    public set lastTime(time: number) {
        this._lastTime = time;
    }

    // -------------------------------------------------------------------------
    public set line(line: Baseline) {
        this._line = line;
    }

    // -------------------------------------------------------------------------
    public get line(): Baseline {
        return this._line;
    }

    // -------------------------------------------------------------------------
    public reset(): void {
        this._lastTime = -1;
        this._currentIndex = -1;
        this._nextIndex = 0;
    }

    // -------------------------------------------------------------------------
    public step(time: number): Key {
        var index = this._nextIndex;

        // get key at current position
        var key = this._line.keys[index];
        var keyTime = key.time;
        // if current key time is bigger than time for stepTo, then we must first go till end of timeline and then continue from beginning
        var loop = time < this._lastTime;

        if ((!loop && (keyTime > this._lastTime && keyTime <= time)) ||
            (loop && (keyTime > this._lastTime || keyTime <= time))) {

            this._lastTime = keyTime;
            this._currentIndex = index;

            if ((++index) >= this._line.keys.length) {
                index = 0;
            }
            this._nextIndex = index;

            return key;
        } else if (loop) {
            this._lastTime = -1;
        }

        return null;
    }
}
