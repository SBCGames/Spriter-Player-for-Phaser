module Spriter {

    export class Timeline {

        private _id: number;
        private _name: string;

        private _type: eObjectType;
        private _objectRef: number;

        private _keys: TimelineKey[] = [];

        // -------------------------------------------------------------------------
        constructor(aId: number, aName: string, aType: eObjectType = eObjectType.SPRITE, aObjectRef: number = -1) {
            this._id = aId;
            this._name = aName;

            this._type = aType;
            this._objectRef = aObjectRef;
        }

        // -------------------------------------------------------------------------
        public get keys(): TimelineKey[] {
            return this._keys;
        }

        // -------------------------------------------------------------------------
        public addKey(aKey: TimelineKey): void {
            this._keys.push(aKey);
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
        public get type(): eObjectType {
            return this._type;
        }

        // -------------------------------------------------------------------------
        public get objectRef(): number {
            return this._objectRef;
        }
    }
}
