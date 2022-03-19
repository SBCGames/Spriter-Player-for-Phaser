import { Key } from "./Key";
import { Ref } from "./Ref";

export class KeyMainline extends Key {

    private _boneRefs: Ref[] = [];
    private _objectRefs: Ref[] = [];

    // -------------------------------------------------------------------------
    public get boneRefs(): Ref[] {
        return this._boneRefs;
    }

    // -------------------------------------------------------------------------
    public addBoneRef(boneRef: Ref): void {
        this._boneRefs.push(boneRef);
    }

    // -------------------------------------------------------------------------
    public get objectRefs(): Ref[] {
        return this._objectRefs;
    }

    // -------------------------------------------------------------------------
    public addObjectRef(objectRef: Ref): void {
        this._objectRefs.push(objectRef);
    }
}
