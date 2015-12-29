/// <reference path="SpriterFile.ts" />
module Spriter {

    export class SpriterJSON extends SpriterFile {

        private _json: any;

        // -------------------------------------------------------------------------
        constructor(aJSONData: any, aMinDefs: any = null) {
            super();

            this._json = aJSONData;

            var minimized = aJSONData["min"] !== undefined;
            this.setMinimized(minimized, aMinDefs);
        }

        // -------------------------------------------------------------------------
        private parseInt(aElement: any, aAttributeName: string, aDefaultValue: number = 0): number {
            var value = aElement[this.translateAttributeName(aAttributeName)];
            if (value === undefined) {
                return aDefaultValue;
            }

            return typeof (value) === "number" ? value : parseInt(value);
        }

        // -------------------------------------------------------------------------
        protected parseFloat(aElement: any, aAttributeName: string, aDefaultValue: number = 0): number {
            var value = aElement[this.translateAttributeName(aAttributeName)];
            if (value === undefined) {
                return aDefaultValue;
            }

            return typeof (value) === "number" ? value : parseFloat(value);
        }

        // -------------------------------------------------------------------------
        protected parseBoolean(aElement: any, aAttributeName: string, aDefaultValue: boolean = false): boolean {
            var value = aElement[this.translateAttributeName(aAttributeName)];
            if (value === undefined) {
                return aDefaultValue;
            }

            return typeof (value) === "boolean" ? value : (value === "true");
        }

        // -------------------------------------------------------------------------
        protected parseString(aElement: any, aAttributeName: string, aDefaultValue: string = ""): string {
            var value = aElement[this.translateAttributeName(aAttributeName)];
            return value === undefined ? aDefaultValue : value;
        }

        // -------------------------------------------------------------------------
        public getNodes(aNodeName: string): ISpriterNodeList {
            this.setMinDefsToElementName(aNodeName);
            var translatedName = this.translateElementName(aNodeName);

            return new NodeListJSON(this, this._json[translatedName]);
        }

        // -------------------------------------------------------------------------
        public getNodesForElement(aElement: any, aNodeName: string): ISpriterNodeList {
            this.setMinDefsToElementName(aNodeName);
            var translatedName = this.translateElementName(aNodeName);

            return new NodeListJSON(this, aElement[translatedName]);
        }

        // -------------------------------------------------------------------------
        public getFolder(aElement: any): Folder {
            return new Folder(
                this.parseInt(aElement, "id"),
                this.parseString(aElement, "name"));
        }

        // -------------------------------------------------------------------------
        public getFile(aElement: any): File {
            return new File(
                this.parseInt(aElement, "id"),
                this.getFileNameWithoutExtension(this.parseString(aElement, "name")),
                this.parseFloat(aElement, "pivot_x"),
                1 - this.parseFloat(aElement, "pivot_y"));
        }

        // -------------------------------------------------------------------------
        public getEntity(aElement: any): Entity {
            return new Entity(
                this.parseInt(aElement, "id"),
                this.parseString(aElement, "name"));
        }

        // -------------------------------------------------------------------------
        public getObjectInfo(aElement: any, aIndex: number): ObjectInfo {
            return new ObjectInfo(
                aIndex,
                this.parseString(aElement, "name"),
                ObjectType.getObjectTypeForName(this.parseString(aElement, "type")),
                this.parseFloat(aElement, "w"),
                this.parseFloat(aElement, "h"));
        }

        // -------------------------------------------------------------------------
        public getAnimation(aElement: any): Animation {
            return new Animation(
                this.parseInt(aElement, "id"),
                this.parseString(aElement, "name"),
                this.parseFloat(aElement, "length"),
                this.parseBoolean(aElement, "looping", true) === true ? eAnimationLooping.LOOPING : eAnimationLooping.NO_LOOPING
            );
        }

        // -------------------------------------------------------------------------
        public getMainLineKey(aElement: any): MainLineKey {
            return new MainLineKey(
                this.parseFloat(aElement, "time")
            );
        }

        // -------------------------------------------------------------------------
        public getRef(aElement: any): Ref {
            return new Ref(
                this.parseInt(aElement, "id"),
                this.parseInt(aElement, "parent", -1),
                this.parseInt(aElement, "timeline"),
                this.parseInt(aElement, "key"),
                this.parseInt(aElement, "z_index"));
        }

        // -------------------------------------------------------------------------
        public getTimeline(aElement: any): Timeline {
            return new Timeline(
                this.parseInt(aElement, "id"),
                this.parseString(aElement, "name"),
                this.parseString(aElement, "object_type") === "bone" ? eObjectType.BONE : eObjectType.SPRITE,
                this.parseInt(aElement, "obj", -1));
        }

        // -------------------------------------------------------------------------
        public getTimelineKey(aElement: any, aIndex: number, aSpriter: Spriter): TimelineKey {
            var time = this.parseInt(aElement, "time");
            var spin = this.parseInt(aElement, "spin", 1);

            // curve and params
            var curve = this.parseString(aElement, "curve_type", "linear");
            var c1 = this.parseFloat(aElement, "c1", 0);
            var c2 = this.parseFloat(aElement, "c2", 0);
            var c3 = this.parseFloat(aElement, "c3", 0);
            var c4 = this.parseFloat(aElement, "c4", 0);

            // sprite or bone key?
            var boneTag = this.translateChildElementName("bone");
            var objectTag = this.translateChildElementName("object");

            var key: TimelineKey = null;
            var keyDataElm = null;

            var sprite: boolean = false;

            if (aElement[boneTag] !== undefined) {
                keyDataElm = aElement[boneTag];
                key = new BoneTimelineKey(aIndex, time, spin);
                this.setMinDefsToElementName("bone");
            } else if (aElement[objectTag] !== undefined) {
                keyDataElm = aElement[objectTag];
                key = new ObjectTimelineKey(aIndex, time, spin);
                this.setMinDefsToElementName("object");
                sprite = true;
            }

            // other curve than linear?
            if (curve !== "linear") {
                key.setCurve(CurveType.getCurveTypeForName(curve), c1, c2, c3, c4);
            }

            // spatial info
            var info = (<SpatialTimelineKey>key).info;

            info.x = this.parseFloat(keyDataElm, "x");
            info.y = -this.parseFloat(keyDataElm, "y");
            info.scaleX = this.parseFloat(keyDataElm, "scale_x", 1);
            info.scaleY = this.parseFloat(keyDataElm, "scale_y", 1);
            info.angle = 360 - this.parseFloat(keyDataElm, "angle");
            info.alpha = this.parseFloat(keyDataElm, "a", 1);

            if (sprite) {
                // sprite specific - set file and folder
                var folderId = this.parseInt(keyDataElm, "folder");
                var fileId = this.parseInt(keyDataElm, "file");
                (<ObjectTimelineKey>key).setFolderAndFile(folderId, fileId);
                // set pivot in spatial info different from default (based on pivot in file)
                var file = aSpriter.getFolderById(folderId).getFileById(fileId);
                info.pivotX = this.parseFloat(keyDataElm, "pivot_x", file.anchorX);
                // 1 - to flip Y, default anchor is already flipped, so it needs to be flipped back to avoid double flipping
                info.pivotY = 1 - this.parseFloat(keyDataElm, "pivot_y", 1 - file.anchorY);
            }

            this.popMinDefsStack();

            return key;
        }
    }
}
