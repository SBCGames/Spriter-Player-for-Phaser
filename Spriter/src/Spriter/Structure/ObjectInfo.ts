module Spriter {

    export class ObjectInfo {

        private _id: number;
        private _type: eObjectType;
        private _name: string;
        private _width: number;
        private _height: number;

        // -------------------------------------------------------------------------
        constructor(aId: number, aName: string, aType: eObjectType, aWidth: number, aHeight: number) {
            this._id = aId;
            this._type = aType;
            this._name = aName;
            this._width = aWidth;
            this._height = aHeight;
        }

        // -------------------------------------------------------------------------
        public get id(): number {
            return this._id;
        }

        // -------------------------------------------------------------------------
        public get type(): eObjectType {
            return this._type;
        }

        // -------------------------------------------------------------------------
        public get name(): string {
            return this._name;
        }

        // -------------------------------------------------------------------------
        public get width(): number {
            return this._width;
        }

        // -------------------------------------------------------------------------
        public get height(): number {
            return this._height;
        }
    }
}
