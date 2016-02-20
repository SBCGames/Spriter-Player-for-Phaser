/// <reference path="Item.ts" />

module Spriter {

    export class CharMap extends Item {

        private _map: any;

        // -------------------------------------------------------------------------
        public put(key: string, value: File): void {
            if (this._map === undefined) {
                this._map = {}
            }

            if (this._map[key] !== undefined) {
                console.error("Key with name " + key + " already exists");
            }

            this._map[key] = value;
        }

        // -------------------------------------------------------------------------
        public value(key: string): File {
            return this._map[key];
        }
    }
}
