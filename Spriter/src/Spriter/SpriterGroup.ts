/// <reference path="../../lib/phaser.d.ts" />
module Spriter {

    export class SpriterGroup extends Phaser.Group {

        private _spriter: Spriter;
        private _textureKey: string;

        private _entityName: string;
        private _currentAnimationName: string;
        private _animation: Animation;
        private _animationSpeed: number;

        private _bones: SpriterBone[] = [];
        private _objects: SpriterObject[] = [];

        private _time: number;
        private _nextTime: number;
        private _keyIndex: number;

        private _root: SpatialInfo;

        private _pause: boolean = false;
        private _finished: boolean;

        private _listener: ISpriterGroupListener = null;

        // -------------------------------------------------------------------------
        constructor(aGame: Phaser.Game, aSpriter: Spriter, aTextureKey: string, aEntityName: string,
            aAnimation?: string | number, aAnimationSpeedPercent?: number) {

            super(aGame, null);

            this._spriter = aSpriter;
            this._entityName = aEntityName;
            this._textureKey = aTextureKey;

            this._root = new SpatialInfo();

            // set animation speed
            if (aAnimationSpeedPercent === undefined) {
                aAnimationSpeedPercent = 100;
            }

            this.setAnimationSpeedPercent(aAnimationSpeedPercent);

            // set animation
            if (aAnimation === undefined || aAnimation === null) {
                // set first animation
                this.setAnimationById(0);
            } else if (typeof aAnimation === "number") {
                this.setAnimationById(aAnimation);
            } else {
                this.setAnimationByName(aAnimation);
            }
        }

        // -------------------------------------------------------------------------
        public set listener(aListener: ISpriterGroupListener) {
            this._listener = aListener;
        }

        // -------------------------------------------------------------------------
        public get animationCount(): number {
            return this._spriter.getEntityByName(this._entityName).animationsCount;
        }

        // -------------------------------------------------------------------------
        public get currentAnimationName(): string {
            return this._currentAnimationName;
        }

        // -------------------------------------------------------------------------
        public setAnimationSpeedPercent(aAnimationSpeedPercent: number = 100) {
            this._animationSpeed = aAnimationSpeedPercent / 100;
        }

        // -------------------------------------------------------------------------
        public setAnimationById(aAnimationId: number): void {
            var animation = this._spriter.getEntityByName(this._entityName).getAnimationById(aAnimationId);

            if (animation === undefined || animation === null) {
                console.warn("Animation " + aAnimationId + " for entity " + this._entityName + " does not exist!");
                return;
            }

            this.setAnimation(animation);
        }

        // -------------------------------------------------------------------------
        public setAnimationByName(aAnimationName: string): void {
            var animation = this._spriter.getEntityByName(this._entityName).getAnimationByName(aAnimationName);

            if (animation === undefined || animation === null) {
                console.warn("Animation " + aAnimationName + " for entity " + this._entityName + " does not exist!");
                return;
            }

            this.setAnimation(animation);
        }

        // -------------------------------------------------------------------------
        private setAnimation(aAnimation: Animation): void{
            this._currentAnimationName = aAnimation.name;
            this._animation = aAnimation

            this._finished = false;

            // reset time to beginning of animation and find first from and to keys
            this.clearTime();

            // create bones and sprites - based on data in mainLine key 0
            this.loadKeys(0, true);
            // first update - to set correct positions
            this.updateCharacter();
        }

        // -------------------------------------------------------------------------
        private clearTime(): void {
            this._time = 0;
            this._keyIndex = -1;
        }

        // -------------------------------------------------------------------------
        private getNextMainLineKeyTime(aTime: number) {
            var keys = this._animation.mainLineKeys;
            var newIndex = (this._keyIndex + 1) % keys.length;

            this._nextTime = newIndex !== 0 ? keys[newIndex].time : this._animation.length;

            // game is lagging or keys are to close to each other - notify in console
            if (newIndex !== 0 && this._nextTime < aTime) {
                console.log("Game is lagging or keys are too close to each other...");
            }
        }

