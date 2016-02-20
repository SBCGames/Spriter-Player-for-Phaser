/// <reference path="SpriterFile.ts" />

module Spriter {

    export class SpriterBin extends SpriterFile {

        // spriter data
        private static ATTR_VERSION = 0;
        private static ATTR_GENERATOR = 1;
        private static ATTR_GENERATOR_VERSION = 2;

        // folder
        private static ATTR_FOLDER_ID = 0;
        private static ATTR_FOLDER_NAME = 1;

        // file
        private static ATTR_FILE_ID = 0;
        private static ATTR_FILE_NAME = 1;
        private static ATTR_FILE_WIDTH = 2;
        private static ATTR_FILE_HEIGHT = 3;
        private static ATTR_FILE_PIVOT_X = 4;
        private static ATTR_FILE_PIVOT_Y = 5;

        // entity
        private static ATTR_ENTITY_ID = 0;
        private static ATTR_ENTITY_NAME = 1;

        // obj_info
        private static ATTR_OBJ_INFO_NAME = 0;
        private static ATTR_OBJ_INFO_TYPE = 1;
        private static ATTR_OBJ_INFO_WIDTH = 2;
        private static ATTR_OBJ_INFO_HEIGHT = 3;

        // frames
        private static ATTR_FRAMES_I_FOLDER = 0;
        private static ATTR_FRAMES_I_FILE = 1;

        // animation
        private static ATTR_ANIMATION_ID = 0;
        private static ATTR_ANIMATION_NAME = 1;
        private static ATTR_ANIMATION_LENGTH = 2;
        private static ATTR_ANIMATION_INTERVAL = 3;
        private static ATTR_ANIMATION_LOOPING = 4;

        // key
        private static ATTR_MAINLINE_KEY_ID = 0;
        private static ATTR_MAINLINE_KEY_TIME = 1;

        // bone_ref
        private static ATTR_BONE_REF_ID = 0;
        private static ATTR_BONE_REF_PARENT = 1;
        private static ATTR_BONE_REF_TIMELINE = 2;
        private static ATTR_BONE_REF_KEY = 3;

        // object_ref
        private static ATTR_OBJ_REF_ID = 4;
        private static ATTR_OBJ_REF_PARENT = 5;
        private static ATTR_OBJ_REF_TIMELINE = 6;
        private static ATTR_OBJ_REF_KEY = 7;
        private static ATTR_OBJ_REF_NAME = 8;
        private static ATTR_OBJ_REF_Z = 9;
        private static ATTR_OBJ_REF_FOLDER = 10;
        private static ATTR_OBJ_REF_FILE = 11;
        private static ATTR_OBJ_REF_ABS_X = 12;
        private static ATTR_OBJ_REF_ABS_Y = 13;
        private static ATTR_OBJ_REF_ABS_PIVOT_X = 14;
        private static ATTR_OBJ_REF_ABS_PIVOT_Y = 15;
        private static ATTR_OBJ_REF_ABS_SCALE_X = 16;
        private static ATTR_OBJ_REF_ABS_SCALE_Y = 17;
        private static ATTR_OBJ_REF_ANGLE = 18;
        private static ATTR_OBJ_REF_ALPHA = 19;

        // timeline
        private static ATTR_TIMELINE_ID = 0;
        private static ATTR_TIMELINE_NAME = 1;
        private static ATTR_TIMELINE_OBJ = 2;
        private static ATTR_TIMELINE_OBJ_TYPE = 3;

        // key
        private static ATTR_TIMELINE_KEY_ID = 0;
        private static ATTR_TIMELINE_KEY_TIME = 1;
        private static ATTR_TIMELINE_KEY_SPIN = 2;
        private static ATTR_TIMELINE_KEY_CURVE = 3;
        private static ATTR_TIMELINE_KEY_C1 = 4;
        private static ATTR_TIMELINE_KEY_C2 = 5;

        // bone
        private static ATTR_BONE_X = 0;
        private static ATTR_BONE_Y = 1;
        private static ATTR_BONE_ANGLE = 2;
        private static ATTR_BONE_SCALE_X = 3;
        private static ATTR_BONE_SCALE_Y = 4;

