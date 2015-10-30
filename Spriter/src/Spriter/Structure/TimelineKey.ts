module Spriter {

    export class TimelineKey {

        protected _id: number;

        protected _time: number;

        protected _spin: number;

        protected _curveType: eCurveType;
        protected _c1: number;
        protected _c2: number;
        protected _c3: number;
        protected _c4: number;

        // -------------------------------------------------------------------------
        constructor(aId: number, aTime: number, aSpin: number) {

            this._id = aId;
            this._time = aTime;
            this._spin = aSpin;

            this.setCurve(eCurveType.LINEAR);
        }

        // -------------------------------------------------------------------------
        public setCurve(aCurveType: eCurveType, aC1: number = 0, aC2: number = 0, aC3: number = 0, aC4: number = 0): void {
            this._curveType = aCurveType;
            this._c1 = aC1;
            this._c2 = aC2;
            this._c3 = aC3;
            this._c4 = aC4;
        }

        // -------------------------------------------------------------------------
        public get id(): number {
            return this._id;
        }

        // -------------------------------------------------------------------------
        public get time(): number {
            return this._time;
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
    }
}
