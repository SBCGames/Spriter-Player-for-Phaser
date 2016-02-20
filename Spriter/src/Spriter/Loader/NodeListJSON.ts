module Spriter {

    export class NodeListJSON implements ISpriterNodeList {

        private _file: SpriterJSON;
        private _nodeList: any;

        // -------------------------------------------------------------------------
        constructor(spriterJSONFile: SpriterJSON, nodeList: any) {
            this._file = spriterJSONFile;
            this._nodeList = nodeList;

            if (!Array.isArray(nodeList)) {
                nodeList.length = 1;
            }
        }

        // -------------------------------------------------------------------------
        public length(): number {
            return this._nodeList.length;
        }

        // -------------------------------------------------------------------------
        public processed(): void {
            this._file.processed();
        }

        // -------------------------------------------------------------------------
        private getNode(index): any {
            if (Array.isArray(this._nodeList)) {
                return this._nodeList[index];
            } else {
                return this._nodeList;
            }
        }

        // -------------------------------------------------------------------------
        public getChildNodes(index: number, elementName: string): ISpriterNodeList {
            return this._file.getNodesForElement(this.getNode(index), elementName);
        }

        // -------------------------------------------------------------------------
        public getFolder(index: number): Folder {
            return this._file.getFolder(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getFile(index: number): File {
            return this._file.getFile(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getTag(index: number): Item {
            return this._file.getTag(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getEntity(index: number): Entity {
            return this._file.getEntity(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getObjectInfo(index: number): ObjectInfo {
            return this._file.getObjectInfo(this.getNode(index), index);
        }

        // -------------------------------------------------------------------------
        public getCharMap(index: number): CharMap {
            return this._file.getCharMap(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getCharMapEntry(index: number, charMap: CharMap, spriter: Spriter): void {
            this._file.getCharMapEntry(this.getNode(index), charMap, spriter);
        }

        // -------------------------------------------------------------------------
        public getVariable(index: number): Variable {
            return this._file.getVariable(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getAnimation(index: number): Animation {
            return this._file.getAnimation(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getMainline(index: number): Baseline {
            return this._file.getBaseline(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getMainlineKey(index: number): KeyMainline {
            return this._file.getMainlineKey(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getRef(index: number): Ref {
            return this._file.getRef(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getTimeline(index: number): Timeline {
            return this._file.getTimeline(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getSoundline(index: number): Baseline {
            return this._file.getBaseline(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getEventline(index: number): Baseline {
            return this._file.getBaseline(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getTagline(index: number): Baseline {
            return this._file.getBaseline(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getVarline(index: number): Varline {
            return this._file.getVarline(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getKey(index: number): Key {
            return this._file.getKey(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getTagKey(index: number): KeyTag {
            return this._file.getTagKey(this.getNode(index));
        }

        // -------------------------------------------------------------------------
        public getVariableKey(index: number, type: eVariableType): KeyVariable {
            return this._file.getVariableKey(this.getNode(index), type);
        }

        // -------------------------------------------------------------------------
        public getTimelineKey(index: number, spriter: Spriter): KeyTimeline {
            return this._file.getTimelineKey(this.getNode(index), index, spriter);
        }

        // -------------------------------------------------------------------------
        public getTagChanges(spriter: Spriter): number {
            var tags = 0;

            for (var i = 0; i < this.length(); i++) {
                var tagIndex = this._file.getTagChange(this.getNode(i));
                tags |= (1 << tagIndex);
            }

            return tags;
        }
    }
}
