import { Baseline, eTimelineType } from "./Baseline";
import { eObjectType } from "./Types";

export class Timeline extends Baseline {

    private _objectType: eObjectType;
    private _objectRef: number;

    // -------------------------------------------------------------------------
    constructor(id: number, name: string, type: eObjectType = eObjectType.SPRITE, objectRef: number = -1) {
        super(id, name);

        this.type = eTimelineType.TIME_LINE;

        this._objectType = type;
        this._objectRef = objectRef;
    }

    // -------------------------------------------------------------------------
    public get objectType(): eObjectType {
        return this._objectType;
    }

    // -------------------------------------------------------------------------
    public get objectRef(): number {
        return this._objectRef;
    }
}
