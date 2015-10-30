module Spriter {

    export class NodeListBin implements ISpriterNodeList {

        private _file: SpriterBin;
        private _nodeList: number[];

        // -------------------------------------------------------------------------
        constructor(aSpriterBin: SpriterBin, aNodeList: number[]) {
            this._file = aSpriterBin;
            this._nodeList = aNodeList;
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
        public getChildNodes(aIndex: number, aElementName: string): ISpriterNodeList {
            return this._file.getNodesForElement(this._nodeList[aIndex], aElementName);
        }

        // -------------------------------------------------------------------------
        public getFolder(aIndex: number): Folder {
            return this._file.getFolder(this._nodeList[aIndex]);
        }

        // -------------------------------------------------------------------------
        public getFile(aIndex: number): File {
            return this._file.getFile(this._nodeList[aIndex]);
        }

        // -------------------------------------------------------------------------
        public getEntity(aIndex: number): Entity {
            return this._file.getEntity(this._nodeList[aIndex]);
        }

        // -------------------------------------------------------------------------
        public getObjectInfo(aIndex: number): ObjectInfo {
            return this._file.getObjectInfo(this._nodeList[aIndex], aIndex);
        }

        // -------------------------------------------------------------------------
        public getAnimation(aIndex: number): Animation {
            return this._file.getAnimation(this._nodeList[aIndex]);
        }

        // -------------------------------------------------------------------------
        public getMainLineKey(aIndex: number): MainLineKey {
            return this._file.getMainLineKey(this._nodeList[aIndex]);
        }

        // -------------------------------------------------------------------------
        public getRef(aIndex: number): Ref {
            return this._file.getRef(this._nodeList[aIndex]);
        }

        // -------------------------------------------------------------------------
        public getTimeline(aIndex: number): Timeline {
            return this._file.getTimeline(this._nodeList[aIndex]);
        }

        // -------------------------------------------------------------------------
        public getTimelineKey(aIndex: number, aSpriter: Spriter): TimelineKey {
            return this._file.getTimelineKey(this._nodeList[aIndex], aIndex, aSpriter);
        }
    }
}
