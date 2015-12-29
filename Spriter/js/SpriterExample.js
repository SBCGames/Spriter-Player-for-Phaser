var SpriterExample;
(function (SpriterExample) {
    var Global = (function () {
        function Global() {
        }
        Global.game = null;
        Global.GAME_WIDTH = 640;
        Global.GAME_HEIGHT = 400;
        Global.assetsPath = "assets/";
        return Global;
    })();
    SpriterExample.Global = Global;
})(SpriterExample || (SpriterExample = {}));
var PhaserGlobal = {
    stopFocus: true
};
window.onload = function () {
    SpriterExample.Global.game = new SpriterExample.Game();
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SpriterExample;
(function (SpriterExample) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            Game.game = this;
            _super.call(this, SpriterExample.Global.GAME_WIDTH, SpriterExample.Global.GAME_HEIGHT, Phaser.AUTO, "content", null);
            this.state.add("Boot", SpriterExample.Boot);
            this.state.add("Preloader", SpriterExample.Preloader);
            this.state.add("Test", SpriterExample.Test);
            this.state.start("Boot");
        }
        return Game;
    })(Phaser.Game);
    SpriterExample.Game = Game;
})(SpriterExample || (SpriterExample = {}));
var Helper;
(function (Helper) {
    var IdNameMap = (function () {
        function IdNameMap() {
            this._items = [];
            this._itemNames = [];
        }
        IdNameMap.prototype.add = function (aItem, aId, aName) {
            if (aId === undefined) {
                aId = this._items.length;
            }
            if (aName === undefined || aName === null) {
                aName = "item_" + aId;
            }
            this._items[aId] = aItem;
            this._itemNames[aName] = aId;
        };
        IdNameMap.prototype.getById = function (aId) {
            return this._items[aId];
        };
        IdNameMap.prototype.getByName = function (aName) {
            var id = this._itemNames[aName];
            if (typeof id !== "number") {
                console.warn("item " + aName + "  not found!");
            }
            return (typeof id === "number") ? this._items[id] : null;
        };
        Object.defineProperty(IdNameMap.prototype, "length", {
            get: function () {
                return this._items.length;
            },
            enumerable: true,
            configurable: true
        });
        return IdNameMap;
    })();
    Helper.IdNameMap = IdNameMap;
})(Helper || (Helper = {}));
var Spriter;
(function (Spriter_1) {
    var Spriter = (function () {
        function Spriter() {
            this._folders = new Helper.IdNameMap();
            this._entities = new Helper.IdNameMap();
        }
        Spriter.prototype.addFolder = function (aFolder) {
            this._folders.add(aFolder, aFolder.id, aFolder.name);
        };
        Spriter.prototype.getFolderById = function (aId) {
            return this._folders.getById(aId);
        };
        Spriter.prototype.getFolderByName = function (aName) {
            return this._folders.getByName(aName);
        };
        Spriter.prototype.addEntity = function (aEntitiy) {
            this._entities.add(aEntitiy, aEntitiy.id, aEntitiy.name);
        };
        Spriter.prototype.getEntityById = function (aId) {
            return this._entities.getById(aId);
        };
        Spriter.prototype.getEntityByName = function (aName) {
            return this._entities.getByName(aName);
        };
        return Spriter;
    })();
    Spriter_1.Spriter = Spriter;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpriterBone = (function () {
        function SpriterBone() {
            this.timelineKey = -1;
            this.transformed = new Spriter.SpatialInfo();
        }
        SpriterBone.prototype.setOn = function (aOn) {
            this._on = aOn;
        };
        Object.defineProperty(SpriterBone.prototype, "on", {
            get: function () {
                return this._on;
            },
            enumerable: true,
            configurable: true
        });
        SpriterBone.prototype.setKey = function (aAnimation, aTimelineId, aKeyId) {
            this.timelineKey = aKeyId;
            var keys = aAnimation.getTimelineById(aTimelineId).keys;
            var keyFrom = keys[aKeyId];
            var endIndex = (aKeyId + 1) % keys.length;
            if (endIndex === 0 && aAnimation.loopType === Spriter.eAnimationLooping.NO_LOOPING) {
                endIndex = aKeyId;
            }
            var keyTo = keys[endIndex];
            this.key = keyFrom;
            this.timeFrom = keyFrom.time;
            this.timeTo = keyTo.time;
            if (this.timeTo < this.timeFrom) {
                this.timeTo = aAnimation.length;
            }
            this.from = keyFrom.info;
            this.to = keyTo.info;
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
            this.transformed.x = this.from.x;
            this.transformed.y = this.from.y;
            this.transformed.scaleX = this.from.scaleX;
            this.transformed.scaleY = this.from.scaleY;
            this.transformed.pivotX = this.from.pivotX;
            this.transformed.pivotY = this.from.pivotY;
            this.transformed.angle = this.from.angle;
            this.transformed.alpha = this.from.alpha;
        };
        SpriterBone.prototype.tween = function (aTime) {
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
        };
        SpriterBone.prototype.update = function (aParent) {
            this.transformed.angle *= Phaser.Math.sign(aParent.scaleX) * Phaser.Math.sign(aParent.scaleY);
            this.transformed.angle += aParent.angle;
            this.transformed.scaleX *= aParent.scaleX;
            this.transformed.scaleY *= aParent.scaleY;
            this.scalePosition(aParent.scaleX, aParent.scaleY);
            this.rotatePosition(aParent.angle);
            this.translatePosition(aParent.x, aParent.y);
            this.transformed.alpha *= aParent.alpha;
        };
        SpriterBone.prototype.scalePosition = function (aParentScaleX, aParentScaleY) {
            this.transformed.x *= aParentScaleX;
            this.transformed.y *= aParentScaleY;
        };
        SpriterBone.prototype.rotatePosition = function (aParentAngle) {
            var x = this.transformed.x;
            var y = this.transformed.y;
            if (x !== 0 || y !== 0) {
                var rads = aParentAngle * (Math.PI / 180);
                var cos = Math.cos(rads);
                var sin = Math.sin(rads);
                this.transformed.x = x * cos - y * sin;
                this.transformed.y = x * sin + y * cos;
            }
        };
        SpriterBone.prototype.translatePosition = function (aParentX, aParentY) {
            this.transformed.x += aParentX;
            this.transformed.y += aParentY;
        };
        SpriterBone.prototype.getTweenTime = function (aTime) {
            if (this.key.curveType === Spriter.eCurveType.INSTANT) {
                return 0;
            }
            var t = Phaser.Math.clamp((aTime - this.timeFrom) / (this.timeTo - this.timeFrom), 0, 1);
            switch (this.key.curveType) {
                case Spriter.eCurveType.LINEAR:
                    return t;
                case Spriter.eCurveType.QUADRATIC:
                    return this.quadratic(0, this.key.c1, 1, t);
                case Spriter.eCurveType.CUBIC:
                    return this.cubic(0, this.key.c1, this.key.c2, 1, t);
            }
            return 0;
        };
        SpriterBone.prototype.linear = function (aA, aB, aT) {
            return ((aB - aA) * aT) + aA;
        };
        SpriterBone.prototype.quadratic = function (aA, aB, aC, aT) {
            return this.linear(this.linear(aA, aB, aT), this.linear(aB, aC, aT), aT);
        };
        SpriterBone.prototype.cubic = function (aA, aB, aC, aD, aT) {
            return this.linear(this.quadratic(aA, aB, aC, aT), this.quadratic(aB, aC, aD, aT), aT);
        };
        SpriterBone.prototype.angleLinear = function (aAngleA, aAngleB, aSpin, aT) {
            if (aSpin === 0) {
                return aAngleA;
            }
            if (aSpin > 0) {
                if (aAngleB > aAngleA) {
                    aAngleB -= 360;
                }
            }
            else {
                if (aAngleB < aAngleA) {
                    aAngleB += 360;
                }
            }
            return this.linear(aAngleA, aAngleB, aT);
        };
        SpriterBone.UPDATE_X = 1;
        SpriterBone.UPDATE_Y = 2;
        SpriterBone.UPDATE_SCALE_X = 4;
        SpriterBone.UPDATE_SCALE_Y = 8;
        SpriterBone.UPDATE_PIVOT_X = 16;
        SpriterBone.UPDATE_PIVOT_Y = 32;
        SpriterBone.UPDATE_ANGLE = 64;
        SpriterBone.UPDATE_ALPHA = 128;
        return SpriterBone;
    })();
    Spriter.SpriterBone = SpriterBone;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpriterGroup = (function (_super) {
        __extends(SpriterGroup, _super);
        function SpriterGroup(aGame, aSpriter, aTextureKey, aEntityName, aAnimation, aAnimationSpeedPercent) {
            _super.call(this, aGame, null);
            this._bones = [];
            this._objects = [];
            this._pause = false;
            this._listener = null;
            this._spriter = aSpriter;
            this._entityName = aEntityName;
            this._textureKey = aTextureKey;
            this._root = new Spriter.SpatialInfo();
            if (aAnimationSpeedPercent === undefined) {
                aAnimationSpeedPercent = 100;
            }
            this.setAnimationSpeedPercent(aAnimationSpeedPercent);
            if (aAnimation === undefined || aAnimation === null) {
                this.setAnimationById(0);
            }
            else if (typeof aAnimation === "number") {
                this.setAnimationById(aAnimation);
            }
            else {
                this.setAnimationByName(aAnimation);
            }
        }
        Object.defineProperty(SpriterGroup.prototype, "listener", {
            set: function (aListener) {
                this._listener = aListener;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriterGroup.prototype, "animationCount", {
            get: function () {
                return this._spriter.getEntityByName(this._entityName).animationsCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriterGroup.prototype, "currentAnimationName", {
            get: function () {
                return this._currentAnimationName;
            },
            enumerable: true,
            configurable: true
        });
        SpriterGroup.prototype.setAnimationSpeedPercent = function (aAnimationSpeedPercent) {
            if (aAnimationSpeedPercent === void 0) { aAnimationSpeedPercent = 100; }
            this._animationSpeed = aAnimationSpeedPercent / 100;
        };
        SpriterGroup.prototype.setAnimationById = function (aAnimationId) {
            var animation = this._spriter.getEntityByName(this._entityName).getAnimationById(aAnimationId);
            if (animation === undefined || animation === null) {
                console.warn("Animation " + aAnimationId + " for entity " + this._entityName + " does not exist!");
                return;
            }
            this.setAnimation(animation);
        };
        SpriterGroup.prototype.setAnimationByName = function (aAnimationName) {
            var animation = this._spriter.getEntityByName(this._entityName).getAnimationByName(aAnimationName);
            if (animation === undefined || animation === null) {
                console.warn("Animation " + aAnimationName + " for entity " + this._entityName + " does not exist!");
                return;
            }
            this.setAnimation(animation);
        };
        SpriterGroup.prototype.setAnimation = function (aAnimation) {
            this._currentAnimationName = aAnimation.name;
            this._animation = aAnimation;
            this._finished = false;
            this.clearTime();
            this.loadKeys(0, true);
            this.updateCharacter();
        };
        SpriterGroup.prototype.clearTime = function () {
            this._time = 0;
            this._keyIndex = -1;
        };
        SpriterGroup.prototype.getNextMainLineKeyTime = function (aTime) {
            var keys = this._animation.mainLineKeys;
            var newIndex = (this._keyIndex + 1) % keys.length;
            this._nextTime = newIndex !== 0 ? keys[newIndex].time : this._animation.length;
            if (newIndex !== 0 && this._nextTime < aTime) {
                console.log("Game is lagging or keys are too close to each other...");
            }
        };
        SpriterGroup.prototype.setBones = function (aBones, aForce) {
            if (aForce === void 0) { aForce = false; }
            for (var i = 0; i < this._bones.length; i++) {
                if (this._bones[i] !== undefined) {
                    this._bones[i].setOn(false);
                }
            }
            for (var i = 0; i < aBones.length; i++) {
                var ref = aBones[i];
                if (this._bones[ref.id] === undefined) {
                    this._bones[ref.id] = new Spriter.SpriterBone();
                }
                var bone = this._bones[ref.id];
                bone.setOn(true);
                bone.parent = ref.parent;
                if (bone.timelineKey != ref.key || aForce) {
                    bone.setKey(this._animation, ref.timeline, ref.key);
                }
            }
        };
        SpriterGroup.prototype.setObjects = function (aObjects, aForce) {
            if (aForce === void 0) { aForce = false; }
            for (var i = 0; i < this._objects.length; i++) {
                if (this._objects[i] !== undefined) {
                    this._objects[i].setOn(false);
                }
            }
            var zChange = false;
            for (var i = 0; i < aObjects.length; i++) {
                var ref = aObjects[i];
                var object = null;
                var sprite = null;
                if (this._objects[ref.id] === undefined) {
                    sprite = new Phaser.Sprite(this.game, 0, 0, this._textureKey);
                    object = new Spriter.SpriterObject(this._spriter, sprite);
                    this._objects[ref.id] = object;
                    this.add(sprite);
                }
                else {
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
            if (zChange) {
                this.sort();
            }
        };
        SpriterGroup.prototype.loadKeys = function (aMainLineKeyIndex, aForce) {
            if (aForce === void 0) { aForce = false; }
            this.setBones(this._animation.mainLineKeys[aMainLineKeyIndex].boneRefs, aForce);
            this.setObjects(this._animation.mainLineKeys[aMainLineKeyIndex].objectRefs, aForce);
        };
        SpriterGroup.prototype.updateAnimation = function () {
            if (this._pause || this._finished) {
                return;
            }
            if (this._keyIndex === -1 || this._time > this._nextTime) {
                this._keyIndex = (this._keyIndex + 1) % this._animation.mainLineKeys.length;
                if (this._time > this._animation.length) {
                    if (this._animation.loopType === Spriter.eAnimationLooping.NO_LOOPING) {
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
        };
        SpriterGroup.prototype.updateCharacter = function () {
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
        };
        SpriterGroup.prototype.onLoop = function () {
        };
        SpriterGroup.prototype.onFinished = function () {
            if (this._listener !== null) {
                this._listener.onAnimationFinished(this);
            }
        };
        return SpriterGroup;
    })(Phaser.Group);
    Spriter.SpriterGroup = SpriterGroup;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpriterObject = (function (_super) {
        __extends(SpriterObject, _super);
        function SpriterObject(aSpriter, aSprite) {
            _super.call(this);
            this._spriter = aSpriter;
            this._sprite = aSprite;
        }
        Object.defineProperty(SpriterObject.prototype, "sprite", {
            get: function () {
                return this._sprite;
            },
            enumerable: true,
            configurable: true
        });
        SpriterObject.prototype.setOn = function (aOn) {
            _super.prototype.setOn.call(this, aOn);
            this._sprite.exists = aOn;
            this._sprite.visible = aOn;
        };
        SpriterObject.prototype.setKey = function (aAnimation, aTimelineId, aKeyId) {
            _super.prototype.setKey.call(this, aAnimation, aTimelineId, aKeyId);
            var spriteKey = this.key;
            var file = this._spriter.getFolderById(spriteKey.folder).getFileById(spriteKey.file);
            this._sprite.frameName = file.name;
        };
        SpriterObject.prototype.update = function (aParent) {
            _super.prototype.update.call(this, aParent);
            this.updateSprite();
        };
        SpriterObject.prototype.updateSprite = function () {
            var t = this.transformed;
            var s = this.sprite;
            s.position.setTo(t.x, t.y);
            s.scale.setTo(t.scaleX, t.scaleY);
            s.anchor.setTo(t.pivotX, t.pivotY);
            s.alpha = t.alpha;
            s.angle = t.angle;
        };
        return SpriterObject;
    })(Spriter.SpriterBone);
    Spriter.SpriterObject = SpriterObject;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Loader = (function () {
        function Loader() {
        }
        Loader.prototype.load = function (aFile) {
            this._spriter = new Spriter.Spriter();
            var folders = aFile.getNodes("folder");
            this.loadFolders(this._spriter, folders);
            folders.processed();
            var entities = aFile.getNodes("entity");
            this.loadEntities(this._spriter, entities);
            entities.processed();
            return this._spriter;
        };
        Loader.prototype.loadFolders = function (aSpriter, aFolders) {
            for (var i = 0; i < aFolders.length(); i++) {
                var folder = aFolders.getFolder(i);
                var files = aFolders.getChildNodes(i, "file");
                this.loadFiles(folder, files);
                files.processed();
                aSpriter.addFolder(folder);
            }
        };
        Loader.prototype.loadFiles = function (aFolder, aFiles) {
            for (var f = 0; f < aFiles.length(); f++) {
                var file = aFiles.getFile(f);
                aFolder.addFile(file);
            }
        };
        Loader.prototype.loadEntities = function (aSpriter, aEntities) {
            for (var i = 0; i < aEntities.length(); i++) {
                var entity = aEntities.getEntity(i);
                var bones = aEntities.getChildNodes(i, "obj_info");
                this.loadBones(entity, bones);
                bones.processed();
                var animations = aEntities.getChildNodes(i, "animation");
                this.loadAnimations(entity, animations);
                animations.processed();
                aSpriter.addEntity(entity);
            }
        };
        Loader.prototype.loadBones = function (aEntity, aBones) {
            for (var i = 0; i < aBones.length(); i++) {
                var bone = aBones.getObjectInfo(i);
                aEntity.addObjectInfo(bone);
            }
        };
        Loader.prototype.loadAnimations = function (aEntity, aAnimations) {
            for (var i = 0; i < aAnimations.length(); i++) {
                var animation = aAnimations.getAnimation(i);
                var mainline = aAnimations.getChildNodes(i, "mainline");
                var mainlineKeys = mainline.getChildNodes(0, "key");
                this.loadMainlineKeys(animation, mainlineKeys);
                mainlineKeys.processed();
                mainline.processed();
                var timelines = aAnimations.getChildNodes(i, "timeline");
                this.loadTimelines(animation, timelines);
                timelines.processed();
                aEntity.addAnimation(animation);
            }
        };
        Loader.prototype.loadMainlineKeys = function (aAnimation, aMainLineKeys) {
            for (var i = 0; i < aMainLineKeys.length(); i++) {
                var mainLineKey = aMainLineKeys.getMainLineKey(i);
                var boneRefs = aMainLineKeys.getChildNodes(i, "bone_ref");
                for (var b = 0; b < boneRefs.length(); b++) {
                    mainLineKey.addBoneRef(boneRefs.getRef(b));
                }
                boneRefs.processed();
                var spriteRefs = aMainLineKeys.getChildNodes(i, "object_ref");
                for (var s = 0; s < spriteRefs.length(); s++) {
                    mainLineKey.addObjectRef(spriteRefs.getRef(s));
                }
                spriteRefs.processed();
                aAnimation.addMainLineKey(mainLineKey);
            }
        };
        Loader.prototype.loadTimelines = function (aAnimation, aTimelines) {
            for (var i = 0; i < aTimelines.length(); i++) {
                var timeline = aTimelines.getTimeline(i);
                var keys = aTimelines.getChildNodes(i, "key");
                this.loadTimelineKeys(timeline, keys);
                keys.processed();
                aAnimation.addTimeline(timeline);
            }
        };
        Loader.prototype.loadTimelineKeys = function (aTimeline, aKeys) {
            for (var i = 0; i < aKeys.length(); i++) {
                var key = aKeys.getTimelineKey(i, this._spriter);
                aTimeline.addKey(key);
            }
        };
        return Loader;
    })();
    Spriter.Loader = Loader;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var NodeListBin = (function () {
        function NodeListBin(aSpriterBin, aNodeList) {
            this._file = aSpriterBin;
            this._nodeList = aNodeList;
        }
        NodeListBin.prototype.length = function () {
            return this._nodeList.length;
        };
        NodeListBin.prototype.processed = function () {
            this._file.processed();
        };
        NodeListBin.prototype.getChildNodes = function (aIndex, aElementName) {
            return this._file.getNodesForElement(this._nodeList[aIndex], aElementName);
        };
        NodeListBin.prototype.getFolder = function (aIndex) {
            return this._file.getFolder(this._nodeList[aIndex]);
        };
        NodeListBin.prototype.getFile = function (aIndex) {
            return this._file.getFile(this._nodeList[aIndex]);
        };
        NodeListBin.prototype.getEntity = function (aIndex) {
            return this._file.getEntity(this._nodeList[aIndex]);
        };
        NodeListBin.prototype.getObjectInfo = function (aIndex) {
            return this._file.getObjectInfo(this._nodeList[aIndex], aIndex);
        };
        NodeListBin.prototype.getAnimation = function (aIndex) {
            return this._file.getAnimation(this._nodeList[aIndex]);
        };
        NodeListBin.prototype.getMainLineKey = function (aIndex) {
            return this._file.getMainLineKey(this._nodeList[aIndex]);
        };
        NodeListBin.prototype.getRef = function (aIndex) {
            return this._file.getRef(this._nodeList[aIndex]);
        };
        NodeListBin.prototype.getTimeline = function (aIndex) {
            return this._file.getTimeline(this._nodeList[aIndex]);
        };
        NodeListBin.prototype.getTimelineKey = function (aIndex, aSpriter) {
            return this._file.getTimelineKey(this._nodeList[aIndex], aIndex, aSpriter);
        };
        return NodeListBin;
    })();
    Spriter.NodeListBin = NodeListBin;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var NodeListJSON = (function () {
        function NodeListJSON(aSpriterJSON, aNodeList) {
            this._file = aSpriterJSON;
            this._nodeList = aNodeList;
        }
        NodeListJSON.prototype.length = function () {
            return this._nodeList.length;
        };
        NodeListJSON.prototype.processed = function () {
            this._file.processed();
        };
        NodeListJSON.prototype.getNode = function (aIndex) {
            if (Array.isArray(this._nodeList)) {
                return this._nodeList[aIndex];
            }
            else {
                return this._nodeList;
            }
        };
        NodeListJSON.prototype.getChildNodes = function (aIndex, aElementName) {
            return this._file.getNodesForElement(this.getNode(aIndex), aElementName);
        };
        NodeListJSON.prototype.getFolder = function (aIndex) {
            return this._file.getFolder(this.getNode(aIndex));
        };
        NodeListJSON.prototype.getFile = function (aIndex) {
            return this._file.getFile(this.getNode(aIndex));
        };
        NodeListJSON.prototype.getEntity = function (aIndex) {
            return this._file.getEntity(this.getNode(aIndex));
        };
        NodeListJSON.prototype.getObjectInfo = function (aIndex) {
            return this._file.getObjectInfo(this.getNode(aIndex), aIndex);
        };
        NodeListJSON.prototype.getAnimation = function (aIndex) {
            return this._file.getAnimation(this.getNode(aIndex));
        };
        NodeListJSON.prototype.getMainLineKey = function (aIndex) {
            return this._file.getMainLineKey(this.getNode(aIndex));
        };
        NodeListJSON.prototype.getRef = function (aIndex) {
            return this._file.getRef(this.getNode(aIndex));
        };
        NodeListJSON.prototype.getTimeline = function (aIndex) {
            return this._file.getTimeline(this.getNode(aIndex));
        };
        NodeListJSON.prototype.getTimelineKey = function (aIndex, aSpriter) {
            return this._file.getTimelineKey(this.getNode(aIndex), aIndex, aSpriter);
        };
        return NodeListJSON;
    })();
    Spriter.NodeListJSON = NodeListJSON;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var NodeListXml = (function () {
        function NodeListXml(aSpriterXml, aNodeList) {
            this._file = aSpriterXml;
            this._nodeList = aNodeList;
        }
        NodeListXml.prototype.length = function () {
            return this._nodeList.length;
        };
        NodeListXml.prototype.processed = function () {
            this._file.processed();
        };
        NodeListXml.prototype.getChildNodes = function (aIndex, aElementName) {
            return this._file.getNodesForElement(this._nodeList.item(aIndex), aElementName);
        };
        NodeListXml.prototype.getFolder = function (aIndex) {
            return this._file.getFolder(this._nodeList.item(aIndex));
        };
        NodeListXml.prototype.getFile = function (aIndex) {
            return this._file.getFile(this._nodeList.item(aIndex));
        };
        NodeListXml.prototype.getEntity = function (aIndex) {
            return this._file.getEntity(this._nodeList.item(aIndex));
        };
        NodeListXml.prototype.getObjectInfo = function (aIndex) {
            return this._file.getObjectInfo(this._nodeList.item(aIndex), aIndex);
        };
        NodeListXml.prototype.getAnimation = function (aIndex) {
            return this._file.getAnimation(this._nodeList.item(aIndex));
        };
        NodeListXml.prototype.getMainLineKey = function (aIndex) {
            return this._file.getMainLineKey(this._nodeList.item(aIndex));
        };
        NodeListXml.prototype.getRef = function (aIndex) {
            return this._file.getRef(this._nodeList.item(aIndex));
        };
        NodeListXml.prototype.getTimeline = function (aIndex) {
            return this._file.getTimeline(this._nodeList.item(aIndex));
        };
        NodeListXml.prototype.getTimelineKey = function (aIndex, aSpriter) {
            return this._file.getTimelineKey(this._nodeList.item(aIndex), aIndex, aSpriter);
        };
        return NodeListXml;
    })();
    Spriter.NodeListXml = NodeListXml;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpriterFile = (function () {
        function SpriterFile() {
        }
        SpriterFile.prototype.processed = function () {
            this.popMinDefsStack();
        };
        SpriterFile.prototype.setMinimized = function (aMinimized, aMinDefs) {
            if (aMinDefs === void 0) { aMinDefs = null; }
            this._minimized = aMinimized;
            this._minDefs = aMinDefs;
            if (aMinimized) {
                this._minDefsStack = [];
                if (aMinDefs === null) {
                    console.error("Spriter file is minimized - you must provide object with name definitions");
                    return;
                }
            }
        };
        SpriterFile.prototype.getFileNameWithoutExtension = function (aPath) {
            var name = (aPath.split('\\').pop().split('/').pop().split('.'))[0];
            return name;
        };
        SpriterFile.prototype.translateElementName = function (aElementName) {
            if (this._minimized) {
                if (this._minDefs["name"] !== aElementName) {
                    console.warn("current definition is " + this._minDefs["name"]);
                    return aElementName;
                }
                if (this._minDefs["minName"] !== null) {
                    aElementName = this._minDefs["minName"];
                }
            }
            return aElementName;
        };
        SpriterFile.prototype.translateChildElementName = function (aElementName) {
            if (this._minimized && this._minDefs !== null) {
                var elements = this._minDefs["childElements"];
                if (elements !== null) {
                    aElementName = elements[aElementName] === null ? aElementName : elements[aElementName]["minName"];
                }
            }
            return aElementName;
        };
        SpriterFile.prototype.translateAttributeName = function (aAttributeName) {
            if (this._minimized && this._minDefs !== null) {
                var attributes = this._minDefs["attributes"];
                if (attributes !== null) {
                    aAttributeName = attributes[aAttributeName] === null ? aAttributeName : attributes[aAttributeName];
                }
            }
            return aAttributeName;
        };
        SpriterFile.prototype.setMinDefsToElementName = function (aTagName) {
            if (this._minimized) {
                this._minDefsStack.push(this._minDefs);
                var minDef = this._minDefs["childElements"][aTagName];
                this._minDefs = minDef;
            }
        };
        SpriterFile.prototype.popMinDefsStack = function () {
            if (this._minimized) {
                this._minDefs = this._minDefsStack.pop();
            }
        };
        return SpriterFile;
    })();
    Spriter.SpriterFile = SpriterFile;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpriterBin = (function (_super) {
        __extends(SpriterBin, _super);
        function SpriterBin(aBinData) {
            _super.call(this);
            this._elements = {
                "spriter_data": 1,
                "folder": 2,
                "file": 3,
                "entity": 4,
                "obj_info": 5,
                "frames": 6,
                "i": 7,
                "animation": 8,
                "mainline": 9,
                "key": 10,
                "bone_ref": 11,
                "object_ref": 12,
                "timeline": 13,
                "bone": 14,
                "object": 15
            };
            this._smallOffset = false;
            this._bin = new DataView(aBinData);
            this._smallOffset = this._bin.getUint8(0) === 1;
        }
        SpriterBin.prototype.readUint8 = function () {
            return this._bin.getUint8(this._tmpPosition++);
        };
        SpriterBin.prototype.readInt8 = function () {
            return this._bin.getInt8(this._tmpPosition++);
        };
        SpriterBin.prototype.readUint16 = function () {
            var value = this._bin.getUint16(this._tmpPosition, true);
            this._tmpPosition += 2;
            return value;
        };
        SpriterBin.prototype.readInt16 = function () {
            var value = this._bin.getInt16(this._tmpPosition, true);
            this._tmpPosition += 2;
            return value;
        };
        SpriterBin.prototype.readUint32 = function () {
            var value = this._bin.getUint32(this._tmpPosition, true);
            this._tmpPosition += 4;
            return value;
        };
        SpriterBin.prototype.readInt32 = function () {
            var value = this._bin.getInt32(this._tmpPosition, true);
            this._tmpPosition += 4;
            return value;
        };
        SpriterBin.prototype.readFixed16_16 = function () {
            var value = this._bin.getInt32(this._tmpPosition, true);
            this._tmpPosition += 4;
            return value / 65536;
        };
        SpriterBin.prototype.readFixed1_7 = function () {
            var value = this._bin.getInt32(this._tmpPosition++) & 0xFF;
            return value / 128;
        };
        SpriterBin.prototype.readString = function () {
            var chars = [];
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                chars.push(this._bin.getUint8(this._tmpPosition++));
            }
            return String.fromCharCode.apply(null, chars);
        };
        SpriterBin.prototype.getNodes = function (aNodeName) {
            return new Spriter.NodeListBin(this, this.getSubNodesOfElementType(1, this._elements[aNodeName]));
        };
        SpriterBin.prototype.getNodesForElement = function (aElementPosition, aNodeName) {
            return new Spriter.NodeListBin(this, this.getSubNodesOfElementType(aElementPosition, this._elements[aNodeName]));
        };
        SpriterBin.prototype.getSubNodesOfElementType = function (aPosition, aElementType) {
            var result = [];
            var subelementsCount = this._bin.getUint8(aPosition + 1);
            aPosition += 2;
            for (var i = 0; i < subelementsCount; i++) {
                var subelementOffset = this._smallOffset ? this._bin.getUint16(aPosition + i * 2, true) : this._bin.getUint32(aPosition + i * 4, true);
                var subelementType = this._bin.getUint8(aPosition + subelementOffset);
                if (subelementType === aElementType) {
                    result.push(aPosition + subelementOffset);
                }
            }
            return result;
        };
        SpriterBin.prototype.getAttribsPosition = function (aPosition) {
            var subelementsCount = this._bin.getUint8(aPosition + 1);
            return aPosition + 2 + subelementsCount * (this._smallOffset ? 2 : 4);
        };
        SpriterBin.prototype.getFolder = function (aPosition) {
            this._tmpPosition = this.getAttribsPosition(aPosition);
            var id = 0;
            var name = "";
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_FOLDER_ID:
                        id = this.readUint8();
                        break;
                    case SpriterBin.ATTR_FOLDER_NAME:
                        name = this.readString();
                        break;
                }
            }
            return new Spriter.Folder(id, name);
        };
        SpriterBin.prototype.getFile = function (aPosition) {
            this._tmpPosition = this.getAttribsPosition(aPosition);
            var id = 0;
            var name = "";
            var pivotX = 0;
            var pivotY = 0;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_FILE_ID:
                        id = this.readUint8();
                        break;
                    case SpriterBin.ATTR_FILE_NAME:
                        name = this.readString();
                        break;
                    case SpriterBin.ATTR_FILE_PIVOT_X:
                        pivotX = this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_FILE_PIVOT_Y:
                        pivotY = this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_FILE_WIDTH:
                    case SpriterBin.ATTR_FILE_HEIGHT:
                        this._tmpPosition += 2;
                        break;
                }
            }
            return new Spriter.File(id, this.getFileNameWithoutExtension(name), pivotX, 1 - pivotY);
        };
        SpriterBin.prototype.getEntity = function (aPosition) {
            this._tmpPosition = this.getAttribsPosition(aPosition);
            var id = 0;
            var name = "";
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_ENTITY_ID:
                        id = this.readUint8();
                        break;
                    case SpriterBin.ATTR_ENTITY_NAME:
                        name = this.readString();
                        break;
                }
            }
            return new Spriter.Entity(id, name);
        };
        SpriterBin.prototype.getObjectInfo = function (aPosition, aIndex) {
            this._tmpPosition = this.getAttribsPosition(aPosition);
            var name = "";
            var type = Spriter.eObjectType.SPRITE;
            var width = 0;
            var height = 0;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_OBJ_INFO_NAME:
                        name = this.readString();
                        break;
                    case SpriterBin.ATTR_OBJ_INFO_TYPE:
                        if (this.readUint8() === 1) {
                            type = Spriter.eObjectType.BONE;
                        }
                        break;
                    case SpriterBin.ATTR_OBJ_INFO_WIDTH:
                        width = this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_OBJ_INFO_HEIGHT:
                        height = this.readFixed16_16();
                        break;
                }
            }
            return new Spriter.ObjectInfo(aIndex, name, type, width, height);
        };
        SpriterBin.prototype.getAnimation = function (aPosition) {
            this._tmpPosition = this.getAttribsPosition(aPosition);
            var id = 0;
            var name = "";
            var length = 0;
            var interval = 0;
            var looping = Spriter.eAnimationLooping.LOOPING;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_ANIMATION_ID:
                        id = this.readUint8();
                        break;
                    case SpriterBin.ATTR_ANIMATION_NAME:
                        name = this.readString();
                        break;
                    case SpriterBin.ATTR_ANIMATION_LENGTH:
                        length = this.readUint32();
                        break;
                    case SpriterBin.ATTR_ANIMATION_INTERVAL:
                        this._tmpPosition += 2;
                        break;
                    case SpriterBin.ATTR_ANIMATION_LOOPING:
                        looping = (this.readUint8() === 1) ? Spriter.eAnimationLooping.LOOPING : Spriter.eAnimationLooping.NO_LOOPING;
                        break;
                }
            }
            return new Spriter.Animation(id, name, length, looping);
        };
        SpriterBin.prototype.getMainLineKey = function (aPosition) {
            this._tmpPosition = this.getAttribsPosition(aPosition);
            var time = 0;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_MAINLINE_KEY_ID:
                        this._tmpPosition++;
                        break;
                    case SpriterBin.ATTR_MAINLINE_KEY_TIME:
                        time = this.readUint32();
                        break;
                }
            }
            return new Spriter.MainLineKey(time);
        };
        SpriterBin.prototype.getRef = function (aPosition) {
            this._tmpPosition = this.getAttribsPosition(aPosition);
            var id = 0;
            var parent = -1;
            var timeline = 0;
            var key = 0;
            var z_index = 0;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_BONE_REF_ID:
                    case SpriterBin.ATTR_OBJ_REF_ID:
                        id = this.readUint8();
                        break;
                    case SpriterBin.ATTR_BONE_REF_PARENT:
                    case SpriterBin.ATTR_OBJ_REF_PARENT:
                        parent = this.readUint8();
                        break;
                    case SpriterBin.ATTR_BONE_REF_TIMELINE:
                    case SpriterBin.ATTR_OBJ_REF_TIMELINE:
                        timeline = this.readUint8();
                        break;
                    case SpriterBin.ATTR_BONE_REF_KEY:
                    case SpriterBin.ATTR_OBJ_REF_KEY:
                        key = this.readUint8();
                        break;
                    case SpriterBin.ATTR_OBJ_REF_Z:
                        z_index = this.readUint8();
                        break;
                    case SpriterBin.ATTR_OBJ_REF_NAME:
                        this.readString();
                        break;
                    case SpriterBin.ATTR_OBJ_REF_FOLDER:
                    case SpriterBin.ATTR_OBJ_REF_FILE:
                        ++this._tmpPosition;
                        break;
                    case SpriterBin.ATTR_OBJ_REF_ABS_X:
                    case SpriterBin.ATTR_OBJ_REF_ABS_Y:
                    case SpriterBin.ATTR_OBJ_REF_ABS_PIVOT_X:
                    case SpriterBin.ATTR_OBJ_REF_ABS_PIVOT_Y:
                    case SpriterBin.ATTR_OBJ_REF_ABS_SCALE_X:
                    case SpriterBin.ATTR_OBJ_REF_ABS_SCALE_Y:
                    case SpriterBin.ATTR_OBJ_REF_ANGLE:
                        this._tmpPosition += 4;
                        break;
                    case SpriterBin.ATTR_OBJ_REF_ALPHA:
                        ++this._tmpPosition;
                        break;
                }
            }
            return new Spriter.Ref(id, parent, timeline, key, z_index);
        };
        SpriterBin.prototype.getTimeline = function (aPosition) {
            this._tmpPosition = this.getAttribsPosition(aPosition);
            var id = 0;
            var name = "";
            var obj = 0;
            var type = Spriter.eObjectType.SPRITE;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_TIMELINE_ID:
                        id = this.readUint8();
                        break;
                    case SpriterBin.ATTR_TIMELINE_NAME:
                        name = this.readString();
                        break;
                    case SpriterBin.ATTR_TIMELINE_OBJ:
                        obj = this.readUint8();
                        break;
                    case SpriterBin.ATTR_TIMELINE_OBJ_TYPE:
                        if (this.readUint8() === 1) {
                            type = Spriter.eObjectType.BONE;
                        }
                        break;
                }
            }
            return new Spriter.Timeline(id, name, type, obj);
        };
        SpriterBin.prototype.getTimelineKey = function (aPosition, aIndex, aSpriter) {
            this._tmpPosition = this.getAttribsPosition(aPosition);
            var time = 0;
            var spin = 1;
            var curve = Spriter.eCurveType.LINEAR;
            var c1 = 0;
            var c2 = 0;
            var c3 = 0;
            var c4 = 0;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_TIMELINE_KEY_ID:
                        ++this._tmpPosition;
                        break;
                    case SpriterBin.ATTR_TIMELINE_KEY_TIME:
                        time = this.readUint32();
                        break;
                    case SpriterBin.ATTR_TIMELINE_KEY_SPIN:
                        spin = this.readInt8();
                        break;
                    case SpriterBin.ATTR_TIMELINE_KEY_CURVE:
                        curve = this.readUint8();
                        break;
                    case SpriterBin.ATTR_TIMELINE_KEY_C1:
                        c1 = this.readFixed1_7();
                        break;
                    case SpriterBin.ATTR_TIMELINE_KEY_C2:
                        c2 = this.readFixed1_7();
                        break;
                }
            }
            aPosition += 2;
            var offset = aPosition + (this._smallOffset ? this._bin.getUint16(aPosition, true) : this._bin.getUint32(aPosition, true));
            var elementType = this._bin.getUint8(offset);
            var key = null;
            var keyDataElm = null;
            var sprite = false;
            if (elementType === 14) {
                key = new Spriter.BoneTimelineKey(aIndex, time, spin);
            }
            else if (elementType === 15) {
                key = new Spriter.ObjectTimelineKey(aIndex, time, spin);
                sprite = true;
            }
            if (curve !== Spriter.eCurveType.LINEAR) {
                key.setCurve(curve, c1, c2, c3, c4);
            }
            this._tmpPosition = this.getAttribsPosition(offset);
            var info = key.info;
            info.x = 0;
            info.y = 0;
            info.scaleX = 1;
            info.scaleY = 1;
            info.angle = 0;
            info.alpha = 1;
            var pivotX = 0;
            var hasPivotX = false;
            var pivotY = 0;
            var hasPivotY = false;
            var folder = 0;
            var file = 0;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_BONE_X:
                    case SpriterBin.ATTR_OBJ_X:
                        info.x = this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_BONE_Y:
                    case SpriterBin.ATTR_OBJ_Y:
                        info.y = -this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_BONE_ANGLE:
                    case SpriterBin.ATTR_OBJ_ANGLE:
                        info.angle = 360 - this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_BONE_SCALE_X:
                    case SpriterBin.ATTR_OBJ_SCALE_X:
                        info.scaleX = this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_BONE_SCALE_Y:
                    case SpriterBin.ATTR_OBJ_SCALE_Y:
                        info.scaleY = this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_OBJ_FOLDER:
                        folder = this.readUint8();
                        break;
                    case SpriterBin.ATTR_OBJ_FILE:
                        file = this.readUint8();
                        break;
                    case SpriterBin.ATTR_OBJ_PIVOT_X:
                        pivotX = this.readFixed16_16();
                        hasPivotX = true;
                        break;
                    case SpriterBin.ATTR_OBJ_PIVOT_Y:
                        pivotY = this.readFixed16_16();
                        hasPivotY = true;
                        break;
                    case SpriterBin.ATTR_OBJ_ALPHA:
                        info.alpha = this.readFixed1_7();
                        break;
                }
            }
            if (sprite) {
                key.setFolderAndFile(folder, file);
                var fileObj = aSpriter.getFolderById(folder).getFileById(file);
                info.pivotX = hasPivotX ? pivotX : fileObj.anchorX;
                info.pivotY = 1 - (hasPivotY ? pivotY : 1 - fileObj.anchorY);
            }
            return key;
        };
        SpriterBin.ATTR_VERSION = 0;
        SpriterBin.ATTR_GENERATOR = 1;
        SpriterBin.ATTR_GENERATOR_VERSION = 2;
        SpriterBin.ATTR_FOLDER_ID = 0;
        SpriterBin.ATTR_FOLDER_NAME = 1;
        SpriterBin.ATTR_FILE_ID = 0;
        SpriterBin.ATTR_FILE_NAME = 1;
        SpriterBin.ATTR_FILE_WIDTH = 2;
        SpriterBin.ATTR_FILE_HEIGHT = 3;
        SpriterBin.ATTR_FILE_PIVOT_X = 4;
        SpriterBin.ATTR_FILE_PIVOT_Y = 5;
        SpriterBin.ATTR_ENTITY_ID = 0;
        SpriterBin.ATTR_ENTITY_NAME = 1;
        SpriterBin.ATTR_OBJ_INFO_NAME = 0;
        SpriterBin.ATTR_OBJ_INFO_TYPE = 1;
        SpriterBin.ATTR_OBJ_INFO_WIDTH = 2;
        SpriterBin.ATTR_OBJ_INFO_HEIGHT = 3;
        SpriterBin.ATTR_FRAMES_I_FOLDER = 0;
        SpriterBin.ATTR_FRAMES_I_FILE = 1;
        SpriterBin.ATTR_ANIMATION_ID = 0;
        SpriterBin.ATTR_ANIMATION_NAME = 1;
        SpriterBin.ATTR_ANIMATION_LENGTH = 2;
        SpriterBin.ATTR_ANIMATION_INTERVAL = 3;
        SpriterBin.ATTR_ANIMATION_LOOPING = 4;
        SpriterBin.ATTR_MAINLINE_KEY_ID = 0;
        SpriterBin.ATTR_MAINLINE_KEY_TIME = 1;
        SpriterBin.ATTR_BONE_REF_ID = 0;
        SpriterBin.ATTR_BONE_REF_PARENT = 1;
        SpriterBin.ATTR_BONE_REF_TIMELINE = 2;
        SpriterBin.ATTR_BONE_REF_KEY = 3;
        SpriterBin.ATTR_OBJ_REF_ID = 4;
        SpriterBin.ATTR_OBJ_REF_PARENT = 5;
        SpriterBin.ATTR_OBJ_REF_TIMELINE = 6;
        SpriterBin.ATTR_OBJ_REF_KEY = 7;
        SpriterBin.ATTR_OBJ_REF_NAME = 8;
        SpriterBin.ATTR_OBJ_REF_Z = 9;
        SpriterBin.ATTR_OBJ_REF_FOLDER = 10;
        SpriterBin.ATTR_OBJ_REF_FILE = 11;
        SpriterBin.ATTR_OBJ_REF_ABS_X = 12;
        SpriterBin.ATTR_OBJ_REF_ABS_Y = 13;
        SpriterBin.ATTR_OBJ_REF_ABS_PIVOT_X = 14;
        SpriterBin.ATTR_OBJ_REF_ABS_PIVOT_Y = 15;
        SpriterBin.ATTR_OBJ_REF_ABS_SCALE_X = 16;
        SpriterBin.ATTR_OBJ_REF_ABS_SCALE_Y = 17;
        SpriterBin.ATTR_OBJ_REF_ANGLE = 18;
        SpriterBin.ATTR_OBJ_REF_ALPHA = 19;
        SpriterBin.ATTR_TIMELINE_ID = 0;
        SpriterBin.ATTR_TIMELINE_NAME = 1;
        SpriterBin.ATTR_TIMELINE_OBJ = 2;
        SpriterBin.ATTR_TIMELINE_OBJ_TYPE = 3;
        SpriterBin.ATTR_TIMELINE_KEY_ID = 0;
        SpriterBin.ATTR_TIMELINE_KEY_TIME = 1;
        SpriterBin.ATTR_TIMELINE_KEY_SPIN = 2;
        SpriterBin.ATTR_TIMELINE_KEY_CURVE = 3;
        SpriterBin.ATTR_TIMELINE_KEY_C1 = 4;
        SpriterBin.ATTR_TIMELINE_KEY_C2 = 5;
        SpriterBin.ATTR_BONE_X = 0;
        SpriterBin.ATTR_BONE_Y = 1;
        SpriterBin.ATTR_BONE_ANGLE = 2;
        SpriterBin.ATTR_BONE_SCALE_X = 3;
        SpriterBin.ATTR_BONE_SCALE_Y = 4;
        SpriterBin.ATTR_OBJ_FOLDER = 5;
        SpriterBin.ATTR_OBJ_FILE = 6;
        SpriterBin.ATTR_OBJ_X = 7;
        SpriterBin.ATTR_OBJ_Y = 8;
        SpriterBin.ATTR_OBJ_SCALE_X = 9;
        SpriterBin.ATTR_OBJ_SCALE_Y = 10;
        SpriterBin.ATTR_OBJ_PIVOT_X = 11;
        SpriterBin.ATTR_OBJ_PIVOT_Y = 12;
        SpriterBin.ATTR_OBJ_ANGLE = 13;
        SpriterBin.ATTR_OBJ_ALPHA = 14;
        return SpriterBin;
    })(Spriter.SpriterFile);
    Spriter.SpriterBin = SpriterBin;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpriterJSON = (function (_super) {
        __extends(SpriterJSON, _super);
        function SpriterJSON(aJSONData, aMinDefs) {
            if (aMinDefs === void 0) { aMinDefs = null; }
            _super.call(this);
            this._json = aJSONData;
            var minimized = aJSONData["min"] !== undefined;
            this.setMinimized(minimized, aMinDefs);
        }
        SpriterJSON.prototype.parseInt = function (aElement, aAttributeName, aDefaultValue) {
            if (aDefaultValue === void 0) { aDefaultValue = 0; }
            var value = aElement[this.translateAttributeName(aAttributeName)];
            if (value === undefined) {
                return aDefaultValue;
            }
            return typeof (value) === "number" ? value : parseInt(value);
        };
        SpriterJSON.prototype.parseFloat = function (aElement, aAttributeName, aDefaultValue) {
            if (aDefaultValue === void 0) { aDefaultValue = 0; }
            var value = aElement[this.translateAttributeName(aAttributeName)];
            if (value === undefined) {
                return aDefaultValue;
            }
            return typeof (value) === "number" ? value : parseFloat(value);
        };
        SpriterJSON.prototype.parseBoolean = function (aElement, aAttributeName, aDefaultValue) {
            if (aDefaultValue === void 0) { aDefaultValue = false; }
            var value = aElement[this.translateAttributeName(aAttributeName)];
            if (value === undefined) {
                return aDefaultValue;
            }
            return typeof (value) === "boolean" ? value : (value === "true");
        };
        SpriterJSON.prototype.parseString = function (aElement, aAttributeName, aDefaultValue) {
            if (aDefaultValue === void 0) { aDefaultValue = ""; }
            var value = aElement[this.translateAttributeName(aAttributeName)];
            return value === undefined ? aDefaultValue : value;
        };
        SpriterJSON.prototype.getNodes = function (aNodeName) {
            this.setMinDefsToElementName(aNodeName);
            var translatedName = this.translateElementName(aNodeName);
            return new Spriter.NodeListJSON(this, this._json[translatedName]);
        };
        SpriterJSON.prototype.getNodesForElement = function (aElement, aNodeName) {
            this.setMinDefsToElementName(aNodeName);
            var translatedName = this.translateElementName(aNodeName);
            return new Spriter.NodeListJSON(this, aElement[translatedName]);
        };
        SpriterJSON.prototype.getFolder = function (aElement) {
            return new Spriter.Folder(this.parseInt(aElement, "id"), this.parseString(aElement, "name"));
        };
        SpriterJSON.prototype.getFile = function (aElement) {
            return new Spriter.File(this.parseInt(aElement, "id"), this.getFileNameWithoutExtension(this.parseString(aElement, "name")), this.parseFloat(aElement, "pivot_x"), 1 - this.parseFloat(aElement, "pivot_y"));
        };
        SpriterJSON.prototype.getEntity = function (aElement) {
            return new Spriter.Entity(this.parseInt(aElement, "id"), this.parseString(aElement, "name"));
        };
        SpriterJSON.prototype.getObjectInfo = function (aElement, aIndex) {
            return new Spriter.ObjectInfo(aIndex, this.parseString(aElement, "name"), Spriter.ObjectType.getObjectTypeForName(this.parseString(aElement, "type")), this.parseFloat(aElement, "w"), this.parseFloat(aElement, "h"));
        };
        SpriterJSON.prototype.getAnimation = function (aElement) {
            return new Spriter.Animation(this.parseInt(aElement, "id"), this.parseString(aElement, "name"), this.parseFloat(aElement, "length"), this.parseBoolean(aElement, "looping", true) === true ? Spriter.eAnimationLooping.LOOPING : Spriter.eAnimationLooping.NO_LOOPING);
        };
        SpriterJSON.prototype.getMainLineKey = function (aElement) {
            return new Spriter.MainLineKey(this.parseFloat(aElement, "time"));
        };
        SpriterJSON.prototype.getRef = function (aElement) {
            return new Spriter.Ref(this.parseInt(aElement, "id"), this.parseInt(aElement, "parent", -1), this.parseInt(aElement, "timeline"), this.parseInt(aElement, "key"), this.parseInt(aElement, "z_index"));
        };
        SpriterJSON.prototype.getTimeline = function (aElement) {
            return new Spriter.Timeline(this.parseInt(aElement, "id"), this.parseString(aElement, "name"), this.parseString(aElement, "object_type") === "bone" ? Spriter.eObjectType.BONE : Spriter.eObjectType.SPRITE, this.parseInt(aElement, "obj", -1));
        };
        SpriterJSON.prototype.getTimelineKey = function (aElement, aIndex, aSpriter) {
            var time = this.parseInt(aElement, "time");
            var spin = this.parseInt(aElement, "spin", 1);
            var curve = this.parseString(aElement, "curve_type", "linear");
            var c1 = this.parseFloat(aElement, "c1", 0);
            var c2 = this.parseFloat(aElement, "c2", 0);
            var c3 = this.parseFloat(aElement, "c3", 0);
            var c4 = this.parseFloat(aElement, "c4", 0);
            var boneTag = this.translateChildElementName("bone");
            var objectTag = this.translateChildElementName("object");
            var key = null;
            var keyDataElm = null;
            var sprite = false;
            if (aElement[boneTag] !== undefined) {
                keyDataElm = aElement[boneTag];
                key = new Spriter.BoneTimelineKey(aIndex, time, spin);
                this.setMinDefsToElementName("bone");
            }
            else if (aElement[objectTag] !== undefined) {
                keyDataElm = aElement[objectTag];
                key = new Spriter.ObjectTimelineKey(aIndex, time, spin);
                this.setMinDefsToElementName("object");
                sprite = true;
            }
            if (curve !== "linear") {
                key.setCurve(Spriter.CurveType.getCurveTypeForName(curve), c1, c2, c3, c4);
            }
            var info = key.info;
            info.x = this.parseFloat(keyDataElm, "x");
            info.y = -this.parseFloat(keyDataElm, "y");
            info.scaleX = this.parseFloat(keyDataElm, "scale_x", 1);
            info.scaleY = this.parseFloat(keyDataElm, "scale_y", 1);
            info.angle = 360 - this.parseFloat(keyDataElm, "angle");
            info.alpha = this.parseFloat(keyDataElm, "a", 1);
            if (sprite) {
                var folderId = this.parseInt(keyDataElm, "folder");
                var fileId = this.parseInt(keyDataElm, "file");
                key.setFolderAndFile(folderId, fileId);
                var file = aSpriter.getFolderById(folderId).getFileById(fileId);
                info.pivotX = this.parseFloat(keyDataElm, "pivot_x", file.anchorX);
                info.pivotY = 1 - this.parseFloat(keyDataElm, "pivot_y", 1 - file.anchorY);
            }
            this.popMinDefsStack();
            return key;
        };
        return SpriterJSON;
    })(Spriter.SpriterFile);
    Spriter.SpriterJSON = SpriterJSON;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpriterXml = (function (_super) {
        __extends(SpriterXml, _super);
        function SpriterXml(aXmlData, aMinDefs) {
            if (aMinDefs === void 0) { aMinDefs = null; }
            _super.call(this);
            this._xml = aXmlData;
            var minimized = aXmlData.documentElement.hasAttribute("min");
            this.setMinimized(minimized, aMinDefs);
        }
        SpriterXml.prototype.parseInt = function (aElement, aAttributeName, aDefaultValue) {
            if (aDefaultValue === void 0) { aDefaultValue = 0; }
            var value = aElement.getAttribute(this.translateAttributeName(aAttributeName));
            return value !== null ? parseInt(value) : aDefaultValue;
        };
        SpriterXml.prototype.parseFloat = function (aElement, aAttributeName, aDefaultValue) {
            if (aDefaultValue === void 0) { aDefaultValue = 0; }
            var value = aElement.getAttribute(this.translateAttributeName(aAttributeName));
            return value !== null ? parseFloat(value) : aDefaultValue;
        };
        SpriterXml.prototype.parseString = function (aElement, aAttributeName, aDefaultValue) {
            if (aDefaultValue === void 0) { aDefaultValue = ""; }
            var value = aElement.getAttribute(this.translateAttributeName(aAttributeName));
            return value !== null ? value : aDefaultValue;
        };
        SpriterXml.prototype.getNodes = function (aNodeName) {
            this.setMinDefsToElementName(aNodeName);
            var translatedName = this.translateElementName(aNodeName);
            return new Spriter.NodeListXml(this, this._xml.documentElement.getElementsByTagName(translatedName));
        };
        SpriterXml.prototype.getNodesForElement = function (aElement, aNodeName) {
            this.setMinDefsToElementName(aNodeName);
            var translatedName = this.translateElementName(aNodeName);
            return new Spriter.NodeListXml(this, aElement.getElementsByTagName(translatedName));
        };
        SpriterXml.prototype.getFolder = function (aElement) {
            return new Spriter.Folder(this.parseInt(aElement, "id"), this.parseString(aElement, "name"));
        };
        SpriterXml.prototype.getFile = function (aElement) {
            return new Spriter.File(this.parseInt(aElement, "id"), this.getFileNameWithoutExtension(this.parseString(aElement, "name")), this.parseFloat(aElement, "pivot_x"), 1 - this.parseFloat(aElement, "pivot_y"));
        };
        SpriterXml.prototype.getEntity = function (aElement) {
            return new Spriter.Entity(this.parseInt(aElement, "id"), this.parseString(aElement, "name"));
        };
        SpriterXml.prototype.getObjectInfo = function (aElement, aIndex) {
            return new Spriter.ObjectInfo(aIndex, this.parseString(aElement, "name"), Spriter.ObjectType.getObjectTypeForName(this.parseString(aElement, "type")), this.parseFloat(aElement, "w"), this.parseFloat(aElement, "h"));
        };
        SpriterXml.prototype.getAnimation = function (aElement) {
            return new Spriter.Animation(this.parseInt(aElement, "id"), this.parseString(aElement, "name"), this.parseFloat(aElement, "length"), this.parseString(aElement, "looping", "true") === "true" ? Spriter.eAnimationLooping.LOOPING : Spriter.eAnimationLooping.NO_LOOPING);
        };
        SpriterXml.prototype.getMainLineKey = function (aElement) {
            return new Spriter.MainLineKey(this.parseFloat(aElement, "time"));
        };
        SpriterXml.prototype.getRef = function (aElement) {
            return new Spriter.Ref(this.parseInt(aElement, "id"), this.parseInt(aElement, "parent", -1), this.parseInt(aElement, "timeline"), this.parseInt(aElement, "key"), this.parseInt(aElement, "z_index"));
        };
        SpriterXml.prototype.getTimeline = function (aElement) {
            return new Spriter.Timeline(this.parseInt(aElement, "id"), this.parseString(aElement, "name"), this.parseString(aElement, "object_type") === "bone" ? Spriter.eObjectType.BONE : Spriter.eObjectType.SPRITE, this.parseInt(aElement, "obj", -1));
        };
        SpriterXml.prototype.getTimelineKey = function (aElement, aIndex, aSpriter) {
            var time = this.parseInt(aElement, "time");
            var spin = this.parseInt(aElement, "spin", 1);
            var curve = this.parseString(aElement, "curve_type", "linear");
            var c1 = this.parseFloat(aElement, "c1", 0);
            var c2 = this.parseFloat(aElement, "c2", 0);
            var c3 = this.parseFloat(aElement, "c3", 0);
            var c4 = this.parseFloat(aElement, "c4", 0);
            var boneTag = this.translateChildElementName("bone");
            var objectTag = this.translateChildElementName("object");
            var key = null;
            var keyDataElm = (aElement.firstElementChild);
            var sprite = false;
            if (keyDataElm.tagName === boneTag) {
                key = new Spriter.BoneTimelineKey(aIndex, time, spin);
                this.setMinDefsToElementName("bone");
            }
            else if (keyDataElm.tagName === objectTag) {
                this.setMinDefsToElementName("object");
                key = new Spriter.ObjectTimelineKey(aIndex, time, spin);
                sprite = true;
            }
            if (curve !== "linear") {
                key.setCurve(Spriter.CurveType.getCurveTypeForName(curve), c1, c2, c3, c4);
            }
            var info = key.info;
            info.x = this.parseFloat(keyDataElm, "x");
            info.y = -this.parseFloat(keyDataElm, "y");
            info.scaleX = this.parseFloat(keyDataElm, "scale_x", 1);
            info.scaleY = this.parseFloat(keyDataElm, "scale_y", 1);
            info.angle = 360 - this.parseFloat(keyDataElm, "angle");
            info.alpha = this.parseFloat(keyDataElm, "a", 1);
            if (sprite) {
                var folderId = this.parseInt(keyDataElm, "folder");
                var fileId = this.parseInt(keyDataElm, "file");
                key.setFolderAndFile(folderId, fileId);
                var file = aSpriter.getFolderById(folderId).getFileById(fileId);
                info.pivotX = this.parseFloat(keyDataElm, "pivot_x", file.anchorX);
                info.pivotY = 1 - this.parseFloat(keyDataElm, "pivot_y", 1 - file.anchorY);
            }
            this.popMinDefsStack();
            return key;
        };
        return SpriterXml;
    })(Spriter.SpriterFile);
    Spriter.SpriterXml = SpriterXml;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    (function (eAnimationLooping) {
        eAnimationLooping[eAnimationLooping["NO_LOOPING"] = 0] = "NO_LOOPING";
        eAnimationLooping[eAnimationLooping["LOOPING"] = 1] = "LOOPING";
    })(Spriter.eAnimationLooping || (Spriter.eAnimationLooping = {}));
    var eAnimationLooping = Spriter.eAnimationLooping;
    ;
    var Animation = (function () {
        function Animation(aId, aName, aLength, aLoopType) {
            this._mainLineKeys = [];
            this._id = aId;
            this._name = aName;
            this._length = aLength;
            this._loopType = aLoopType;
            this._timelines = new Helper.IdNameMap();
        }
        Object.defineProperty(Animation.prototype, "mainLineKeys", {
            get: function () {
                return this._mainLineKeys;
            },
            enumerable: true,
            configurable: true
        });
        Animation.prototype.addMainLineKey = function (aMainLineKey) {
            this._mainLineKeys.push(aMainLineKey);
        };
        Animation.prototype.addTimeline = function (aTimeline) {
            this._timelines.add(aTimeline, aTimeline.id, aTimeline.name);
        };
        Animation.prototype.getTimelineById = function (aId) {
            return this._timelines.getById(aId);
        };
        Animation.prototype.getTimelineByName = function (aName) {
            return this._timelines.getByName(aName);
        };
        Object.defineProperty(Animation.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "length", {
            get: function () {
                return this._length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "loopType", {
            get: function () {
                return this._loopType;
            },
            enumerable: true,
            configurable: true
        });
        return Animation;
    })();
    Spriter.Animation = Animation;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var TimelineKey = (function () {
        function TimelineKey(aId, aTime, aSpin) {
            this._id = aId;
            this._time = aTime;
            this._spin = aSpin;
            this.setCurve(Spriter.eCurveType.LINEAR);
        }
        TimelineKey.prototype.setCurve = function (aCurveType, aC1, aC2, aC3, aC4) {
            if (aC1 === void 0) { aC1 = 0; }
            if (aC2 === void 0) { aC2 = 0; }
            if (aC3 === void 0) { aC3 = 0; }
            if (aC4 === void 0) { aC4 = 0; }
            this._curveType = aCurveType;
            this._c1 = aC1;
            this._c2 = aC2;
            this._c3 = aC3;
            this._c4 = aC4;
        };
        Object.defineProperty(TimelineKey.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineKey.prototype, "time", {
            get: function () {
                return this._time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineKey.prototype, "spin", {
            get: function () {
                return this._spin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineKey.prototype, "curveType", {
            get: function () {
                return this._curveType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineKey.prototype, "c1", {
            get: function () {
                return this._c1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineKey.prototype, "c2", {
            get: function () {
                return this._c2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineKey.prototype, "c3", {
            get: function () {
                return this._c3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineKey.prototype, "c4", {
            get: function () {
                return this._c4;
            },
            enumerable: true,
            configurable: true
        });
        return TimelineKey;
    })();
    Spriter.TimelineKey = TimelineKey;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpatialTimelineKey = (function (_super) {
        __extends(SpatialTimelineKey, _super);
        function SpatialTimelineKey() {
            _super.apply(this, arguments);
            this._info = new Spriter.SpatialInfo();
        }
        Object.defineProperty(SpatialTimelineKey.prototype, "info", {
            get: function () {
                return this._info;
            },
            enumerable: true,
            configurable: true
        });
        return SpatialTimelineKey;
    })(Spriter.TimelineKey);
    Spriter.SpatialTimelineKey = SpatialTimelineKey;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var BoneTimelineKey = (function (_super) {
        __extends(BoneTimelineKey, _super);
        function BoneTimelineKey() {
            _super.apply(this, arguments);
        }
        return BoneTimelineKey;
    })(Spriter.SpatialTimelineKey);
    Spriter.BoneTimelineKey = BoneTimelineKey;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    (function (eCurveType) {
        eCurveType[eCurveType["LINEAR"] = 0] = "LINEAR";
        eCurveType[eCurveType["INSTANT"] = 1] = "INSTANT";
        eCurveType[eCurveType["QUADRATIC"] = 2] = "QUADRATIC";
        eCurveType[eCurveType["CUBIC"] = 3] = "CUBIC";
    })(Spriter.eCurveType || (Spriter.eCurveType = {}));
    var eCurveType = Spriter.eCurveType;
    ;
    var CurveType = (function () {
        function CurveType() {
        }
        CurveType.getCurveTypeForName = function (aCurveTypeName) {
            if (aCurveTypeName === "linear") {
                return eCurveType.LINEAR;
            }
            else if (aCurveTypeName === "instant") {
                return eCurveType.INSTANT;
            }
            else if (aCurveTypeName === "quadratic") {
                return eCurveType.QUADRATIC;
            }
            else if (aCurveTypeName === "cubic") {
                return eCurveType.CUBIC;
            }
            else {
                console.warn("Unknown curve type: " + aCurveTypeName);
            }
        };
        return CurveType;
    })();
    Spriter.CurveType = CurveType;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Entity = (function () {
        function Entity(aId, aName) {
            this._id = aId;
            this._name = aName;
            this._objectInfos = new Helper.IdNameMap();
            this._animations = new Helper.IdNameMap();
        }
        Entity.prototype.addObjectInfo = function (aObjectInfo) {
            this._objectInfos.add(aObjectInfo, aObjectInfo.id, aObjectInfo.name);
        };
        Entity.prototype.getObjectInfoById = function (aId) {
            return this._objectInfos.getById(aId);
        };
        Entity.prototype.getObjectInfoByName = function (aName) {
            return this._objectInfos.getByName(aName);
        };
        Entity.prototype.addAnimation = function (aAnimation) {
            this._animations.add(aAnimation, aAnimation.id, aAnimation.name);
        };
        Entity.prototype.getAnimationById = function (aId) {
            return this._animations.getById(aId);
        };
        Entity.prototype.getAnimationByName = function (aName) {
            return this._animations.getByName(aName);
        };
        Object.defineProperty(Entity.prototype, "animationsCount", {
            get: function () {
                return this._animations.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        return Entity;
    })();
    Spriter.Entity = Entity;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var File = (function () {
        function File(aId, aName, aAnchorX, aAnchorY) {
            this._id = aId;
            this._name = aName;
            this._anchorX = aAnchorX;
            this._anchorY = aAnchorY;
        }
        Object.defineProperty(File.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "anchorX", {
            get: function () {
                return this._anchorX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "anchorY", {
            get: function () {
                return this._anchorY;
            },
            enumerable: true,
            configurable: true
        });
        return File;
    })();
    Spriter.File = File;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Folder = (function () {
        function Folder(aId, aName) {
            this._id = aId;
            this._name = aName;
            this._files = new Helper.IdNameMap();
        }
        Folder.prototype.addFile = function (aFile) {
            this._files.add(aFile, aFile.id, aFile.name);
        };
        Folder.prototype.getFileById = function (aId) {
            return this._files.getById(aId);
        };
        Folder.prototype.getFileByName = function (aName) {
            return this._files.getByName(aName);
        };
        Object.defineProperty(Folder.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        return Folder;
    })();
    Spriter.Folder = Folder;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var MainLineKey = (function () {
        function MainLineKey(aTime) {
            this._boneRefs = [];
            this._objectRefs = [];
            this._time = aTime;
        }
        Object.defineProperty(MainLineKey.prototype, "boneRefs", {
            get: function () {
                return this._boneRefs;
            },
            enumerable: true,
            configurable: true
        });
        MainLineKey.prototype.addBoneRef = function (aBoneRef) {
            this._boneRefs.push(aBoneRef);
        };
        Object.defineProperty(MainLineKey.prototype, "objectRefs", {
            get: function () {
                return this._objectRefs;
            },
            enumerable: true,
            configurable: true
        });
        MainLineKey.prototype.addObjectRef = function (aObjectRef) {
            this._objectRefs.push(aObjectRef);
        };
        Object.defineProperty(MainLineKey.prototype, "time", {
            get: function () {
                return this._time;
            },
            enumerable: true,
            configurable: true
        });
        return MainLineKey;
    })();
    Spriter.MainLineKey = MainLineKey;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var ObjectInfo = (function () {
        function ObjectInfo(aId, aName, aType, aWidth, aHeight) {
            this._id = aId;
            this._type = aType;
            this._name = aName;
            this._width = aWidth;
            this._height = aHeight;
        }
        Object.defineProperty(ObjectInfo.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectInfo.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectInfo.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectInfo.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectInfo.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        return ObjectInfo;
    })();
    Spriter.ObjectInfo = ObjectInfo;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var ObjectTimelineKey = (function (_super) {
        __extends(ObjectTimelineKey, _super);
        function ObjectTimelineKey() {
            _super.apply(this, arguments);
        }
        ObjectTimelineKey.prototype.setFolderAndFile = function (aFolder, aFile) {
            this._folder = aFolder;
            this._file = aFile;
        };
        Object.defineProperty(ObjectTimelineKey.prototype, "folder", {
            get: function () {
                return this._folder;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectTimelineKey.prototype, "file", {
            get: function () {
                return this._file;
            },
            enumerable: true,
            configurable: true
        });
        return ObjectTimelineKey;
    })(Spriter.SpatialTimelineKey);
    Spriter.ObjectTimelineKey = ObjectTimelineKey;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    (function (eObjectType) {
        eObjectType[eObjectType["SPRITE"] = 0] = "SPRITE";
        eObjectType[eObjectType["BONE"] = 1] = "BONE";
    })(Spriter.eObjectType || (Spriter.eObjectType = {}));
    var eObjectType = Spriter.eObjectType;
    ;
    var ObjectType = (function () {
        function ObjectType() {
        }
        ObjectType.getObjectTypeForName = function (aTypeName) {
            if (aTypeName === "sprite") {
                return eObjectType.SPRITE;
            }
            else if (aTypeName === "bone") {
                return eObjectType.BONE;
            }
        };
        return ObjectType;
    })();
    Spriter.ObjectType = ObjectType;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Ref = (function () {
        function Ref(aId, aParent, aTimeline, aKey, aZ) {
            if (aZ === void 0) { aZ = 0; }
            this.id = aId;
            this.parent = aParent;
            this.timeline = aTimeline;
            this.key = aKey;
            this.z = aZ;
        }
        return Ref;
    })();
    Spriter.Ref = Ref;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpatialInfo = (function () {
        function SpatialInfo() {
            this.x = 0;
            this.y = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.pivotX = 0;
            this.pivotY = 0;
            this.alpha = 1;
            this.angle = 0;
        }
        return SpatialInfo;
    })();
    Spriter.SpatialInfo = SpatialInfo;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Timeline = (function () {
        function Timeline(aId, aName, aType, aObjectRef) {
            if (aType === void 0) { aType = Spriter.eObjectType.SPRITE; }
            if (aObjectRef === void 0) { aObjectRef = -1; }
            this._keys = [];
            this._id = aId;
            this._name = aName;
            this._type = aType;
            this._objectRef = aObjectRef;
        }
        Object.defineProperty(Timeline.prototype, "keys", {
            get: function () {
                return this._keys;
            },
            enumerable: true,
            configurable: true
        });
        Timeline.prototype.addKey = function (aKey) {
            this._keys.push(aKey);
        };
        Object.defineProperty(Timeline.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timeline.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timeline.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timeline.prototype, "objectRef", {
            get: function () {
                return this._objectRef;
            },
            enumerable: true,
            configurable: true
        });
        return Timeline;
    })();
    Spriter.Timeline = Timeline;
})(Spriter || (Spriter = {}));
var SpriterExample;
(function (SpriterExample) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.call(this);
        }
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = false;
        };
        Boot.prototype.create = function () {
            this.game.state.start("Preloader", true, false);
        };
        return Boot;
    })(Phaser.State);
    SpriterExample.Boot = Boot;
})(SpriterExample || (SpriterExample = {}));
var SpriterExample;
(function (SpriterExample) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.call(this);
        }
        Preloader.prototype.preload = function () {
            var path = SpriterExample.Global.assetsPath;
            this.load.atlas("Hero", path + "Atlas.png", path + "Atlas.json");
            this.load.xml("HeroDataXml", path + "Hero.xml");
            this.load.json("HeroDataJSON", path + "Hero.json");
            this.load.binary("HeroDataBin", path + "Hero.bin", this.onBinaryLoaded, this);
        };
        Preloader.prototype.onBinaryLoaded = function (aKey, aData) {
            return aData;
        };
        Preloader.prototype.create = function () {
            this.game.state.start("Test");
        };
        return Preloader;
    })(Phaser.State);
    SpriterExample.Preloader = Preloader;
})(SpriterExample || (SpriterExample = {}));
var SpriterExample;
(function (SpriterExample) {
    var Test = (function (_super) {
        __extends(Test, _super);
        function Test() {
            _super.call(this);
            this.minimizedDefinitions = {
                "name": "spriter_data",
                "minName": "s",
                "attributes": {
                    "scml_version": "v",
                    "generator": "g",
                    "generator_version": "gv"
                },
                "childElements": {
                    "folder": {
                        "name": "folder",
                        "minName": "d",
                        "attributes": {
                            "id": "i",
                            "name": "n"
                        },
                        "childElements": {
                            "file": {
                                "name": "file",
                                "minName": "f",
                                "attributes": {
                                    "id": "i",
                                    "name": "n",
                                    "width": "w",
                                    "height": "h",
                                    "pivot_x": "px",
                                    "pivot_y": "py"
                                }
                            }
                        }
                    },
                    "entity": {
                        "name": "entity",
                        "minName": "e",
                        "attributes": {
                            "id": "i",
                            "name": "n"
                        },
                        "childElements": {
                            "obj_info": {
                                "name": "obj_info",
                                "minName": "o",
                                "attributes": {
                                    "name": "n",
                                    "type": "t",
                                    "w": "w",
                                    "h": "h"
                                },
                                "childElements": {
                                    "frames": {
                                        "name": "frames",
                                        "minName": "f",
                                        "childElements": {
                                            "i": {
                                                "name": "i",
                                                "minName": "i",
                                                "attributes": {
                                                    "folder": "d",
                                                    "file": "f"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "animation": {
                                "name": "animation",
                                "minName": "a",
                                "attributes": {
                                    "id": "i",
                                    "name": "n",
                                    "length": "l",
                                    "interval": "t",
                                    "looping": "c"
                                },
                                "childElements": {
                                    "mainline": {
                                        "name": "mainline",
                                        "minName": "m",
                                        "childElements": {
                                            "key": {
                                                "name": "key",
                                                "minName": "k",
                                                "attributes": {
                                                    "id": "i",
                                                    "time": "t"
                                                },
                                                "childElements": {
                                                    "bone_ref": {
                                                        "name": "bone_ref",
                                                        "minName": "b",
                                                        "attributes": {
                                                            "id": "i",
                                                            "parent": "p",
                                                            "timeline": "t",
                                                            "key": "k"
                                                        }
                                                    },
                                                    "object_ref": {
                                                        "name": "object_ref",
                                                        "minName": "o",
                                                        "attributes": {
                                                            "id": "i",
                                                            "name": "n",
                                                            "timeline": "t",
                                                            "parent": "p",
                                                            "key": "k",
                                                            "z_index": "z",
                                                            "folder": "d",
                                                            "file": "f",
                                                            "abs_x": "ax",
                                                            "abs_y": "ay",
                                                            "abs_pivot_x": "apx",
                                                            "abs_pivot_y": "apy",
                                                            "abs_scale_x": "asx",
                                                            "abs_scale_y": "asy",
                                                            "abs_angle": "r",
                                                            "abs_a": "a"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "timeline": {
                                        "name": "timeline",
                                        "minName": "t",
                                        "attributes": {
                                            "id": "i",
                                            "name": "n",
                                            "obj": "o",
                                            "object_type": "t"
                                        },
                                        "childElements": {
                                            "key": {
                                                "name": "key",
                                                "minName": "k",
                                                "attributes": {
                                                    "id": "i",
                                                    "time": "t",
                                                    "spin": "s",
                                                    "curve_type": "ct",
                                                    "c1": "c1",
                                                    "c2": "c2"
                                                },
                                                "childElements": {
                                                    "bone": {
                                                        "name": "bone",
                                                        "minName": "b",
                                                        "attributes": {
                                                            "x": "x",
                                                            "y": "y",
                                                            "angle": "r",
                                                            "scale_x": "sx",
                                                            "scale_y": "sy"
                                                        }
                                                    },
                                                    "object": {
                                                        "name": "object",
                                                        "minName": "o",
                                                        "attributes": {
                                                            "folder": "d",
                                                            "file": "f",
                                                            "x": "x",
                                                            "y": "y",
                                                            "scale_x": "sx",
                                                            "scale_y": "sy",
                                                            "pivot_x": "px",
                                                            "pivot_y": "py",
                                                            "angle": "r",
                                                            "a": "a"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };
        }
        Test.prototype.create = function () {
            this.stage.backgroundColor = 0x00DFFF;
            var spriterLoader = new Spriter.Loader();
            var spriterFile = new Spriter.SpriterBin(this.cache.getBinary("HeroDataBin"));
            var spriterData = spriterLoader.load(spriterFile);
            this.spriterGroup = new Spriter.SpriterGroup(this.game, spriterData, "Hero", "Player", 0, 100);
            this.spriterGroup.position.setTo(320, 350);
            this.world.add(this.spriterGroup);
            var animation = 0;
            var key = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            key.onDown.add(function () {
                animation = (animation + 1) % this.spriterGroup.animationCount;
                this.spriterGroup.setAnimationById(animation);
            }, this);
        };
        Test.prototype.update = function () {
            this.spriterGroup.updateAnimation();
        };
        Test.prototype.render = function () {
            this.game.debug.text(" Playing animation: " + this.spriterGroup.currentAnimationName + " (Press A to next...)", 50, 30, "rgb(0, 0, 0)");
        };
        return Test;
    })(Phaser.State);
    SpriterExample.Test = Test;
})(SpriterExample || (SpriterExample = {}));
//# sourceMappingURL=SpriterExample.js.map