        // object
        private static ATTR_OBJ_FOLDER = 5;
        private static ATTR_OBJ_FILE = 6;
        private static ATTR_OBJ_X = 7;
        private static ATTR_OBJ_Y = 8;
        private static ATTR_OBJ_SCALE_X = 9;
        private static ATTR_OBJ_SCALE_Y = 10;
        private static ATTR_OBJ_PIVOT_X = 11;
        private static ATTR_OBJ_PIVOT_Y = 12;
        private static ATTR_OBJ_ANGLE = 13;
        private static ATTR_OBJ_ALPHA = 14;

        private _elements: any = {
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

        private _bin: DataView;
        private _smallOffset: boolean = false;

        private _tmpPosition: number;

        // -------------------------------------------------------------------------
        constructor(binData: ArrayBuffer) {
            super();

            this._bin = new DataView(binData);
            this._smallOffset = this._bin.getUint8(0) === 1;
        }

        // -------------------------------------------------------------------------
        public getType(): eFileType {
            return eFileType.BIN;
        }

        // -------------------------------------------------------------------------
        private readUint8(): number {
            return this._bin.getUint8(this._tmpPosition++);
        }

        // -------------------------------------------------------------------------
        private readInt8(): number {
            return this._bin.getInt8(this._tmpPosition++);
        }

        // -------------------------------------------------------------------------
        private readUint16(): number {
            var value = this._bin.getUint16(this._tmpPosition, true);
            this._tmpPosition += 2;
            return value;
        }

        // -------------------------------------------------------------------------
        private readInt16(): number {
            var value = this._bin.getInt16(this._tmpPosition, true);
            this._tmpPosition += 2;
            return value;
        }

        // -------------------------------------------------------------------------
        private readUint32(): number {
            var value = this._bin.getUint32(this._tmpPosition, true);
            this._tmpPosition += 4;
            return value;
        }

        // -------------------------------------------------------------------------
        private readInt32(): number {
            var value = this._bin.getInt32(this._tmpPosition, true);
            this._tmpPosition += 4;
            return value;
        }

        // -------------------------------------------------------------------------
        private readFixed16_16(): number {
            var value = this._bin.getInt32(this._tmpPosition, true);
            this._tmpPosition += 4;
            return value / 65536;
        }

        // -------------------------------------------------------------------------
        private readFixed1_7(): number {
            var value = this._bin.getInt32(this._tmpPosition++) & 0xFF;
            return value / 128;
        }

        // -------------------------------------------------------------------------
        private readString(): string {
            var chars = [];
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                chars.push(this._bin.getUint8(this._tmpPosition++));
            }

            return String.fromCharCode.apply(null, chars);
        }

        // -------------------------------------------------------------------------
        public getNodes(nodeName: string): ISpriterNodeList {
            return new NodeListBin(this, this.getSubNodesOfElementType(1, this._elements[nodeName]));
        }

        // -------------------------------------------------------------------------
        public getNodesForElement(elementPosition: number, nodeName: string): ISpriterNodeList {
            return new NodeListBin(this, this.getSubNodesOfElementType(elementPosition, this._elements[nodeName]));
        }

        // -------------------------------------------------------------------------
        private getSubNodesOfElementType(positon: number, elementType: number): number[] {
            var result: number[] = [];
            var subelementsCount = this._bin.getUint8(positon + 1);
            positon += 2;

            for (var i = 0; i < subelementsCount; i++) {
                var subelementOffset = this._smallOffset ? this._bin.getUint16(positon + i * 2, true) : this._bin.getUint32(positon + i * 4, true);
                var subelementType = this._bin.getUint8(positon + subelementOffset);
                if (subelementType === elementType) {
                    result.push(positon + subelementOffset);
                }
            }

            return result;
        }

        // -------------------------------------------------------------------------
        private getAttribsPosition(position: number): number {
            var subelementsCount = this._bin.getUint8(position + 1)
            return position + 2 + subelementsCount * (this._smallOffset ? 2 : 4);
        }

