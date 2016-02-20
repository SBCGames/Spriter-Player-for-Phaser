/// <reference path="SpriterFile.ts" />

module Spriter {

    export class SpriterXml extends SpriterFile {

        private _xml: XMLDocument;

        // -------------------------------------------------------------------------
        constructor(xmlData: XMLDocument, minDefs: any = null) {
            super();

            this._xml = xmlData;

            var minimized = xmlData.documentElement.hasAttribute("min");
            this.setMinimized(minimized, minDefs);
        }

        // -------------------------------------------------------------------------
        public getType(): eFileType {
            return eFileType.XML;
        }

        // -------------------------------------------------------------------------
        private parseInt(element: Element, attributeName: string, defaultValue: number = 0): number {
            var value = element.getAttribute(this.translateAttributeName(attributeName));
            return value !== null ? parseInt(value) : defaultValue;
        }

        // -------------------------------------------------------------------------
        protected parseFloat(element: Element, attributeName: string, defaultValue: number = 0): number {
            var value = element.getAttribute(this.translateAttributeName(attributeName));
            return value !== null ? parseFloat(value) : defaultValue;
        }

        // -------------------------------------------------------------------------
        protected parseString(element: Element, attributeName: string, defaultValue: string = ""): string {
            var value = element.getAttribute(this.translateAttributeName(attributeName));
            return value !== null ? value : defaultValue;
        }

        // -------------------------------------------------------------------------
        public getNodes(nodeName: string): ISpriterNodeList {
            this.setMinDefsToElementName(nodeName);
            var translatedName = this.translateElementName(nodeName);

            return new NodeListXml(this, this._xml.documentElement.getElementsByTagName(translatedName));
        }

        // -------------------------------------------------------------------------
        public getNodesForElement(element: Element, nodeName: string): ISpriterNodeList {
            this.setMinDefsToElementName(nodeName);
            var translatedName = this.translateElementName(nodeName);

            return new NodeListXml(this, element.getElementsByTagName(translatedName));
        }

        // -------------------------------------------------------------------------
        public getFolder(element: Element): Folder {
            return new Folder(
                this.parseInt(element, "id"),
                this.parseString(element, "name"));
        }

        // -------------------------------------------------------------------------
        public getFile(element: Element): File {
            if (element.hasAttribute("type") && element.getAttribute("type") === "sound") {
                return null;
            }

            return new File(
                this.parseInt(element, "id"),
                this.getFileNameWithoutExtension(this.parseString(element, "name")),
                this.parseFloat(element, "pivot_x"),
                1 - this.parseFloat(element, "pivot_y"));
        }

        // -------------------------------------------------------------------------
        public getTag(element: Element): Item {
            return new Item(
                this.parseInt(element, "id"),
                this.parseString(element, "name"));
        }

        // -------------------------------------------------------------------------
        public getEntity(element: Element): Entity {
            return new Entity(
                this.parseInt(element, "id"),
                this.parseString(element, "name"));
        }

        // -------------------------------------------------------------------------
        public getObjectInfo(element: Element, index: number): ObjectInfo {
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
        public getCharMap(element: Element): CharMap {
            return new CharMap(
                this.parseInt(element, "id"),
                this.parseString(element, "name"));
        }

        // -------------------------------------------------------------------------
        public getCharMapEntry(element: Element, charMap: CharMap, spriter: Spriter): void {
            var sourceName = spriter.getFolderById(this.parseInt(element, "folder")).
                getFileById(this.parseInt(element, "file")).name;

            var target: File = null;
            if (element.hasAttribute("target_folder") && element.hasAttribute("target_file")) {
                target = spriter.getFolderById(this.parseInt(element, "target_folder")).
                    getFileById(this.parseInt(element, "target_file"));
            }

            charMap.put(sourceName, target);
        }

        // -------------------------------------------------------------------------
        public getVariable(element: Element): Variable {
            var type = Types.getVariableTypeForName(this.parseString(element, "type"));
            return new Variable(
                this.parseInt(element, "id"),
                this.parseString(element, "name"),
                type,
                (type === eVariableType.STRING) ? this.parseString(element, "default") : this.parseFloat(element, "default", 0)
            );
        }

        // -------------------------------------------------------------------------
        public getAnimation(element: Element): Animation {
            return new Animation(
                this.parseInt(element, "id"),
                this.parseString(element, "name"),
                this.parseFloat(element, "length"),
                this.parseString(element, "looping", "true") === "true" ? eAnimationLooping.LOOPING : eAnimationLooping.NO_LOOPING
            );
        }

        // -------------------------------------------------------------------------
        public getMainlineKey(element: Element): KeyMainline {
            return new KeyMainline(
                this.parseInt(element, "id"),
                this.parseFloat(element, "time")
            );
        }

        // -------------------------------------------------------------------------
        public getRef(element: Element): Ref {
            return new Ref(
                this.parseInt(element, "id"),
                this.parseInt(element, "parent", -1),
                this.parseInt(element, "timeline"),
                this.parseInt(element, "key"),
                this.parseInt(element, "z_index"));
        }

        // -------------------------------------------------------------------------
        public getTimeline(element: Element): Timeline {
            return new Timeline(
                this.parseInt(element, "id"),
                this.parseString(element, "name"),
                Types.getObjectTypeForName(this.parseString(element, "object_type", "sprite")),
                this.parseInt(element, "obj", -1));
        }

        // -------------------------------------------------------------------------
        public getBaseline(element: Element): Baseline {
            return new Baseline(
                this.parseInt(element, "id"),
                this.parseString(element, "name", null));
        }

        // -------------------------------------------------------------------------
        public getVarline(element: Element): Varline {
            return new Varline(
                this.parseInt(element, "id"),
                this.parseInt(element, "def"));
        }

        // -------------------------------------------------------------------------
        public getKey(element: Element): Key {
            return new Key(
                this.parseInt(element, "id"),
                this.parseInt(element, "time"));
        }

        // -------------------------------------------------------------------------
        public getTagKey(element: Element): KeyTag {
            return new KeyTag(
                this.parseInt(element, "id"),
                this.parseInt(element, "time"));
        }

        // -------------------------------------------------------------------------
        public getVariableKey(element: Element, type: eVariableType): KeyVariable {
            return new KeyVariable(
                this.parseInt(element, "id"),
                this.parseInt(element, "time"),
                (type === eVariableType.STRING) ? this.parseString(element, "val") : this.parseFloat(element, "val")
            );
        }
        
        // -------------------------------------------------------------------------
        public getTimelineKey(element: Element, index: number, spriter: Spriter): KeyTimeline {
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
            var keyDataElm = <Element>(element.firstElementChild);

            var sprite: boolean = false;

            if (keyDataElm.tagName === boneTag) {
                key = new KeyBone(index, time, spin);
                this.setMinDefsToElementName("bone");
            } else if (keyDataElm.tagName === objectTag) {
                this.setMinDefsToElementName("object");
                key = new KeyObject(index, time, spin);
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
        public getTagChange(element: Element): number {
            return this.parseInt(element, "t");
        }
    }
}
