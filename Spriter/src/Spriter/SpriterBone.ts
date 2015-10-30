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

        public parent: number;

        public timelineKey: number = -1;
        public key: SpatialTimelineKey;

        public timeFrom: number;
        public timeTo: number;
        public from: SpatialInfo;
        public to: SpatialInfo;

        public transformed: SpatialInfo;

        public updateMask: number;

        // -------------------------------------------------------------------------
        constructor() {
            this.transformed = new SpatialInfo();
        }

        // -------------------------------------------------------------------------
        public setOn(aOn: boolean): void {
            this._on = aOn;
        }

        // -------------------------------------------------------------------------
        public get on(): boolean {
            return this._on;
        }

        // -------------------------------------------------------------------------
        public setKey(aAnimation: Animation, aTimelineId: number, aKeyId: number): void {
            this.timelineKey = aKeyId;

            var keys = aAnimation.getTimelineById(aTimelineId).keys;

            var keyFrom = <SpatialTimelineKey> keys[aKeyId];
            // in the end loop to first key. If animation is not looping, then repeat last key
            var endIndex = (aKeyId + 1) % keys.length;
            if (endIndex === 0 && aAnimation.loopType === eAnimationLooping.NO_LOOPING) {
                endIndex = aKeyId;
            }
            var keyTo = <SpatialTimelineKey> keys[endIndex];

            this.key = keyFrom;
            this.timeFrom = keyFrom.time;
            this.timeTo = keyTo.time;

            // if loop to key 0
            if (this.timeTo < this.timeFrom) {
                this.timeTo = aAnimation.length;
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
        public tween(aTime: number): void {
            // calculate normalized time
            //var t = Phaser.Math.clamp((aTime - this.timeFrom) / (this.timeTo - this.timeFrom), 0, 1);
            var t = (this.updateMask > 0) ? this.getTweenTime(aTime) : 0;

            this.transformed.x = (this.updateMask & SpriterBone.UPDATE_X) > 0 ?
                this.linear(this.from.x, this.to.x, t) : this.from.x;
            this.transformed.y = (this.updateMask & SpriterBone.UPDATE_Y) > 0 ?
                this.linear(this.from.y, this.to.y, t) : this.from.y;

            this.transformed.scaleX = (this.updateMask & SpriterBone.UPDATE_SCALE_X) > 0 ?
                this.linear(this.from.scaleX, this.to.scaleX, t) : this.from.scaleX;
            this.transformed.scaleY = (this.updateMask & SpriterBone.UPDATE_SCALE_Y) > 0 ?
                this.linear(this.from.scaleY, this.to.scaleY, t) : this.from.scaleY;

            this.transformed.pivotX = (this.updateMask & SpriterBone.UPDATE_PIVOT_X) > 0 ?
                this.linear(this.from.pivotX, this.to.pivotX, t) : this.from.pivotX;
            this.transformed.pivotY = (this.updateMask & SpriterBone.UPDATE_PIVOT_Y) > 0 ?
                this.linear(this.from.pivotY, this.to.pivotY, t) : this.from.pivotY;

            this.transformed.alpha = (this.updateMask & SpriterBone.UPDATE_ALPHA) > 0 ?
                this.linear(this.from.alpha, this.to.alpha, t) : this.from.alpha;

            this.transformed.angle = (this.updateMask & SpriterBone.UPDATE_ANGLE) > 0 ?
                this.angleLinear(this.from.angle, this.to.angle, this.key.spin, t) : this.from.angle;
        }

        // -------------------------------------------------------------------------
        public update(aParent: SpatialInfo): void {
            this.transformed.angle *= Phaser.Math.sign(aParent.scaleX) * Phaser.Math.sign(aParent.scaleY);
            this.transformed.angle += aParent.angle;

            this.transformed.scaleX *= aParent.scaleX;
            this.transformed.scaleY *= aParent.scaleY;

            this.scalePosition(aParent.scaleX, aParent.scaleY);
            this.rotatePosition(aParent.angle);
            this.translatePosition(aParent.x, aParent.y);

            this.transformed.alpha *= aParent.alpha;
        }

        // -------------------------------------------------------------------------
        private scalePosition(aParentScaleX: number, aParentScaleY: number): void {
            this.transformed.x *= aParentScaleX;
            this.transformed.y *= aParentScaleY;
        }

        // -------------------------------------------------------------------------
        private rotatePosition(aParentAngle: number): void {
            var x = this.transformed.x;
            var y = this.transformed.y

            if (x !== 0 || y !== 0) {
                var rads = aParentAngle * (Math.PI / 180);

                var cos = Math.cos(rads);
                var sin = Math.sin(rads);

                this.transformed.x = x * cos - y * sin;
                this.transformed.y = x * sin + y * cos;
            }
        }

        // -------------------------------------------------------------------------
        private translatePosition(aParentX: number, aParentY: number): void {
            this.transformed.x += aParentX;
            this.transformed.y += aParentY;
        }

        // -------------------------------------------------------------------------
        private getTweenTime(aTime: number): number {
            if (this.key.curveType === eCurveType.INSTANT) {
                return 0;
            }

            var t = Phaser.Math.clamp((aTime - this.timeFrom) / (this.timeTo - this.timeFrom), 0, 1);

            switch (this.key.curveType) {
                case eCurveType.LINEAR:
                    return t;

                case eCurveType.QUADRATIC:
                    return this.quadratic(0, this.key.c1, 1, t);

                case eCurveType.CUBIC:
                    return this.cubic(0, this.key.c1, this.key.c2, 1, t);
            }

            return 0;
        }
        
        // -------------------------------------------------------------------------
        private linear(aA: number, aB: number, aT: number): number {
            return ((aB - aA) * aT) + aA;
        }

        // -------------------------------------------------------------------------
        private quadratic(aA: number, aB: number, aC: number, aT: number) {
            return this.linear(this.linear(aA, aB, aT), this.linear(aB, aC, aT), aT);
        }

        // -------------------------------------------------------------------------
        private cubic(aA: number, aB: number, aC: number, aD: number, aT:number) {
            return this.linear(this.quadratic(aA, aB, aC, aT), this.quadratic(aB, aC, aD, aT), aT);
        }

        // -------------------------------------------------------------------------
        private angleLinear(aAngleA: number, aAngleB: number, aSpin: number, aT: number): number {
            // no spin
            if (aSpin === 0) {
                return aAngleA;
            }

            // spin left
            if (aSpin > 0) {
                if (aAngleB > aAngleA) {
                    aAngleB -= 360;
                }
            } else {    // spin right
                if (aAngleB < aAngleA) {
                    aAngleB += 360;
                }
            }

            return this.linear(aAngleA, aAngleB, aT);
        }
    }
}
