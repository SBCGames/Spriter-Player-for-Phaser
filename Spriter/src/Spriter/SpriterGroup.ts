module Spriter {

    export class SpriterGroup extends Phaser.Group {

        // onLoop(SpriterGroup);
        public onLoop: Phaser.Signal = new Phaser.Signal();
        // onFinish(SpriterGroup);
        public onFinish: Phaser.Signal = new Phaser.Signal();

        // onSound(SpriterGroup, string); // string for line name which equals soud name without extension
        public onSound: Phaser.Signal = new Phaser.Signal();
        // onEvent(SpriterGroup, string); // string for line name which equals event name
        public onEvent: Phaser.Signal = new Phaser.Signal();
        // onTagChange(SpriterGroup, string, boolean); // string for tag name, boolean for change (true = set / false = unset)
        public onTagChange: Phaser.Signal = new Phaser.Signal();
        // onVariableSet(SpriterGroup, Variable); // Variable is Spriter variable def with access to value
        public onVariableSet: Phaser.Signal = new Phaser.Signal();

        private _spriter: Spriter;
        private _textureKey: string;

        private _entity: Entity;
        private _entityName: string;
        private _animation: Animation;
        private _animationName: string;
        private _animationSpeed: number;

        private _bones: SpriterBone[] = [];
        private _objects: SpriterObject[] = [];
        private _tags: number = 0;  // up to 32 tags - 1 per bit
        private _vars: Variable[] = [];

        private _charMapStack: CharMapStack;

        private _time: number;

        private _root: SpatialInfo;

        private _paused: boolean = false;
        private _finished: boolean;

        // -------------------------------------------------------------------------
        constructor(game: Phaser.Game, spriter: Spriter, texutreKey: string, entityName: string,
            animation?: string | number, animationSpeedPercent?: number) {

            super(game, null);

            this._spriter = spriter;
            this._entityName = entityName;
            this._entity = spriter.getEntityByName(entityName);
            this._textureKey = texutreKey;

            this._root = new SpatialInfo();

            // clone variables
            for (var i = 0; i < this._entity.variablesLength; i++) {
                this._vars[i] = this._entity.getVariableById(i).clone();
            }

            // create charmap stack
            this._charMapStack = new CharMapStack(this._entity);

            // set animation speed
            if (animationSpeedPercent === undefined) {
                animationSpeedPercent = 100;
            }

            this.setAnimationSpeedPercent(animationSpeedPercent);

            // set animation
            if (animation === undefined || animation === null) {
                // set first animation
                this.playAnimationById(0);
            } else if (typeof animation === "number") {
                this.playAnimationById(animation);
            } else {
                this.playAnimationByName(animation);
            }
        }

        // -------------------------------------------------------------------------
        public get spriter(): Spriter {
            return this._spriter;
        }

        // -------------------------------------------------------------------------
        public get entity(): Entity {
            return this._entity;
        }

        // -------------------------------------------------------------------------
        public get charMapStack(): CharMapStack {
            return this._charMapStack;
        }

        // -------------------------------------------------------------------------
        public get puased(): boolean {
            return this._paused;
        }

        // -------------------------------------------------------------------------
        public set paused(paused: boolean) {
            this.paused = paused;
        }

        // -------------------------------------------------------------------------
        public get animationsCount(): number {
            return this._entity.animationsLength;
        }

        // -------------------------------------------------------------------------
        public get currentAnimationName(): string {
            return this._animationName;
        }

        // -------------------------------------------------------------------------
        public pushCharMap(charMapName: string): void {
            this._charMapStack.push(charMapName);
            this.resetSprites();
        }

        // -------------------------------------------------------------------------
        public removeCharMap(charMapName: string): void {
            this._charMapStack.remove(charMapName);
            this.resetSprites();
        }
        
        // -------------------------------------------------------------------------
        public clearCharMaps(): void {
            this._charMapStack.reset();
            this.resetSprites();
        }

        // -------------------------------------------------------------------------
        private resetSprites(): void {
            for (var i = 0; i < this._objects.length; i++) {
                this._objects[i].resetFile();
            }
        }
        
        // -------------------------------------------------------------------------
        public isTagOn(tagName: string): boolean {
            return this.isTagOnById(this._spriter.getTagByName(tagName).id);
        }

        // -------------------------------------------------------------------------
        public isTagOnById(tagId: number): boolean {
            return (this._tags & (1 << tagId)) > 0;
        }

        // -------------------------------------------------------------------------
        public getVariable(varName: string): Variable {
            return this.getVariableById(this._entity.getVariableByName(varName).id);
        }

        // -------------------------------------------------------------------------
        public getVariableById(varId: number): Variable {
            return this._vars[varId];
        }

        // -------------------------------------------------------------------------
        public getObject(objectName: string): SpriterObject {
            for (var i = 0; i < this._objects.length; i++) {
                var object = this._objects[i];

                if (object.name === objectName) {
                    return object;
                }
            }

            return null;
        }

        // -------------------------------------------------------------------------
        public setAnimationSpeedPercent(aAnimationSpeedPercent: number = 100) {
            this._animationSpeed = aAnimationSpeedPercent / 100;
        }

        // -------------------------------------------------------------------------
        public playAnimationById(aAnimationId: number): void {
            var animation = this._entity.getAnimationById(aAnimationId);

            if (animation === undefined || animation === null) {
                console.warn("Animation " + aAnimationId + " for entity " + this._entityName + " does not exist!");
                return;
            }

            this.playAnimation(animation);
        }

        // -------------------------------------------------------------------------
        public playAnimationByName(aAnimationName: string): void {
            var animation = this._entity.getAnimationByName(aAnimationName);

            if (animation === undefined || animation === null) {
                console.warn("Animation " + aAnimationName + " for entity " + this._entityName + " does not exist!");
                return;
            }

            this.playAnimation(animation);
        }

        // -------------------------------------------------------------------------
        private playAnimation(aAnimation: Animation): void{
            this._animationName = aAnimation.name;
            this._animation = aAnimation

            this._finished = false;

            // reset time to beginning of animation and find first from and to keys
            this._animation.mainline.reset();
            this._time = 0;

            // reset all additional time lines (soundline, varline, tagline, eventline)
            aAnimation.resetLines();

            // reset tags
            this._tags = 0;

            // reset variables to defaults
            for (var i = 0; i < this._vars.length; i++) {
                this._vars[i].reset();
            }

            // create bones and sprites - based on data in mainLine key 0
            this.loadKeys(<KeyMainline>this._animation.mainline.at(0), true);
            // first update - to set correct positions
            this.updateCharacter();
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
                    var newBone = new SpriterBone();
                    newBone.type = eObjectType.BONE;
                    this._bones[ref.id] = newBone;
                }

                var bone = this._bones[ref.id];

                bone.setOn(true);
                bone.parent = ref.parent;

                if (bone.timelineKey !== ref.key || bone.timeline !== ref.timeline || aForce) {
                    bone.setKey(this._entity, this._animation, ref.timeline, ref.key);
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
                    object = new SpriterObject(this, sprite);
                    this._objects[ref.id] = object;
                    this.add(sprite);
                } else {
                    object = this._objects[ref.id];
                    sprite = object.sprite;
                }

                object.parent = ref.parent;
                object.type = this._animation.getTimelineById(ref.timeline).objectType;

                // is it sprite or any other type of object? (box / point)
                if (object.type === eObjectType.SPRITE) {
                    object.setOn(true);

                    if (object.sprite.z !== ref.z) {
                        object.sprite.z = ref.z;
                        zChange = true;
                    }
                }
                //// TODO remove - debug
                //else {
                //    object.setOn(true);

                //    if (object.type === eObjectType.POINT) {
                //        object.setOn(true);
                //        object.sprite.frameName = "DebugPoint";
                //        object.sprite.anchor.set(0.5, 0.5);
                //    } else if (object.type === eObjectType.BOX) {
                //        object.setOn(true);
                //        object.sprite.frameName = "DebugBox";
                //    }
                //}


                if (object.timelineKey !== ref.key || object.timeline !== ref.timeline || aForce) {
                    object.setKey(this._entity, this._animation, ref.timeline, ref.key);
                }
            }

            // need to sort sprites?
            if (zChange) {
                this.sort();
            }
        }

        // -------------------------------------------------------------------------
        private loadKeys(keyMainline: KeyMainline, force: boolean = false): void {
            this.setBones(keyMainline.boneRefs, force);
            this.setObjects(keyMainline.objectRefs, force);
        }

        // -------------------------------------------------------------------------
        public updateAnimation() {
            if (this._paused || this._finished) {
                return;
            }

            var mainline = this._animation.mainline;

            // check if in the end of animation and whether to loop or not
            if (this._time > this._animation.length) {
                if (this._animation.loopType === eAnimationLooping.NO_LOOPING) {
                    this._time = this._animation.length;
                    this._finished = true;
                } else {
                    this._time -= this._animation.length;
                    this.onLoop.dispatch(this);
                }
            }


            // consume all new keys
            var key: KeyMainline;
            while ((key = <KeyMainline>mainline.step(this._time)) !== null) {
                //console.log("got key at: " + key.time + " time: " + this._time);
                this.loadKeys(key);
                mainline.lastTime = key.time;
            }


            this.updateCharacter();
            this.updateLines();

            if (this._finished) {
                this.onFinish.dispatch(this);
            }

            this._time += (this.game.time.physicsElapsedMS * this._animationSpeed);
        }

        // -------------------------------------------------------------------------
        private updateCharacter(): void {
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

                    //// TODO remove - debug
                    //if (object.type === eObjectType.BOX) {
                    //    var frame = this.game.cache.getFrameByName(this._textureKey, "DebugBox");
                    //    var timeline = this._animation.getTimelineById(object.timeline);
                    //    var objDef = this._spriter.getEntityByName(this._entityName).getObjectInfoById(timeline.objectRef);
                    //    var transformed = object.transformed;
                    //    var objWidth = objDef.width * transformed.scaleX;
                    //    var objHeight = objDef.height * transformed.scaleY;
                    //    object.sprite.scale.set(objWidth / frame.width, objHeight / frame.height);
                    //}
                }
            }
        }

        // -------------------------------------------------------------------------
        public updateLines(): void {
            for (var i = this._animation.linesLength - 1; i >= 0; i--) {
                var line = this._animation.getLineById(i);
                var key: Key;

                while ((key = line.step(this._time)) !== null) {
                    switch (line.type) {
                        case eTimelineType.SOUND_LINE:
                            //console.log("sound: " + line.name + " - key: " + key.id + ", time: " + key.time);
                            this.onSound.dispatch(this, line.name);
                            break;

                        case eTimelineType.EVENT_LINE:
                            //console.log("event: " + line.name + " - key: " + key.id + ", time: " + key.time);
                            this.onEvent.dispatch(this, line.name);
                            break;

                        case eTimelineType.TAG_LINE:
                            var tagsOn = (<KeyTag>key).tagsOn;
                            var tagChanges = this._tags ^ tagsOn;
                            this._tags = tagsOn;
                            // go through all changes
                            for (var j = 0; j < this._spriter.tagsLength; j++) {
                                var mask = 1 << j;
                                if (tagChanges & mask) {
                                    //console.log("tag change: " + this._spriter.getTagById(j).name + " value: " + ((tagsOn & mask) > 0) + " - key: " + key.id + ", time: " + key.time);
                                    this.onTagChange.dispatch(this, this._spriter.getTagById(j).name, (tagsOn & mask) > 0);
                                }
                            }
                            break;

                        case eTimelineType.VAR_LINE:
                            var newVal = (<KeyVariable>key).value;
                            var variable = this._vars[(<Varline>line).varDefId];
                            variable.value = newVal;
                            //console.log("var set: " + variable.name + " value: " + variable.value + " - key: " + key.id + ", time: " + key.time);
                            this.onVariableSet.dispatch(this, variable);
                            break;
                    }

                    line.lastTime = key.time;
                }
            }
        }
    }
}
