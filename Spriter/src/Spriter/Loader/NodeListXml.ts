import { Spriter }          from "../Spriter";
import { Animation }        from "../Structure/Animation";
import { Baseline }         from "../Structure/Baseline";
import { CharMap }          from "../Structure/CharMap";
import { Entity }           from "../Structure/Entity";
import { File }             from "../Structure/File";
import { Folder }           from "../Structure/Folder";
import { Item }             from "../Structure/Item";
import { Key }              from "../Structure/Key";
import { KeyMainline }      from "../Structure/KeyMainline";
import { KeyTag }           from "../Structure/KeyTag";
import { KeyTimeline }      from "../Structure/KeyTimeline";
import { KeyVariable }      from "../Structure/KeyVariable";
import { ObjectInfo }       from "../Structure/ObjectInfo";
import { Ref }              from "../Structure/Ref";
import { Timeline }         from "../Structure/Timeline";
import { eVariableType }    from "../Structure/Types";
import { Variable }         from "../Structure/Variable";
import { Varline }          from "../Structure/Varline";
import { ISpriterNodeList } from "./ISpriterNodeList";
import { SpriterXml }       from "./SpriterXml";

export class NodeListXml implements ISpriterNodeList {

    private _file: SpriterXml;
    private _nodeList: HTMLCollectionOf<Element>; //NodeList;

    // -------------------------------------------------------------------------
    constructor(spriterXmlFile: SpriterXml, nodeList: HTMLCollectionOf<Element> /*NodeList*/) {
        this._file = spriterXmlFile;
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
        return this._file.getNodesForElement(<Element>this._nodeList.item(index), elementName);
    }

    // -------------------------------------------------------------------------
    public getFolder(index: number): Folder {
        return this._file.getFolder(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getFile(index: number): File {
        return this._file.getFile(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getTag(index: number): Item {
        return this._file.getTag(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getEntity(index: number): Entity {
        return this._file.getEntity(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getObjectInfo(index: number): ObjectInfo {
        return this._file.getObjectInfo(<Element>this._nodeList.item(index), index);
    }

    // -------------------------------------------------------------------------
    public getCharMap(index: number): CharMap {
        return this._file.getCharMap(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getCharMapEntry(index: number, charMap: CharMap, spriter: Spriter): void {
        this._file.getCharMapEntry(<Element>this._nodeList.item(index), charMap, spriter);
    }

    // -------------------------------------------------------------------------
    public getVariable(index: number): Variable {
        return this._file.getVariable(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getAnimation(index: number): Animation {
        return this._file.getAnimation(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getMainline(index: number): Baseline {
        return this._file.getBaseline(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getMainlineKey(index: number): KeyMainline {
        return this._file.getMainlineKey(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getRef(index: number): Ref {
        return this._file.getRef(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getTimeline(index: number): Timeline {
        return this._file.getTimeline(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getSoundline(index: number): Baseline {
        return this._file.getBaseline(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getEventline(index: number): Baseline {
        return this._file.getBaseline(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getTagline(index: number): Baseline {
        return this._file.getBaseline(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getVarline(index: number): Varline {
        return this._file.getVarline(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getKey(index: number): Key {
        return this._file.getKey(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getTagKey(index: number): KeyTag {
        return this._file.getTagKey(<Element>this._nodeList.item(index));
    }

    // -------------------------------------------------------------------------
    public getVariableKey(index: number, type: eVariableType): KeyVariable {
        return this._file.getVariableKey(<Element>this._nodeList.item(index), type);
    }

    // -------------------------------------------------------------------------
    public getTimelineKey(index: number, spriter: Spriter): KeyTimeline {
        return this._file.getTimelineKey(<Element>this._nodeList.item(index), index, spriter);
    }

    // -------------------------------------------------------------------------
    public getTagChanges(spriter: Spriter): number {
        var tags = 0;

        for (var i = 0; i < this.length(); i++) {
            var tagIndex = this._file.getTagChange(<Element>this._nodeList.item(i));
            tags |= (1 << tagIndex);
        }

        return tags;
    }
}
