module Spriter {

    export class KeyTimeline extends Key {

        protected _spin: number;

        protected _curveType: eCurveType;
        protected _c1: number;
        protected _c2: number;
        protected _c3: number;
        protected _c4: number;

        protected _info: SpatialInfo = new SpatialInfo();

        // -------------------------------------------------------------------------
        constructor(id: number, time: number, spin: number) {
            super(id, time);

            this._spin = spin;

            this.setCurve(eCurveType.LINEAR);
        }

        // -------------------------------------------------------------------------
        public setCurve(curveType: eCurveType, c1: number = 0, c2: number = 0, c3: number = 0, c4: number = 0): void {
            this._curveType = curveType;
            this._c1 = c1;
            this._c2 = c2;
            this._c3 = c3;
            this._c4 = c4;
        }

        // -------------------------------------------------------------------------
        public get spin(): number {
            return this._spin;
        }

        // -------------------------------------------------------------------------
        public get curveType(): eCurveType {
            return this._curveType;
        }

        // -------------------------------------------------------------------------
        public get c1(): number {
            return this._c1;
        }

        // -------------------------------------------------------------------------
        public get c2(): number {
            return this._c2;
        }

        // -------------------------------------------------------------------------
        public get c3(): number {
            return this._c3;
        }

        // -------------------------------------------------------------------------
        public get c4(): number {
            return this._c4;
        }

        // -------------------------------------------------------------------------
        public get info(): SpatialInfo {
            return this._info;
        }
    }
}
