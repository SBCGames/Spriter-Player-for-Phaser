/// <reference path="Item.ts" />

module Spriter {

    export class File extends Item {

        private _pivotX: number;
        private _pivotY: number;

        // -------------------------------------------------------------------------
        constructor(id: number, name: string, pivotX: number, pivotY: number) {
            super(id, name);

            this._pivotX = pivotX;
            this._pivotY = pivotY;
        }

        // -------------------------------------------------------------------------
        public get pivotX(): number {
            return this._pivotX;
        }

        // -------------------------------------------------------------------------
        public get pivotY(): number {
            return this._pivotY;
        }
    }
}