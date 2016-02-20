module Spriter {

    export class Key {

        private _id: number;
        private _time: number;

        // -------------------------------------------------------------------------
        public constructor(id: number, time: number) {
            this._id = id;
            this._time = time;
        }

        // -------------------------------------------------------------------------
        public get id(): number {
            return this._id;
        }

        // -------------------------------------------------------------------------
        public get time(): number {
            return this._time;
        }
    }
}
