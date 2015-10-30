module Spriter {

    export class Ref {

        public id: number;
        public parent: number;
        public timeline: number;
        public key: number;
        public z: number;

        // -------------------------------------------------------------------------
        constructor(aId: number, aParent: number, aTimeline: number, aKey: number, aZ: number = 0) {
            this.id = aId;
            this.parent = aParent;
            this.timeline = aTimeline;
            this.key = aKey;
            this.z = aZ;
        }
    }
}
