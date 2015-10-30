module Spriter {

    export class NodeListJSON implements ISpriterNodeList {

        private _file: SpriterJSON;
        private _nodeList: any;

        // -------------------------------------------------------------------------
        constructor(aSpriterJSON: SpriterJSON, aNodeList: any) {
            this._file = aSpriterJSON;
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
        private getNode(aIndex): any {
            if (Array.isArray(this._nodeList)) {
                return this._nodeList[aIndex];
            } else {
                return this._nodeList;
            }
        }

        // -------------------------------------------------------------------------
        public getChildNodes(aIndex: number, aElementName: string): ISpriterNodeList {
            return this._file.getNodesForElement(this.getNode(aIndex), aElementName);
        }

        // -------------------------------------------------------------------------
        public getFolder(aIndex: number): Folder {
            return this._file.getFolder(this.getNode(aIndex));
        }

        // -------------------------------------------------------------------------
        public getFile(aIndex: number): File {
            return this._file.getFile(this.getNode(aIndex));
        }

        // -------------------------------------------------------------------------
        public getEntity(aIndex: number): Entity {
            return this._file.getEntity(this.getNode(aIndex));
        }

        // -------------------------------------------------------------------------
        public getObjectInfo(aIndex: number): ObjectInfo {
            return this._file.getObjectInfo(this.getNode(aIndex), aIndex);
        }

        // -------------------------------------------------------------------------
        public getAnimation(aIndex: number): Animation {
            return this._file.getAnimation(this.getNode(aIndex));
        }

        // -------------------------------------------------------------------------
        public getMainLineKey(aIndex: number): MainLineKey {
            return this._file.getMainLineKey(this.getNode(aIndex));
        }

        // -------------------------------------------------------------------------
        public getRef(aIndex: number): Ref {
            return this._file.getRef(this.getNode(aIndex));
        }

        // -------------------------------------------------------------------------
        public getTimeline(aIndex: number): Timeline {
            return this._file.getTimeline(this.getNode(aIndex));
        }

        // -------------------------------------------------------------------------
        public getTimelineKey(aIndex: number, aSpriter: Spriter): TimelineKey {
            return this._file.getTimelineKey(this.getNode(aIndex), aIndex, aSpriter);
        }
    }
}