        // -------------------------------------------------------------------------
        public getFolder(position: number): Folder {
            this._tmpPosition = this.getAttribsPosition(position);

            var id = 0;
            var name = "";

            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition ++)) {
                    case SpriterBin.ATTR_FOLDER_ID:
                        id = this.readUint8();
                        break;

                    case SpriterBin.ATTR_FOLDER_NAME:
                        name = this.readString();
                        break;
                }
            }

            return new Folder(id, name);
        }

        // -------------------------------------------------------------------------
        public getFile(position: number): File {
            console.log("skip sound loading");

            this._tmpPosition = this.getAttribsPosition(position);

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
                        // ignore - just skip
                        this._tmpPosition += 2;
                        break;
                }
            }
            return new File(id, this.getFileNameWithoutExtension(name), pivotX, 1 - pivotY);
        }

        // -------------------------------------------------------------------------
        public getTag(position: number): Item {
            console.error("implement loading Tag");
            return null;
        }

        // -------------------------------------------------------------------------
        public getEntity(position: number): Entity {
            this._tmpPosition = this.getAttribsPosition(position);

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

            return new Entity(id, name);
        }

        // -------------------------------------------------------------------------
        public getObjectInfo(position: number, index: number): ObjectInfo {
            this._tmpPosition = this.getAttribsPosition(position);

            var name = "";
            var type = eObjectType.SPRITE;
            var width = 0;
            var height = 0;

            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_OBJ_INFO_NAME:
                        name = this.readString();
                        break;

                    case SpriterBin.ATTR_OBJ_INFO_TYPE:
                        if (this.readUint8() === 1) {
                            type = eObjectType.BONE;
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


            console.error("add loading of pivots");

            return new ObjectInfo(index, name, type, width, height, 0, 0);
        }

        // -------------------------------------------------------------------------
        public getCharMap(position: number): CharMap {
            console.error("add loading of charmaps");
            return null;
        }

        // -------------------------------------------------------------------------
        public getCharMapEntry(position: number, charMap: CharMap, spriter: Spriter): void {
            console.error("add loading of charmap entries");
            return null;
        }

        // -------------------------------------------------------------------------
        public getVariable(position: number): Variable {
            console.error("add loading of variables");
            return null;
        }

        // -------------------------------------------------------------------------
        public getAnimation(position: number): Animation {
            this._tmpPosition = this.getAttribsPosition(position);

            var id = 0;
            var name = "";
            var length = 0;
            var interval = 0;
            var looping = eAnimationLooping.LOOPING;

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
                        // ignore - skip
                        this._tmpPosition += 2;
                        break;

                    case SpriterBin.ATTR_ANIMATION_LOOPING:
                        looping = (this.readUint8() === 1) ? eAnimationLooping.LOOPING : eAnimationLooping.NO_LOOPING;
                        break;
                }
            }

            return new Animation(id, name, length, looping);
        }

        // -------------------------------------------------------------------------
        public getMainlineKey(position: number): KeyMainline {
            this._tmpPosition = this.getAttribsPosition(position);

            var id = 0;
            var time = 0;

            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_MAINLINE_KEY_ID:
                        id = this.readUint8();
                        break;

                    case SpriterBin.ATTR_MAINLINE_KEY_TIME:
                        time = this.readUint32();
                        break;
                }
            }

            return new KeyMainline(id, time);
        }

        // -------------------------------------------------------------------------
        public getRef(position: number): Ref {
            this._tmpPosition = this.getAttribsPosition(position);

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
                        // waste
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
                        // skip
                        this._tmpPosition += 4;
                        break;

                    case SpriterBin.ATTR_OBJ_REF_ALPHA:
                        // skip
                        ++this._tmpPosition;
                        break;
                }
            }

            return new Ref(id, parent, timeline, key, z_index);
        }

        // -------------------------------------------------------------------------
        public getTimeline(position: number): Timeline {
            console.error("add loading of all types of objects");

            this._tmpPosition = this.getAttribsPosition(position);

            var id = 0;
            var name = "";
            var obj = 0;
            var type = eObjectType.SPRITE;

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
                            type = eObjectType.BONE;
                        }
                        break;
                }
            }

            return new Timeline(id, name, type, obj);
        }

        // -------------------------------------------------------------------------
        public getBaseline(position: number): Baseline {
            console.error("add loading of baselines");
            return null;
        }

        // -------------------------------------------------------------------------
        public getVarline(position: number): Varline {
            console.error("add loading of varlines");
            return null;
        }

        // -------------------------------------------------------------------------
        public getKey(position: number): Key {
            console.error("add loading of keys");
            return null;
        }

        // -------------------------------------------------------------------------
        public getTagKey(position: number): KeyTag {
            console.error("add loading of tag keys");
            return null;
        }

        // -------------------------------------------------------------------------
        public getVariableKey(position: number, type: eVariableType): KeyVariable {
            console.error("add loading of variable keys");
            return null;
        }

        // -------------------------------------------------------------------------
        public getTimelineKey(position: number, index: number, spriter: Spriter): KeyTimeline {
            this._tmpPosition = this.getAttribsPosition(position);

            var time = 0;
            var spin = 1;
            // curve and params
            var curve = eCurveType.LINEAR;
            var c1 = 0;
            var c2 = 0;
            var c3 = 0;
            var c4 = 0;

            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_TIMELINE_KEY_ID:
                        // skip
                        ++this._tmpPosition;
                        break;

                    case SpriterBin.ATTR_TIMELINE_KEY_TIME:
                        time = this.readUint32();
                        break;

                    case SpriterBin.ATTR_TIMELINE_KEY_SPIN:
                        spin = this.readInt8();
                        break;

                    case SpriterBin.ATTR_TIMELINE_KEY_CURVE:
                        curve = <eCurveType>this.readUint8();
                        break;

                    case SpriterBin.ATTR_TIMELINE_KEY_C1:
                        c1 = this.readFixed1_7();
                        break;

                    case SpriterBin.ATTR_TIMELINE_KEY_C2:
                        c2 = this.readFixed1_7();
                        break;
                }
            }


            // get child element
            position += 2
            var offset = position + (this._smallOffset ? this._bin.getUint16(position, true) : this._bin.getUint32(position, true));
            var elementType = this._bin.getUint8(offset);

            var key: KeyTimeline = null;
            var keyDataElm = null;

            var sprite: boolean = false;

            if (elementType === 14 /* bone */) {
                key = new KeyBone(index, time, spin);
            } else if (elementType === 15 /* object */) {
                key = new KeyObject(index, time, spin);
                sprite = true;
            }

            // other curve than linear?
            if (curve !== eCurveType.LINEAR) {
                key.setCurve(curve, c1, c2, c3, c4);
            }


            this._tmpPosition = this.getAttribsPosition(offset);
            // spatial info
            var info = key.info;

            info.x = 0; //this.parseFloat(keyDataElm, "x");
            info.y = 0; //-this.parseFloat(keyDataElm, "y");
            info.scaleX = 1; // this.parseFloat(keyDataElm, "scale_x", 1);
            info.scaleY = 1; //this.parseFloat(keyDataElm, "scale_y", 1);
            info.angle = 0; //360 - this.parseFloat(keyDataElm, "angle");
            info.alpha = 1; //this.parseFloat(keyDataElm, "a", 1);
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
                (<KeyObject>key).setFolderAndFile(folder, file);
                // set pivot in spatial info different from default (based on pivot in file)
                var fileObj = spriter.getFolderById(folder).getFileById(file);
                info.pivotX = hasPivotX ? pivotX : fileObj.pivotX;
                // 1 - to flip Y, default anchor is already flipped, so it needs to be flipped back to avoid double flipping
                info.pivotY = 1 - (hasPivotY ? pivotY : 1 - fileObj.pivotY);
            }

            return key;
        }

        // -------------------------------------------------------------------------
        public getTagChange(position: number): number {
            console.error("add loading of tag changes");
            return null;
        }
    }
}
