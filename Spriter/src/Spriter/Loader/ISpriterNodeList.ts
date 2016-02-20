module Spriter {

    export interface ISpriterNodeList {

        length(): number;
        processed(): void;

        getChildNodes(index: number, elementName: string): ISpriterNodeList;

        getFolder(index: number): Folder;
        getFile(index: number): File;
        getTag(index: number): Item;
        getEntity(index: number): Entity;
        getObjectInfo(index: number): ObjectInfo;
        getCharMap(index: number): CharMap;
        getCharMapEntry(index: number, charMap: CharMap, spriter: Spriter): void;
        getVariable(index): Variable;
        getAnimation(index: number): Animation;
        getMainline(index: number): Baseline;
        getMainlineKey(index: number): KeyMainline;
        getRef(index: number): Ref;
        getTimeline(index: number): Timeline;
        getSoundline(index: number): Baseline;
        getEventline(index: number): Baseline;
        getTagline(index: number): Baseline;
        getVarline(index: number): Varline;
        getKey(index: number): Key;
        getTagKey(index: number): KeyTag;
        getVariableKey(index: number, type: eVariableType): KeyVariable;
        getTimelineKey(index: number, spriter: Spriter): KeyTimeline;
        getTagChanges(spriter: Spriter): number;
    }
}
