module Spriter {

    export enum eTimelineType {
        UNKNOWN, MAIN_LINE, TIME_LINE, SOUND_LINE, EVENT_LINE, TAG_LINE, VAR_LINE
    }

    export class Baseline extends Item {

        private _type: eTimelineType;

        private _keys: Key[];
        
        // -------------------------------------------------------------------------
        public constructor(id: number, name: string = null) {
            super(id, name);

            this._type = eTimelineType.UNKNOWN;
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
        public get keys(): Key[] {
            return this._keys;
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
    }
}
