/// <reference path="SpriterFile.ts" />

module Spriter {

    export class SpriterJSON extends SpriterFile {

        private _json: any;

        // -------------------------------------------------------------------------
        constructor(JSONData: any, minDefs: any = null) {
            super();

            this._json = JSONData;

            var minimized = JSONData["min"] !== undefined;
            this.setMinimized(minimized, minDefs);
        }

        // -------------------------------------------------------------------------
        public getType(): eFileType {
            return eFileType.JSON;
        }

        // -------------------------------------------------------------------------
        private parseInt(element: any, attributeName: string, defaultValue: number = 0): number {
            var value = element[this.translateAttributeName(attributeName)];
            if (value === undefined) {
                return defaultValue;
            }

            return typeof (value) === "number" ? value : parseInt(value);
        }

        // -------------------------------------------------------------------------
        protected parseFloat(element: any, attributeName: string, defaultValue: number = 0): number {
            var value = element[this.translateAttributeName(attributeName)];
            if (value === undefined) {
                return defaultValue;
            }

            return typeof (value) === "number" ? value : parseFloat(value);
        }

        // -------------------------------------------------------------------------
        protected parseBoolean(element: any, attributeName: string, defaultValue: boolean = false): boolean {
            var value = element[this.translateAttributeName(attributeName)];
            if (value === undefined) {
                return defaultValue;
            }

            return typeof (value) === "boolean" ? value : (value === "true");
        }

        // -------------------------------------------------------------------------
        protected parseString(element: any, attributeName: string, defaultValue: string = ""): string {
            var value = element[this.translateAttributeName(attributeName)];
            return value === undefined ? defaultValue : value;
        }

        // -------------------------------------------------------------------------
        public getNodes(nodeName: string): ISpriterNodeList {
            this.setMinDefsToElementName(nodeName);
            var translatedName = this.translateElementName(nodeName);

            return new NodeListJSON(this, (this._json[translatedName] !== undefined) ? this._json[translatedName] : []);
        }

        // -------------------------------------------------------------------------
        public getNodesForElement(element: any, nodeName: string): ISpriterNodeList {
            this.setMinDefsToElementName(nodeName);
            var translatedName = this.translateElementName(nodeName);

            return new NodeListJSON(this, (element[translatedName] !== undefined) ? element[translatedName] : []);
        }

        // -------------------------------------------------------------------------
        public getFolder(element: any): Folder {
            return new Folder(
                this.parseInt(element, "id"),
                this.parseString(element, "name"));
        }

        // -------------------------------------------------------------------------
        public getFile(element: any): File {
            if (element["type"] !== undefined && element["type"] === "sound") {
                return null;
            }

            return new File(
                this.parseInt(element, "id"),
                this.getFileNameWithoutExtension(this.parseString(element, "name")),
                this.parseFloat(element, "pivot_x"),
                1 - this.parseFloat(element, "pivot_y"));
        }

        // -------------------------------------------------------------------------
        public getTag(element: number): Item {
            console.error("implement loading Tag");
            return null;
        }

        // -------------------------------------------------------------------------
        public getEntity(element: any): Entity {
            return new Entity(
                this.parseInt(element, "id"),
                this.parseString(element, "name"));
        }

        // -------------------------------------------------------------------------
        public getObjectInfo(element: any, index: number): ObjectInfo {
            return new ObjectInfo(
                index,
                this.parseString(element, "name"),
                Types.getObjectTypeForName(this.parseString(element, "type")),
                this.parseFloat(element, "w"),
                this.parseFloat(element, "h"),
                this.parseFloat(element, "pivot_x"),
                this.parseFloat(element, "pivot_y"));
        }

        // -------------------------------------------------------------------------
        public getCharMap(element: any): CharMap {
            return new CharMap(
                this.parseInt(element, "id"),
                this.parseString(element, "name"));
        }

        // -------------------------------------------------------------------------
        public getCharMapEntry(element: any, charMap: CharMap, spriter: Spriter): void {
            var sourceName = spriter.getFolderById(this.parseInt(element, "folder")).
                getFileById(this.parseInt(element, "file")).name;

            var target: File = null;
            if (element["target_folder"] !== undefined && element["target_file"] !== undefined) {
                target = spriter.getFolderById(this.parseInt(element, "target_folder")).
                    getFileById(this.parseInt(element, "target_file"));
            }

            charMap.put(sourceName, target);
        }

