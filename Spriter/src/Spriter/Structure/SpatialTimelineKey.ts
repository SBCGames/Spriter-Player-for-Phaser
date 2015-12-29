/// <reference path="TimelineKey.ts" />
module Spriter {

    export class SpatialTimelineKey extends TimelineKey {

        protected _info: SpatialInfo = new SpatialInfo();

        // -------------------------------------------------------------------------
        public get info(): SpatialInfo {
            return this._info;
        }
    }
}
