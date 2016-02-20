module Spriter {

    export class NodeListBin implements ISpriterNodeList {

        private _file: SpriterBin;
        private _nodeList: number[];

        // -------------------------------------------------------------------------
        constructor(spriterBinFile: SpriterBin, nodeList: number[]) {
            this._file = spriterBinFile;
            this._nodeList = nodeList;
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
        public getChildNodes(index: number, elementName: string): ISpriterNodeList {
            return this._file.getNodesForElement(this._nodeList[index], elementName);
        }

        // -------------------------------------------------------------------------
        public getFolder(index: number): Folder {
            return this._file.getFolder(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getFile(index: number): File {
            return this._file.getFile(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getTag(index: number): Item {
            return this._file.getTag(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getEntity(index: number): Entity {
            return this._file.getEntity(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getObjectInfo(index: number): ObjectInfo {
            return this._file.getObjectInfo(this._nodeList[index], index);
        }

        // -------------------------------------------------------------------------
        public getCharMap(index: number): CharMap {
            return this._file.getCharMap(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getCharMapEntry(index: number, charMap: CharMap, spriter: Spriter): void {
            this._file.getCharMapEntry(this._nodeList[index], charMap, spriter);
        }

        // -------------------------------------------------------------------------
        public getVariable(index: number): Variable {
            return this._file.getVariable(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getAnimation(index: number): Animation {
            return this._file.getAnimation(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getMainline(index: number): Baseline {
            return this._file.getBaseline(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getMainlineKey(index: number): KeyMainline {
            return this._file.getMainlineKey(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getRef(index: number): Ref {
            return this._file.getRef(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getTimeline(index: number): Timeline {
            return this._file.getTimeline(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getSoundline(index: number): Baseline {
            return this._file.getBaseline(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getEventline(index: number): Baseline {
            return this._file.getBaseline(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getTagline(index: number): Baseline {
            return this._file.getBaseline(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getVarline(index: number): Varline {
            return this._file.getVarline(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getKey(index: number): Key {
            return this._file.getKey(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getTagKey(index: number): KeyTag {
            return this._file.getTagKey(this._nodeList[index]);
        }

        // -------------------------------------------------------------------------
        public getVariableKey(index: number, type: eVariableType): KeyVariable {
            return this._file.getVariableKey(this._nodeList[index], type);
        }

        // -------------------------------------------------------------------------
        public getTimelineKey(index: number, spriter: Spriter): KeyTimeline {
            return this._file.getTimelineKey(this._nodeList[index], index, spriter);
        }

        // -------------------------------------------------------------------------
        public getTagChanges(spriter: Spriter): number {
            var tags = 0;

            for (var i = 0; i < this.length(); i++) {
                var tagIndex = this._file.getTagChange(this._nodeList[i]);
                tags |= (1 << tagIndex);
            }

            return tags;
        }
    }
}