        // -------------------------------------------------------------------------
        public getVariable(element: any): Variable {
            var type = Types.getVariableTypeForName(this.parseString(element, "type"));
            return new Variable(
                this.parseInt(element, "id"),
                this.parseString(element, "name"),
                type,
                (type === eVariableType.STRING) ? this.parseString(element, "default") : this.parseFloat(element, "default", 0)
            );
        }

        // -------------------------------------------------------------------------
        public getAnimation(element: any): Animation {
            return new Animation(
                this.parseInt(element, "id"),
                this.parseString(element, "name"),
                this.parseFloat(element, "length"),
                this.parseBoolean(element, "looping", true) === true ? eAnimationLooping.LOOPING : eAnimationLooping.NO_LOOPING
            );
        }

        // -------------------------------------------------------------------------
        public getMainlineKey(element: any): KeyMainline {
            return new KeyMainline(
                this.parseInt(element, "id"),
                this.parseFloat(element, "time")
            );
        }

        // -------------------------------------------------------------------------
        public getRef(element: any): Ref {
            return new Ref(
                this.parseInt(element, "id"),
                this.parseInt(element, "parent", -1),
                this.parseInt(element, "timeline"),
                this.parseInt(element, "key"),
                this.parseInt(element, "z_index"));
        }

        // -------------------------------------------------------------------------
        public getTimeline(element: any): Timeline {
            return new Timeline(
                this.parseInt(element, "id"),
                this.parseString(element, "name"),
                Types.getObjectTypeForName(this.parseString(element, "object_type", "sprite")),
                this.parseInt(element, "obj", -1));
        }

        // -------------------------------------------------------------------------
        public getBaseline(element: any): Baseline {
            return new Baseline(
                this.parseInt(element, "id"),
                this.parseString(element, "name", null));
        }

        // -------------------------------------------------------------------------
        public getVarline(element: any): Varline {
            return new Varline(
                this.parseInt(element, "id"),
                this.parseInt(element, "def"));
        }

        // -------------------------------------------------------------------------
        public getKey(element: any): Key {
            return new Key(
                this.parseInt(element, "id"),
                this.parseInt(element, "time"));
        }

        // -------------------------------------------------------------------------
        public getTagKey(element: any): KeyTag {
            return new KeyTag(
                this.parseInt(element, "id"),
                this.parseInt(element, "time"));
        }

        // -------------------------------------------------------------------------
        public getVariableKey(element: any, type: eVariableType): KeyVariable {
            return new KeyVariable(
                this.parseInt(element, "id"),
                this.parseInt(element, "time"),
                (type === eVariableType.STRING) ? this.parseString(element, "val") : this.parseFloat(element, "val")
            );
        }

        // -------------------------------------------------------------------------
        public getTimelineKey(element: any, index: number, spriter: Spriter): KeyTimeline {
            var time = this.parseInt(element, "time");
            var spin = this.parseInt(element, "spin", 1);

            // curve and params
            var curve = this.parseString(element, "curve_type", "linear");
            var c1 = this.parseFloat(element, "c1", 0);
            var c2 = this.parseFloat(element, "c2", 0);
            var c3 = this.parseFloat(element, "c3", 0);
            var c4 = this.parseFloat(element, "c4", 0);

            // sprite or bone key?
            var boneTag = this.translateChildElementName("bone");
            var objectTag = this.translateChildElementName("object");

            var key: KeyTimeline = null;
            var keyDataElm = null;

            var sprite: boolean = false;

            if (element[boneTag] !== undefined) {
                keyDataElm = element[boneTag];
                key = new KeyBone(index, time, spin);
                this.setMinDefsToElementName("bone");
            } else if (element[objectTag] !== undefined) {
                keyDataElm = element[objectTag];
                key = new KeyObject(index, time, spin);
                this.setMinDefsToElementName("object");
                sprite = true;
            }

            // other curve than linear?
            if (curve !== "linear") {
                key.setCurve(Types.getCurveTypeForName(curve), c1, c2, c3, c4);
            }

            // spatial info
            var info = key.info;

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
                (<KeyObject>key).setFolderAndFile(folderId, fileId);
                // set pivot in spatial info different from default (based on pivot in file)
                var file = spriter.getFolderById(folderId).getFileById(fileId);
                info.pivotX = this.parseFloat(keyDataElm, "pivot_x", file.pivotX);
                // 1 - to flip Y, default anchor is already flipped, so it needs to be flipped back to avoid double flipping
                info.pivotY = 1 - this.parseFloat(keyDataElm, "pivot_y", 1 - file.pivotY);
            }

            this.popMinDefsStack();

            return key;
        }

        // -------------------------------------------------------------------------
        public getTagChange(element: any): number {
            return this.parseInt(element, "t");
        }
    }
}
