module Spriter {

    export class SpriterBone {

        public static UPDATE_X = 1;
        public static UPDATE_Y = 2;
        public static UPDATE_SCALE_X = 4;
        public static UPDATE_SCALE_Y = 8;
        public static UPDATE_PIVOT_X = 16;
        public static UPDATE_PIVOT_Y = 32;
        public static UPDATE_ANGLE = 64;
        public static UPDATE_ALPHA = 128;

        private _on: boolean;

        public name: string;
        public objectInfo: ObjectInfo;

        public parent: number;

        public timeline: number = -1;
        public timelineKey: number = -1;
        public key: KeyTimeline;

        public timeFrom: number;
        public timeTo: number;
        public from: SpatialInfo;
        public to: SpatialInfo;

        public transformed: SpatialInfo;

        public updateMask: number;

        public type: eObjectType;

        // -------------------------------------------------------------------------
        constructor() {
            this.transformed = new SpatialInfo();
        }

        // -------------------------------------------------------------------------
        public setOn(on: boolean): void {
            this._on = on;
        }

        // -------------------------------------------------------------------------
        public get on(): boolean {
            return this._on;
        }

        // -------------------------------------------------------------------------
        public setKey(entity: Entity, animation: Animation, timelineId: number, keyId: number): void {
            this.timeline = timelineId;
            this.timelineKey = keyId;

            var timeline = animation.getTimelineById(timelineId);
            this.name = timeline.name;
            this.objectInfo = (timeline.objectRef === -1) ? null : entity.getObjectInfoById(timeline.objectRef);

            var keyFrom = <KeyTimeline>timeline.at(keyId);
            // in the end loop to first key. If animation is not looping, then repeat last key
            var keyTo = <KeyTimeline>(timeline.at(keyId + 1, animation.loopType !== eAnimationLooping.NO_LOOPING));

            this.key = keyFrom;
            this.timeFrom = keyFrom.time;
            this.timeTo = keyTo.time;

            // if loop to key 0
            if (this.timeTo < this.timeFrom) {
                this.timeTo = animation.length;
            }

            this.from = keyFrom.info;
            this.to = keyTo.info;

            // create update mask
            this.updateMask = 0;
            if (Math.abs(this.from.x - this.to.x) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_X;
            }
            if (Math.abs(this.from.y - this.to.y) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_Y;
            }
            if (Math.abs(this.from.scaleX - this.to.scaleX) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_SCALE_X;
            }
            if (Math.abs(this.from.scaleY - this.to.scaleY) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_SCALE_Y;
            }
            if (Math.abs(this.from.pivotX - this.to.pivotX) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_PIVOT_X;
            }
            if (Math.abs(this.from.pivotY - this.to.pivotY) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_PIVOT_Y;
            }
            if (Math.abs(this.from.alpha - this.to.alpha) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_ALPHA;
            }
            if (Math.abs(this.from.angle - this.to.angle) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_ANGLE;
            }

            // init data
            this.transformed.x = this.from.x;
            this.transformed.y = this.from.y;
            this.transformed.scaleX = this.from.scaleX;
            this.transformed.scaleY = this.from.scaleY;
            this.transformed.pivotX = this.from.pivotX;
            this.transformed.pivotY = this.from.pivotY;
            this.transformed.angle = this.from.angle;
            this.transformed.alpha = this.from.alpha;
        }

        // -------------------------------------------------------------------------
        public tween(time: number): void {
            // calculate normalized time
            //var t = Phaser.Math.clamp((time - this.timeFrom) / (this.timeTo - this.timeFrom), 0, 1);
            var t = (this.updateMask > 0) ? this.getTweenTime(time) : 0;

            this.transformed.x = (this.updateMask & SpriterBone.UPDATE_X) > 0 ?
                linear(this.from.x, this.to.x, t) : this.from.x;
            this.transformed.y = (this.updateMask & SpriterBone.UPDATE_Y) > 0 ?
                linear(this.from.y, this.to.y, t) : this.from.y;

            this.transformed.scaleX = (this.updateMask & SpriterBone.UPDATE_SCALE_X) > 0 ?
                linear(this.from.scaleX, this.to.scaleX, t) : this.from.scaleX;
            this.transformed.scaleY = (this.updateMask & SpriterBone.UPDATE_SCALE_Y) > 0 ?
                linear(this.from.scaleY, this.to.scaleY, t) : this.from.scaleY;

            this.transformed.pivotX = (this.updateMask & SpriterBone.UPDATE_PIVOT_X) > 0 ?
                linear(this.from.pivotX, this.to.pivotX, t) : this.from.pivotX;
            this.transformed.pivotY = (this.updateMask & SpriterBone.UPDATE_PIVOT_Y) > 0 ?
                linear(this.from.pivotY, this.to.pivotY, t) : this.from.pivotY;

            this.transformed.alpha = (this.updateMask & SpriterBone.UPDATE_ALPHA) > 0 ?
                linear(this.from.alpha, this.to.alpha, t) : this.from.alpha;

            this.transformed.angle = (this.updateMask & SpriterBone.UPDATE_ANGLE) > 0 ?
                angleLinear(this.from.angle, this.to.angle, this.key.spin, t) : this.from.angle;
        }

        // -------------------------------------------------------------------------
        public update(parent: SpatialInfo): void {
            this.transformed.angle *= Phaser.Math.sign(parent.scaleX) * Phaser.Math.sign(parent.scaleY);
            this.transformed.angle += parent.angle;

            this.transformed.scaleX *= parent.scaleX;
            this.transformed.scaleY *= parent.scaleY;

            this.scalePosition(parent.scaleX, parent.scaleY);
            this.rotatePosition(parent.angle);
            this.translatePosition(parent.x, parent.y);

            this.transformed.alpha *= parent.alpha;
        }

        // -------------------------------------------------------------------------
        private scalePosition(parentScaleX: number, parentScaleY: number): void {
            this.transformed.x *= parentScaleX;
            this.transformed.y *= parentScaleY;
        }

        // -------------------------------------------------------------------------
        private rotatePosition(parentAngle: number): void {
            var x = this.transformed.x;
            var y = this.transformed.y

            if (x !== 0 || y !== 0) {
                var rads = parentAngle * (Math.PI / 180);

                var cos = Math.cos(rads);
                var sin = Math.sin(rads);

                this.transformed.x = x * cos - y * sin;
                this.transformed.y = x * sin + y * cos;
            }
        }

        // -------------------------------------------------------------------------
        private translatePosition(parentX: number, parentY: number): void {
            this.transformed.x += parentX;
            this.transformed.y += parentY;
        }

        // -------------------------------------------------------------------------
        private getTweenTime(time: number): number {
            if (this.key.curveType === eCurveType.INSTANT) {
                return 0;
            }

            var t = Phaser.Math.clamp((time - this.timeFrom) / (this.timeTo - this.timeFrom), 0, 1);

            switch (this.key.curveType) {
                case eCurveType.LINEAR:
                    return t;

                case eCurveType.QUADRATIC:
                    return quadratic(0, this.key.c1, 1, t);

                case eCurveType.CUBIC:
                    return cubic(0, this.key.c1, this.key.c2, 1, t);
            }

            return 0;
        }
    }
}
