module Spriter {

    export class MainLineKey {

        private _time: number;

        private _boneRefs: Ref[] = [];
        private _objectRefs: Ref[] = [];

        // -------------------------------------------------------------------------
        constructor(aTime: number) {
            this._time = aTime;
        }

        // -------------------------------------------------------------------------
        public get boneRefs(): Ref[]{
            return this._boneRefs;
        }

        // -------------------------------------------------------------------------
        public addBoneRef(aBoneRef: Ref): void {
            this._boneRefs.push(aBoneRef);
        }

        // -------------------------------------------------------------------------
        public get objectRefs(): Ref[]{
            return this._objectRefs;
        }

        // -------------------------------------------------------------------------
        public addObjectRef(aObjectRef: Ref): void {
            this._objectRefs.push(aObjectRef);
        }

        // -------------------------------------------------------------------------
        public get time(): number {
            return this._time;
        }
    }
}
