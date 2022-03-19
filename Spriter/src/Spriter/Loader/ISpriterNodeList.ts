import { Spriter }       from "../Spriter";
import { Animation }     from "../Structure/Animation";
import { Baseline }      from "../Structure/Baseline";
import { CharMap }       from "../Structure/CharMap";
import { Entity }        from "../Structure/Entity";
import { File }          from "../Structure/File";
import { Folder }        from "../Structure/Folder";
import { Item }          from "../Structure/Item";
import { Key }           from "../Structure/Key";
import { KeyMainline }   from "../Structure/KeyMainline";
import { KeyTag }        from "../Structure/KeyTag";
import { KeyTimeline }   from "../Structure/KeyTimeline";
import { KeyVariable }   from "../Structure/KeyVariable";
import { ObjectInfo }    from "../Structure/ObjectInfo";
import { Ref }           from "../Structure/Ref";
import { Timeline }      from "../Structure/Timeline";
import { eVariableType } from "../Structure/Types";
import { Variable }      from "../Structure/Variable";
import { Varline }       from "../Structure/Varline";

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
