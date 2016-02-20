module Spriter {

    export class Varline extends Baseline {

        private _varDefId: number;

        // -------------------------------------------------------------------------
        public constructor(id: number, varDefId: number) {
            super(id, null);

            this._varDefId = varDefId;
            this.type = eTimelineType.VAR_LINE;
        }

        // -------------------------------------------------------------------------
        public get varDefId(): number {
            return this._varDefId;
        }
    }
}
