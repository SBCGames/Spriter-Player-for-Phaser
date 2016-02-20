module Spriter {

    export class KeyVariable extends Key {

        private _value: number | string;

        // -------------------------------------------------------------------------
        public constructor(id: number, time: number, value: number | string) {
            super(id, time);

            this._value = value;
        }

        // -------------------------------------------------------------------------
        public get value(): string | number {
            return this._value;
        }
    }
}
