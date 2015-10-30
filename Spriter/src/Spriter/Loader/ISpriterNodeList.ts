module Spriter {

    export interface ISpriterNodeList {

        length(): number;
        processed(): void;

        getChildNodes(aIndex: number, aElementName: string): ISpriterNodeList;

        getFolder(aIndex: number): Folder;
        getFile(aIndex: number): File;
        getEntity(aIndex: number): Entity;
        getObjectInfo(aIndex: number): ObjectInfo;
        getAnimation(aIndex: number): Animation;
        getMainLineKey(aIndex: number): MainLineKey;
        getRef(aIndex: number): Ref;
        getTimeline(aIndex: number): Timeline;
        getTimelineKey(aIndex: number, aSpriter: Spriter): TimelineKey;
    }
}
