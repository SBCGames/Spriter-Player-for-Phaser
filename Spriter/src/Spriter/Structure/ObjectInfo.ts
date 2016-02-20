/// <reference path="Item.ts" />

module Spriter {

    export class ObjectInfo extends Item {

        private _type: eObjectType;
        private _width: number;
        private _height: number;
        private _pivotX: number;
        private _pivotY: number;

        // -------------------------------------------------------------------------
        constructor(id: number, name: string, type: eObjectType, width: number, height: number, pivotX: number, pivotY: number) {
            super(id, name);

            this._type = type;
            this._width = width;
            this._height = height;
            this._pivotX = pivotX;
            this._pivotY = pivotY;
        }

        // -------------------------------------------------------------------------
        public get type(): eObjectType {
            return this._type;
        }

        // -------------------------------------------------------------------------
        public get width(): number {
            return this._width;
        }

        // -------------------------------------------------------------------------
        public get height(): number {
            return this._height;
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