        // -------------------------------------------------------------------------
        private setBones(aBones: Ref[], aForce: boolean = false): void {
            // switch off all existing bones
            for (var i = 0; i < this._bones.length; i++) {
                if (this._bones[i] !== undefined) {
                    this._bones[i].setOn(false);
                }
            }

            // go through all bones and add new ones if necessary and activate used ones
            for (var i = 0; i < aBones.length; i++) {
                var ref = aBones[i];

                // if bone does not exist add it and make active, else make it active only
                if (this._bones[ref.id] === undefined) {
                    this._bones[ref.id] = new SpriterBone();
                }

                var bone = this._bones[ref.id];

                bone.setOn(true);
                bone.parent = ref.parent;

                if (bone.timelineKey != ref.key || aForce) {
                    bone.setKey(this._animation, ref.timeline, ref.key);
                }
            }
        }

        // -------------------------------------------------------------------------
        private setObjects(aObjects: Ref[], aForce: boolean = false): void {
            // switch off (kill) all existing sprites
            for (var i = 0; i < this._objects.length; i++) {
                if (this._objects[i] !== undefined) {
                    this._objects[i].setOn(false);
                }
            }

            // go through all objects/sprites and add new ones if necessary and activate used ones
            var zChange = false;
            for (var i = 0; i < aObjects.length; i++) {
                var ref = aObjects[i];

                var object: SpriterObject = null;
                var sprite: Phaser.Sprite = null;

                // if sprite does not exist add it and make active, else make it active only
                if (this._objects[ref.id] === undefined) {
                    sprite = new Phaser.Sprite(this.game, 0, 0, this._textureKey);
                    object = new SpriterObject(this._spriter, sprite);
                    this._objects[ref.id] = object;
                    this.add(sprite);
                } else {
                    object = this._objects[ref.id];
                    sprite = object.sprite;
                }

                object.setOn(true);
                object.parent = ref.parent;

                if (object.sprite.z !== ref.z) {
                    object.sprite.z = ref.z;
                    zChange = true;
                }

                if (object.timelineKey != ref.key || aForce) {
                    object.setKey(this._animation, ref.timeline, ref.key);
                }
            }

            // need to sort sprites?
            if (zChange) {
                this.sort();
            }
        }

        // -------------------------------------------------------------------------
        private loadKeys(aMainLineKeyIndex: number, aForce: boolean = false): void {
            // create or update bones and sprites
            this.setBones(this._animation.mainLineKeys[aMainLineKeyIndex].boneRefs, aForce);
            this.setObjects(this._animation.mainLineKeys[aMainLineKeyIndex].objectRefs, aForce);
        }

        // -------------------------------------------------------------------------
        public updateAnimation() {
            if (this._pause || this._finished) {
                return;
            }

            if (this._keyIndex === -1 || this._time > this._nextTime) {
                this._keyIndex = (this._keyIndex + 1) % this._animation.mainLineKeys.length;

                // start anim from beginning again
                if (this._time > this._animation.length) {
                    if (this._animation.loopType === eAnimationLooping.NO_LOOPING) {
                        // prevent skipping all keys in the very end of animation - loop through all of them and adjust sprites
                        while (this._keyIndex !== 0) {
                            this.getNextMainLineKeyTime(this._time);
                            this.loadKeys(this._keyIndex);
                            this.updateCharacter();
                            this._keyIndex = (this._keyIndex + 1) % this._animation.mainLineKeys.length;
                        } 
                        this._finished = true;
                        this.onFinished();
                        return;
                    }

                    this.onLoop();
                    this._time = 0;
                    this._keyIndex = 0;
                }

                this.getNextMainLineKeyTime(this._time);
                this.loadKeys(this._keyIndex);
            }

            this.updateCharacter();
            this._time += (this.game.time.physicsElapsedMS * this._animationSpeed);
        }

        // -------------------------------------------------------------------------
        private updateCharacter() {
            for (var i = 0; i < this._bones.length; i++) {
                var bone = this._bones[i];
                if (bone.on) {
                    var parentSpatial = (bone.parent === -1) ? this._root : this._bones[bone.parent].transformed;
                    bone.tween(this._time);
                    bone.update(parentSpatial);
                }
            }

            for (var i = 0; i < this._objects.length; i++) {
                var object = this._objects[i];
                if (object.on) {
                    var parentSpatial = (object.parent === -1) ? this._root : this._bones[object.parent].transformed;
                    object.tween(this._time);
                    object.update(parentSpatial);
                }
            }
        }

        // -------------------------------------------------------------------------
        public onLoop(): void {
            // do nothing by default;
        }

        // -------------------------------------------------------------------------
        public onFinished(): void {
            if (this._listener !== null) {
                this._listener.onAnimationFinished(this);
            }
        }
    }
}
