module Spriter {

    export class File {

        private _id: number;
        private _name: string;
        private _anchorX: number;
        private _anchorY: number;

        // -------------------------------------------------------------------------
        constructor(aId: number, aName: string, aAnchorX: number, aAnchorY: number) {
            this._id = aId;
            this._name = aName;
            this._anchorX = aAnchorX;
            this._anchorY = aAnchorY;
        }
        
        // -------------------------------------------------------------------------
        public get id(): number {
            return this._id;
        }

        // -------------------------------------------------------------------------
        public get name(): string {
            return this._name;
        }

        // -------------------------------------------------------------------------
        public get anchorX(): number {
            return this._anchorX;
        }

        // -------------------------------------------------------------------------
        public get anchorY(): number {
            return this._anchorY;
        }
    }
}