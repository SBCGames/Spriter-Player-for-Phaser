module Spriter {

    export class Item {

        protected _id: number;
        protected _name: string;

        // -------------------------------------------------------------------------
        public constructor(id: number, name: string) {
            this._id = id;
            this._name = name;
        }

        // -------------------------------------------------------------------------
        public get id(): number {
            return this._id;
        }

        // -------------------------------------------------------------------------
        public get name(): string {
            return this._name;
        }
    }
}
