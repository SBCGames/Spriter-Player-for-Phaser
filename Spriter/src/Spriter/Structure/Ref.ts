module Spriter {

    export class Ref {

        public id: number;
        public parent: number;
        public timeline: number;
        public key: number;
        public z: number;

        // -------------------------------------------------------------------------
        constructor(id: number, parent: number, timeline: number, key: number, z: number = 0) {
            this.id = id;
            this.parent = parent;
            this.timeline = timeline;
            this.key = key;
            this.z = z;
        }
    }
}
