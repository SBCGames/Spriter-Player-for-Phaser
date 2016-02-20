module Spriter {

    export enum eTimelineType {
        UNKNOWN, MAIN_LINE, TIME_LINE, SOUND_LINE, EVENT_LINE, TAG_LINE, VAR_LINE
    }

    export class Baseline extends Item {

        private _type: eTimelineType;

        private _keys: Key[];

        private _currentIndex: number;
        private _nextIndex: number;
        private _lastTime: number;
        
        // -------------------------------------------------------------------------
        public constructor(id: number, name: string = null) {
            super(id, name);

            this._type = eTimelineType.UNKNOWN;

            this.reset();
        }

        // -------------------------------------------------------------------------
        public get type(): eTimelineType {
            return this._type;
        }

        // -------------------------------------------------------------------------
        public set type(type: eTimelineType) {
            this._type = type;
        }

        // -------------------------------------------------------------------------
        public reset(): void {
            this._lastTime = -1;
            this._currentIndex = -1;
            this._nextIndex = 0;
        }

        // -------------------------------------------------------------------------
        public add(key: Key): void {
            if (this._keys === null || this._keys === undefined) {
                this._keys = [];
            }

            this._keys.push(key);
        }

        // -------------------------------------------------------------------------
        public at(index: number, loop: boolean = true): Key {
            if (index < 0) {
                return null;
            }

            var length = this._keys.length;

            if (index >= length) {
                if (loop) {
                    index = index % length;
                } else {
                    index = length - 1;
                }
            }

            return this._keys[index];
        }

        // -------------------------------------------------------------------------
        public get current(): Key {
            return this.at(this._currentIndex);
        }

        // -------------------------------------------------------------------------
        public get currentIndex(): number {
            return this._currentIndex;
        }

        // -------------------------------------------------------------------------
        public get next(): Key {
            return this.at(this._nextIndex);
        }

        // -------------------------------------------------------------------------
        public get nextIndex(): number {
            return this._nextIndex;
        }

        // -------------------------------------------------------------------------
        public step(time: number): Key {
            var index = this._nextIndex;

            // get key at current position
            var key = this._keys[index];
            var keyTime = key.time;
            // if current key time is bigger than time for stepTo, then we must first go till end of timeline and then continue from beginning
            var loop = time < this._lastTime;

            if ((!loop && (keyTime > this._lastTime && keyTime <= time)) ||
                (loop && (keyTime > this._lastTime || keyTime <= time))) {

                this._lastTime = keyTime;
                this._currentIndex = index;

                if ((++index) >= this._keys.length) {
                    index = 0;
                }
                this._nextIndex = index;
                
                return key;
            }

            return null;
        }

        // -------------------------------------------------------------------------
        public set lastTime(time: number) {
            this._lastTime = time;
        }
    }
}
