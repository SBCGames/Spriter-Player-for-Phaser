module Spriter {

    export class NodeListXml implements ISpriterNodeList {

        private _file: SpriterXml;
        private _nodeList: NodeList;

        // -------------------------------------------------------------------------
        constructor(aSpriterXml: SpriterXml, aNodeList: NodeList) {
            this._file = aSpriterXml;
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
            return this._file.getNodesForElement(<Element>this._nodeList.item(aIndex), aElementName);
        }

        // -------------------------------------------------------------------------
        public getFolder(aIndex: number): Folder {
            return this._file.getFolder(<Element>this._nodeList.item(aIndex));
        }

        // -------------------------------------------------------------------------
        public getFile(aIndex: number): File {
            return this._file.getFile(<Element>this._nodeList.item(aIndex));
        }

        // -------------------------------------------------------------------------
        public getEntity(aIndex: number): Entity {
            return this._file.getEntity(<Element>this._nodeList.item(aIndex));
        }

        // -------------------------------------------------------------------------
        public getObjectInfo(aIndex: number): ObjectInfo {
            return this._file.getObjectInfo(<Element>this._nodeList.item(aIndex), aIndex);
        }

        // -------------------------------------------------------------------------
        public getAnimation(aIndex: number): Animation {
            return this._file.getAnimation(<Element>this._nodeList.item(aIndex));
        }

        // -------------------------------------------------------------------------
        public getMainLineKey(aIndex: number): MainLineKey {
            return this._file.getMainLineKey(<Element>this._nodeList.item(aIndex));
        }

        // -------------------------------------------------------------------------
        public getRef(aIndex: number): Ref {
            return this._file.getRef(<Element>this._nodeList.item(aIndex));
        }

        // -------------------------------------------------------------------------
        public getTimeline(aIndex: number): Timeline {
            return this._file.getTimeline(<Element>this._nodeList.item(aIndex));
        }

        // -------------------------------------------------------------------------
        public getTimelineKey(aIndex: number, aSpriter: Spriter): TimelineKey {
            return this._file.getTimelineKey(<Element>this._nodeList.item(aIndex), aIndex, aSpriter);
        }
    }
}
