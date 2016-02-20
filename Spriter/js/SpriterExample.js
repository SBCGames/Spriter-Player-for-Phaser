var Spriter;
(function (Spriter) {
    var IdNameMap = (function () {
        function IdNameMap() {
            this._items = [];
            this._itemNames = []; // keys are names and returned value is index into _tems array
        }
        // -------------------------------------------------------------------------
        IdNameMap.prototype.add = function (item, id, name) {
            if (id === undefined) {
                id = this._items.length;
            }
            if (name === undefined || name === null) {
                name = "item_" + id;
            }
            this._items[id] = item;
            this._itemNames[name] = id;
        };
        // -------------------------------------------------------------------------
        IdNameMap.prototype.getById = function (id) {
            return this._items[id];
        };
        // -------------------------------------------------------------------------
        IdNameMap.prototype.getByName = function (name) {
            var id = this._itemNames[name];
            // TODO remove
            if (typeof id !== "number") {
                console.warn("item " + name + "  not found!");
            }
            return (typeof id === "number") ? this._items[id] : null;
        };
        Object.defineProperty(IdNameMap.prototype, "length", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._items.length;
            },
            enumerable: true,
            configurable: true
        });
        return IdNameMap;
    })();
    Spriter.IdNameMap = IdNameMap;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var NodeListBin = (function () {
        // -------------------------------------------------------------------------
        function NodeListBin(spriterBinFile, nodeList) {
            this._file = spriterBinFile;
            this._nodeList = nodeList;
        }
        // -------------------------------------------------------------------------
        NodeListBin.prototype.length = function () {
            return this._nodeList.length;
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.processed = function () {
            this._file.processed();
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getChildNodes = function (index, elementName) {
            return this._file.getNodesForElement(this._nodeList[index], elementName);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getFolder = function (index) {
            return this._file.getFolder(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getFile = function (index) {
            return this._file.getFile(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getTag = function (index) {
            return this._file.getTag(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getEntity = function (index) {
            return this._file.getEntity(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getObjectInfo = function (index) {
            return this._file.getObjectInfo(this._nodeList[index], index);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getCharMap = function (index) {
            return this._file.getCharMap(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getCharMapEntry = function (index, charMap, spriter) {
            this._file.getCharMapEntry(this._nodeList[index], charMap, spriter);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getVariable = function (index) {
            return this._file.getVariable(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getAnimation = function (index) {
            return this._file.getAnimation(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getMainline = function (index) {
            return this._file.getBaseline(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getMainlineKey = function (index) {
            return this._file.getMainlineKey(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getRef = function (index) {
            return this._file.getRef(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getTimeline = function (index) {
            return this._file.getTimeline(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getSoundline = function (index) {
            return this._file.getBaseline(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getEventline = function (index) {
            return this._file.getBaseline(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getTagline = function (index) {
            return this._file.getBaseline(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getVarline = function (index) {
            return this._file.getVarline(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getKey = function (index) {
            return this._file.getKey(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getTagKey = function (index) {
            return this._file.getTagKey(this._nodeList[index]);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getVariableKey = function (index, type) {
            return this._file.getVariableKey(this._nodeList[index], type);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getTimelineKey = function (index, spriter) {
            return this._file.getTimelineKey(this._nodeList[index], index, spriter);
        };
        // -------------------------------------------------------------------------
        NodeListBin.prototype.getTagChanges = function (spriter) {
            var tags = 0;
            for (var i = 0; i < this.length(); i++) {
                var tagIndex = this._file.getTagChange(this._nodeList[i]);
                tags |= (1 << tagIndex);
            }
            return tags;
        };
        return NodeListBin;
    })();
    Spriter.NodeListBin = NodeListBin;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var NodeListJSON = (function () {
        // -------------------------------------------------------------------------
        function NodeListJSON(spriterJSONFile, nodeList) {
            this._file = spriterJSONFile;
            this._nodeList = nodeList;
            if (!Array.isArray(nodeList)) {
                nodeList.length = 1;
            }
        }
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.length = function () {
            return this._nodeList.length;
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.processed = function () {
            this._file.processed();
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getNode = function (index) {
            if (Array.isArray(this._nodeList)) {
                return this._nodeList[index];
            }
            else {
                return this._nodeList;
            }
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getChildNodes = function (index, elementName) {
            return this._file.getNodesForElement(this.getNode(index), elementName);
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getFolder = function (index) {
            return this._file.getFolder(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getFile = function (index) {
            return this._file.getFile(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getTag = function (index) {
            return this._file.getTag(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getEntity = function (index) {
            return this._file.getEntity(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getObjectInfo = function (index) {
            return this._file.getObjectInfo(this.getNode(index), index);
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getCharMap = function (index) {
            return this._file.getCharMap(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getCharMapEntry = function (index, charMap, spriter) {
            this._file.getCharMapEntry(this.getNode(index), charMap, spriter);
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getVariable = function (index) {
            return this._file.getVariable(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getAnimation = function (index) {
            return this._file.getAnimation(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getMainline = function (index) {
            return this._file.getBaseline(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getMainlineKey = function (index) {
            return this._file.getMainlineKey(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getRef = function (index) {
            return this._file.getRef(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getTimeline = function (index) {
            return this._file.getTimeline(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getSoundline = function (index) {
            return this._file.getBaseline(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getEventline = function (index) {
            return this._file.getBaseline(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getTagline = function (index) {
            return this._file.getBaseline(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getVarline = function (index) {
            return this._file.getVarline(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getKey = function (index) {
            return this._file.getKey(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getTagKey = function (index) {
            return this._file.getTagKey(this.getNode(index));
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getVariableKey = function (index, type) {
            return this._file.getVariableKey(this.getNode(index), type);
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getTimelineKey = function (index, spriter) {
            return this._file.getTimelineKey(this.getNode(index), index, spriter);
        };
        // -------------------------------------------------------------------------
        NodeListJSON.prototype.getTagChanges = function (spriter) {
            var tags = 0;
            for (var i = 0; i < this.length(); i++) {
                var tagIndex = this._file.getTagChange(this.getNode(i));
                tags |= (1 << tagIndex);
            }
            return tags;
        };
        return NodeListJSON;
    })();
    Spriter.NodeListJSON = NodeListJSON;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var NodeListXml = (function () {
        // -------------------------------------------------------------------------
        function NodeListXml(spriterXmlFile, nodeList) {
            this._file = spriterXmlFile;
            this._nodeList = nodeList;
        }
        // -------------------------------------------------------------------------
        NodeListXml.prototype.length = function () {
            return this._nodeList.length;
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.processed = function () {
            this._file.processed();
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getChildNodes = function (index, elementName) {
            return this._file.getNodesForElement(this._nodeList.item(index), elementName);
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getFolder = function (index) {
            return this._file.getFolder(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getFile = function (index) {
            return this._file.getFile(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getTag = function (index) {
            return this._file.getTag(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getEntity = function (index) {
            return this._file.getEntity(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getObjectInfo = function (index) {
            return this._file.getObjectInfo(this._nodeList.item(index), index);
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getCharMap = function (index) {
            return this._file.getCharMap(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getCharMapEntry = function (index, charMap, spriter) {
            this._file.getCharMapEntry(this._nodeList.item(index), charMap, spriter);
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getVariable = function (index) {
            return this._file.getVariable(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getAnimation = function (index) {
            return this._file.getAnimation(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getMainline = function (index) {
            return this._file.getBaseline(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getMainlineKey = function (index) {
            return this._file.getMainlineKey(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getRef = function (index) {
            return this._file.getRef(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getTimeline = function (index) {
            return this._file.getTimeline(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getSoundline = function (index) {
            return this._file.getBaseline(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getEventline = function (index) {
            return this._file.getBaseline(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getTagline = function (index) {
            return this._file.getBaseline(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getVarline = function (index) {
            return this._file.getVarline(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getKey = function (index) {
            return this._file.getKey(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getTagKey = function (index) {
            return this._file.getTagKey(this._nodeList.item(index));
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getVariableKey = function (index, type) {
            return this._file.getVariableKey(this._nodeList.item(index), type);
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getTimelineKey = function (index, spriter) {
            return this._file.getTimelineKey(this._nodeList.item(index), index, spriter);
        };
        // -------------------------------------------------------------------------
        NodeListXml.prototype.getTagChanges = function (spriter) {
            var tags = 0;
            for (var i = 0; i < this.length(); i++) {
                var tagIndex = this._file.getTagChange(this._nodeList.item(i));
                tags |= (1 << tagIndex);
            }
            return tags;
        };
        return NodeListXml;
    })();
    Spriter.NodeListXml = NodeListXml;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    (function (eFileType) {
        eFileType[eFileType["XML"] = 0] = "XML";
        eFileType[eFileType["JSON"] = 1] = "JSON";
        eFileType[eFileType["BIN"] = 2] = "BIN";
    })(Spriter.eFileType || (Spriter.eFileType = {}));
    var eFileType = Spriter.eFileType;
    var SpriterFile = (function () {
        function SpriterFile() {
        }
        // -------------------------------------------------------------------------
        SpriterFile.prototype.processed = function () {
            this.popMinDefsStack();
        };
        // -------------------------------------------------------------------------
        SpriterFile.prototype.setMinimized = function (minimized, minDefs) {
            if (minDefs === void 0) { minDefs = null; }
            this._minimized = minimized;
            this._minDefs = minDefs;
            if (minimized) {
                this._minDefsStack = [];
                if (minDefs === null) {
                    console.error("Spriter file is minimized - you must provide object with name definitions");
                    return;
                }
            }
        };
        // -------------------------------------------------------------------------
        SpriterFile.prototype.getFileNameWithoutExtension = function (path) {
            var name = (path.split('\\').pop().split('/').pop().split('.'))[0];
            return name;
        };
        // -------------------------------------------------------------------------
        SpriterFile.prototype.translateElementName = function (elementName) {
            if (this._minimized) {
                if (this._minDefs["name"] !== elementName) {
                    console.warn("current definition is " + this._minDefs["name"]);
                    return elementName;
                }
                if (this._minDefs["minName"] !== null) {
                    elementName = this._minDefs["minName"];
                }
            }
            return elementName;
        };
        // -------------------------------------------------------------------------
        SpriterFile.prototype.translateChildElementName = function (elementName) {
            if (this._minimized && this._minDefs !== null) {
                var elements = this._minDefs["childElements"];
                if (elements !== null) {
                    elementName = elements[elementName] === null ? elementName : elements[elementName]["minName"];
                }
            }
            return elementName;
        };
        // -------------------------------------------------------------------------
        SpriterFile.prototype.translateAttributeName = function (attributeName) {
            if (this._minimized && this._minDefs !== null) {
                var attributes = this._minDefs["attributes"];
                if (attributes !== null) {
                    attributeName = attributes[attributeName] === null ? attributeName : attributes[attributeName];
                }
            }
            return attributeName;
        };
        // -------------------------------------------------------------------------
        SpriterFile.prototype.setMinDefsToElementName = function (tagName) {
            if (this._minimized) {
                // save current level of min defs
                this._minDefsStack.push(this._minDefs);
                // get child definition and set it as current
                var minDef = this._minDefs["childElements"][tagName];
                this._minDefs = minDef;
            }
        };
        // -------------------------------------------------------------------------
        SpriterFile.prototype.popMinDefsStack = function () {
            if (this._minimized) {
                this._minDefs = this._minDefsStack.pop();
            }
        };
        return SpriterFile;
    })();
    Spriter.SpriterFile = SpriterFile;
})(Spriter || (Spriter = {}));
/// <reference path="SpriterFile.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Spriter;
(function (Spriter) {
    var SpriterBin = (function (_super) {
        __extends(SpriterBin, _super);
        // -------------------------------------------------------------------------
        function SpriterBin(binData) {
            _super.call(this);
            this._elements = {
                "spriter_data": 1,
                "folder": 2,
                "file": 3,
                "entity": 4,
                "obj_info": 5,
                "frames": 6,
                "i": 7,
                "animation": 8,
                "mainline": 9,
                "key": 10,
                "bone_ref": 11,
                "object_ref": 12,
                "timeline": 13,
                "bone": 14,
                "object": 15
            };
            this._smallOffset = false;
            this._bin = new DataView(binData);
            this._smallOffset = this._bin.getUint8(0) === 1;
        }
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getType = function () {
            return Spriter.eFileType.BIN;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.readUint8 = function () {
            return this._bin.getUint8(this._tmpPosition++);
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.readInt8 = function () {
            return this._bin.getInt8(this._tmpPosition++);
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.readUint16 = function () {
            var value = this._bin.getUint16(this._tmpPosition, true);
            this._tmpPosition += 2;
            return value;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.readInt16 = function () {
            var value = this._bin.getInt16(this._tmpPosition, true);
            this._tmpPosition += 2;
            return value;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.readUint32 = function () {
            var value = this._bin.getUint32(this._tmpPosition, true);
            this._tmpPosition += 4;
            return value;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.readInt32 = function () {
            var value = this._bin.getInt32(this._tmpPosition, true);
            this._tmpPosition += 4;
            return value;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.readFixed16_16 = function () {
            var value = this._bin.getInt32(this._tmpPosition, true);
            this._tmpPosition += 4;
            return value / 65536;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.readFixed1_7 = function () {
            var value = this._bin.getInt32(this._tmpPosition++) & 0xFF;
            return value / 128;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.readString = function () {
            var chars = [];
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                chars.push(this._bin.getUint8(this._tmpPosition++));
            }
            return String.fromCharCode.apply(null, chars);
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getNodes = function (nodeName) {
            return new Spriter.NodeListBin(this, this.getSubNodesOfElementType(1, this._elements[nodeName]));
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getNodesForElement = function (elementPosition, nodeName) {
            return new Spriter.NodeListBin(this, this.getSubNodesOfElementType(elementPosition, this._elements[nodeName]));
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getSubNodesOfElementType = function (positon, elementType) {
            var result = [];
            var subelementsCount = this._bin.getUint8(positon + 1);
            positon += 2;
            for (var i = 0; i < subelementsCount; i++) {
                var subelementOffset = this._smallOffset ? this._bin.getUint16(positon + i * 2, true) : this._bin.getUint32(positon + i * 4, true);
                var subelementType = this._bin.getUint8(positon + subelementOffset);
                if (subelementType === elementType) {
                    result.push(positon + subelementOffset);
                }
            }
            return result;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getAttribsPosition = function (position) {
            var subelementsCount = this._bin.getUint8(position + 1);
            return position + 2 + subelementsCount * (this._smallOffset ? 2 : 4);
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getFolder = function (position) {
            this._tmpPosition = this.getAttribsPosition(position);
            var id = 0;
            var name = "";
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_FOLDER_ID:
                        id = this.readUint8();
                        break;
                    case SpriterBin.ATTR_FOLDER_NAME:
                        name = this.readString();
                        break;
                }
            }
            return new Spriter.Folder(id, name);
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getFile = function (position) {
            console.log("skip sound loading");
            this._tmpPosition = this.getAttribsPosition(position);
            var id = 0;
            var name = "";
            var pivotX = 0;
            var pivotY = 0;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_FILE_ID:
                        id = this.readUint8();
                        break;
                    case SpriterBin.ATTR_FILE_NAME:
                        name = this.readString();
                        break;
                    case SpriterBin.ATTR_FILE_PIVOT_X:
                        pivotX = this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_FILE_PIVOT_Y:
                        pivotY = this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_FILE_WIDTH:
                    case SpriterBin.ATTR_FILE_HEIGHT:
                        // ignore - just skip
                        this._tmpPosition += 2;
                        break;
                }
            }
            return new Spriter.File(id, this.getFileNameWithoutExtension(name), pivotX, 1 - pivotY);
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getTag = function (position) {
            console.error("implement loading Tag");
            return null;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getEntity = function (position) {
            this._tmpPosition = this.getAttribsPosition(position);
            var id = 0;
            var name = "";
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_ENTITY_ID:
                        id = this.readUint8();
                        break;
                    case SpriterBin.ATTR_ENTITY_NAME:
                        name = this.readString();
                        break;
                }
            }
            return new Spriter.Entity(id, name);
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getObjectInfo = function (position, index) {
            this._tmpPosition = this.getAttribsPosition(position);
            var name = "";
            var type = Spriter.eObjectType.SPRITE;
            var width = 0;
            var height = 0;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_OBJ_INFO_NAME:
                        name = this.readString();
                        break;
                    case SpriterBin.ATTR_OBJ_INFO_TYPE:
                        if (this.readUint8() === 1) {
                            type = Spriter.eObjectType.BONE;
                        }
                        break;
                    case SpriterBin.ATTR_OBJ_INFO_WIDTH:
                        width = this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_OBJ_INFO_HEIGHT:
                        height = this.readFixed16_16();
                        break;
                }
            }
            console.error("add loading of pivots");
            return new Spriter.ObjectInfo(index, name, type, width, height, 0, 0);
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getCharMap = function (position) {
            console.error("add loading of charmaps");
            return null;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getCharMapEntry = function (position, charMap, spriter) {
            console.error("add loading of charmap entries");
            return null;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getVariable = function (position) {
            console.error("add loading of variables");
            return null;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getAnimation = function (position) {
            this._tmpPosition = this.getAttribsPosition(position);
            var id = 0;
            var name = "";
            var length = 0;
            var interval = 0;
            var looping = Spriter.eAnimationLooping.LOOPING;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_ANIMATION_ID:
                        id = this.readUint8();
                        break;
                    case SpriterBin.ATTR_ANIMATION_NAME:
                        name = this.readString();
                        break;
                    case SpriterBin.ATTR_ANIMATION_LENGTH:
                        length = this.readUint32();
                        break;
                    case SpriterBin.ATTR_ANIMATION_INTERVAL:
                        // ignore - skip
                        this._tmpPosition += 2;
                        break;
                    case SpriterBin.ATTR_ANIMATION_LOOPING:
                        looping = (this.readUint8() === 1) ? Spriter.eAnimationLooping.LOOPING : Spriter.eAnimationLooping.NO_LOOPING;
                        break;
                }
            }
            return new Spriter.Animation(id, name, length, looping);
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getMainlineKey = function (position) {
            this._tmpPosition = this.getAttribsPosition(position);
            var id = 0;
            var time = 0;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_MAINLINE_KEY_ID:
                        id = this.readUint8();
                        break;
                    case SpriterBin.ATTR_MAINLINE_KEY_TIME:
                        time = this.readUint32();
                        break;
                }
            }
            return new Spriter.KeyMainline(id, time);
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getRef = function (position) {
            this._tmpPosition = this.getAttribsPosition(position);
            var id = 0;
            var parent = -1;
            var timeline = 0;
            var key = 0;
            var z_index = 0;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_BONE_REF_ID:
                    case SpriterBin.ATTR_OBJ_REF_ID:
                        id = this.readUint8();
                        break;
                    case SpriterBin.ATTR_BONE_REF_PARENT:
                    case SpriterBin.ATTR_OBJ_REF_PARENT:
                        parent = this.readUint8();
                        break;
                    case SpriterBin.ATTR_BONE_REF_TIMELINE:
                    case SpriterBin.ATTR_OBJ_REF_TIMELINE:
                        timeline = this.readUint8();
                        break;
                    case SpriterBin.ATTR_BONE_REF_KEY:
                    case SpriterBin.ATTR_OBJ_REF_KEY:
                        key = this.readUint8();
                        break;
                    case SpriterBin.ATTR_OBJ_REF_Z:
                        z_index = this.readUint8();
                        break;
                    case SpriterBin.ATTR_OBJ_REF_NAME:
                        // waste
                        this.readString();
                        break;
                    case SpriterBin.ATTR_OBJ_REF_FOLDER:
                    case SpriterBin.ATTR_OBJ_REF_FILE:
                        ++this._tmpPosition;
                        break;
                    case SpriterBin.ATTR_OBJ_REF_ABS_X:
                    case SpriterBin.ATTR_OBJ_REF_ABS_Y:
                    case SpriterBin.ATTR_OBJ_REF_ABS_PIVOT_X:
                    case SpriterBin.ATTR_OBJ_REF_ABS_PIVOT_Y:
                    case SpriterBin.ATTR_OBJ_REF_ABS_SCALE_X:
                    case SpriterBin.ATTR_OBJ_REF_ABS_SCALE_Y:
                    case SpriterBin.ATTR_OBJ_REF_ANGLE:
                        // skip
                        this._tmpPosition += 4;
                        break;
                    case SpriterBin.ATTR_OBJ_REF_ALPHA:
                        // skip
                        ++this._tmpPosition;
                        break;
                }
            }
            return new Spriter.Ref(id, parent, timeline, key, z_index);
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getTimeline = function (position) {
            console.error("add loading of all types of objects");
            this._tmpPosition = this.getAttribsPosition(position);
            var id = 0;
            var name = "";
            var obj = 0;
            var type = Spriter.eObjectType.SPRITE;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_TIMELINE_ID:
                        id = this.readUint8();
                        break;
                    case SpriterBin.ATTR_TIMELINE_NAME:
                        name = this.readString();
                        break;
                    case SpriterBin.ATTR_TIMELINE_OBJ:
                        obj = this.readUint8();
                        break;
                    case SpriterBin.ATTR_TIMELINE_OBJ_TYPE:
                        if (this.readUint8() === 1) {
                            type = Spriter.eObjectType.BONE;
                        }
                        break;
                }
            }
            return new Spriter.Timeline(id, name, type, obj);
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getBaseline = function (position) {
            console.error("add loading of baselines");
            return null;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getVarline = function (position) {
            console.error("add loading of varlines");
            return null;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getKey = function (position) {
            console.error("add loading of keys");
            return null;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getTagKey = function (position) {
            console.error("add loading of tag keys");
            return null;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getVariableKey = function (position, type) {
            console.error("add loading of variable keys");
            return null;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getTimelineKey = function (position, index, spriter) {
            this._tmpPosition = this.getAttribsPosition(position);
            var time = 0;
            var spin = 1;
            // curve and params
            var curve = Spriter.eCurveType.LINEAR;
            var c1 = 0;
            var c2 = 0;
            var c3 = 0;
            var c4 = 0;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_TIMELINE_KEY_ID:
                        // skip
                        ++this._tmpPosition;
                        break;
                    case SpriterBin.ATTR_TIMELINE_KEY_TIME:
                        time = this.readUint32();
                        break;
                    case SpriterBin.ATTR_TIMELINE_KEY_SPIN:
                        spin = this.readInt8();
                        break;
                    case SpriterBin.ATTR_TIMELINE_KEY_CURVE:
                        curve = this.readUint8();
                        break;
                    case SpriterBin.ATTR_TIMELINE_KEY_C1:
                        c1 = this.readFixed1_7();
                        break;
                    case SpriterBin.ATTR_TIMELINE_KEY_C2:
                        c2 = this.readFixed1_7();
                        break;
                }
            }
            // get child element
            position += 2;
            var offset = position + (this._smallOffset ? this._bin.getUint16(position, true) : this._bin.getUint32(position, true));
            var elementType = this._bin.getUint8(offset);
            var key = null;
            var keyDataElm = null;
            var sprite = false;
            if (elementType === 14 /* bone */) {
                key = new Spriter.KeyBone(index, time, spin);
            }
            else if (elementType === 15 /* object */) {
                key = new Spriter.KeyObject(index, time, spin);
                sprite = true;
            }
            // other curve than linear?
            if (curve !== Spriter.eCurveType.LINEAR) {
                key.setCurve(curve, c1, c2, c3, c4);
            }
            this._tmpPosition = this.getAttribsPosition(offset);
            // spatial info
            var info = key.info;
            info.x = 0; //this.parseFloat(keyDataElm, "x");
            info.y = 0; //-this.parseFloat(keyDataElm, "y");
            info.scaleX = 1; // this.parseFloat(keyDataElm, "scale_x", 1);
            info.scaleY = 1; //this.parseFloat(keyDataElm, "scale_y", 1);
            info.angle = 0; //360 - this.parseFloat(keyDataElm, "angle");
            info.alpha = 1; //this.parseFloat(keyDataElm, "a", 1);
            var pivotX = 0;
            var hasPivotX = false;
            var pivotY = 0;
            var hasPivotY = false;
            var folder = 0;
            var file = 0;
            for (var i = this._bin.getUint8(this._tmpPosition++) - 1; i >= 0; i--) {
                switch (this._bin.getUint8(this._tmpPosition++)) {
                    case SpriterBin.ATTR_BONE_X:
                    case SpriterBin.ATTR_OBJ_X:
                        info.x = this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_BONE_Y:
                    case SpriterBin.ATTR_OBJ_Y:
                        info.y = -this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_BONE_ANGLE:
                    case SpriterBin.ATTR_OBJ_ANGLE:
                        info.angle = 360 - this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_BONE_SCALE_X:
                    case SpriterBin.ATTR_OBJ_SCALE_X:
                        info.scaleX = this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_BONE_SCALE_Y:
                    case SpriterBin.ATTR_OBJ_SCALE_Y:
                        info.scaleY = this.readFixed16_16();
                        break;
                    case SpriterBin.ATTR_OBJ_FOLDER:
                        folder = this.readUint8();
                        break;
                    case SpriterBin.ATTR_OBJ_FILE:
                        file = this.readUint8();
                        break;
                    case SpriterBin.ATTR_OBJ_PIVOT_X:
                        pivotX = this.readFixed16_16();
                        hasPivotX = true;
                        break;
                    case SpriterBin.ATTR_OBJ_PIVOT_Y:
                        pivotY = this.readFixed16_16();
                        hasPivotY = true;
                        break;
                    case SpriterBin.ATTR_OBJ_ALPHA:
                        info.alpha = this.readFixed1_7();
                        break;
                }
            }
            if (sprite) {
                key.setFolderAndFile(folder, file);
                // set pivot in spatial info different from default (based on pivot in file)
                var fileObj = spriter.getFolderById(folder).getFileById(file);
                info.pivotX = hasPivotX ? pivotX : fileObj.pivotX;
                // 1 - to flip Y, default anchor is already flipped, so it needs to be flipped back to avoid double flipping
                info.pivotY = 1 - (hasPivotY ? pivotY : 1 - fileObj.pivotY);
            }
            return key;
        };
        // -------------------------------------------------------------------------
        SpriterBin.prototype.getTagChange = function (position) {
            console.error("add loading of tag changes");
            return null;
        };
        // spriter data
        SpriterBin.ATTR_VERSION = 0;
        SpriterBin.ATTR_GENERATOR = 1;
        SpriterBin.ATTR_GENERATOR_VERSION = 2;
        // folder
        SpriterBin.ATTR_FOLDER_ID = 0;
        SpriterBin.ATTR_FOLDER_NAME = 1;
        // file
        SpriterBin.ATTR_FILE_ID = 0;
        SpriterBin.ATTR_FILE_NAME = 1;
        SpriterBin.ATTR_FILE_WIDTH = 2;
        SpriterBin.ATTR_FILE_HEIGHT = 3;
        SpriterBin.ATTR_FILE_PIVOT_X = 4;
        SpriterBin.ATTR_FILE_PIVOT_Y = 5;
        // entity
        SpriterBin.ATTR_ENTITY_ID = 0;
        SpriterBin.ATTR_ENTITY_NAME = 1;
        // obj_info
        SpriterBin.ATTR_OBJ_INFO_NAME = 0;
        SpriterBin.ATTR_OBJ_INFO_TYPE = 1;
        SpriterBin.ATTR_OBJ_INFO_WIDTH = 2;
        SpriterBin.ATTR_OBJ_INFO_HEIGHT = 3;
        // frames
        SpriterBin.ATTR_FRAMES_I_FOLDER = 0;
        SpriterBin.ATTR_FRAMES_I_FILE = 1;
        // animation
        SpriterBin.ATTR_ANIMATION_ID = 0;
        SpriterBin.ATTR_ANIMATION_NAME = 1;
        SpriterBin.ATTR_ANIMATION_LENGTH = 2;
        SpriterBin.ATTR_ANIMATION_INTERVAL = 3;
        SpriterBin.ATTR_ANIMATION_LOOPING = 4;
        // key
        SpriterBin.ATTR_MAINLINE_KEY_ID = 0;
        SpriterBin.ATTR_MAINLINE_KEY_TIME = 1;
        // bone_ref
        SpriterBin.ATTR_BONE_REF_ID = 0;
        SpriterBin.ATTR_BONE_REF_PARENT = 1;
        SpriterBin.ATTR_BONE_REF_TIMELINE = 2;
        SpriterBin.ATTR_BONE_REF_KEY = 3;
        // object_ref
        SpriterBin.ATTR_OBJ_REF_ID = 4;
        SpriterBin.ATTR_OBJ_REF_PARENT = 5;
        SpriterBin.ATTR_OBJ_REF_TIMELINE = 6;
        SpriterBin.ATTR_OBJ_REF_KEY = 7;
        SpriterBin.ATTR_OBJ_REF_NAME = 8;
        SpriterBin.ATTR_OBJ_REF_Z = 9;
        SpriterBin.ATTR_OBJ_REF_FOLDER = 10;
        SpriterBin.ATTR_OBJ_REF_FILE = 11;
        SpriterBin.ATTR_OBJ_REF_ABS_X = 12;
        SpriterBin.ATTR_OBJ_REF_ABS_Y = 13;
        SpriterBin.ATTR_OBJ_REF_ABS_PIVOT_X = 14;
        SpriterBin.ATTR_OBJ_REF_ABS_PIVOT_Y = 15;
        SpriterBin.ATTR_OBJ_REF_ABS_SCALE_X = 16;
        SpriterBin.ATTR_OBJ_REF_ABS_SCALE_Y = 17;
        SpriterBin.ATTR_OBJ_REF_ANGLE = 18;
        SpriterBin.ATTR_OBJ_REF_ALPHA = 19;
        // timeline
        SpriterBin.ATTR_TIMELINE_ID = 0;
        SpriterBin.ATTR_TIMELINE_NAME = 1;
        SpriterBin.ATTR_TIMELINE_OBJ = 2;
        SpriterBin.ATTR_TIMELINE_OBJ_TYPE = 3;
        // key
        SpriterBin.ATTR_TIMELINE_KEY_ID = 0;
        SpriterBin.ATTR_TIMELINE_KEY_TIME = 1;
        SpriterBin.ATTR_TIMELINE_KEY_SPIN = 2;
        SpriterBin.ATTR_TIMELINE_KEY_CURVE = 3;
        SpriterBin.ATTR_TIMELINE_KEY_C1 = 4;
        SpriterBin.ATTR_TIMELINE_KEY_C2 = 5;
        // bone
        SpriterBin.ATTR_BONE_X = 0;
        SpriterBin.ATTR_BONE_Y = 1;
        SpriterBin.ATTR_BONE_ANGLE = 2;
        SpriterBin.ATTR_BONE_SCALE_X = 3;
        SpriterBin.ATTR_BONE_SCALE_Y = 4;
        // object
        SpriterBin.ATTR_OBJ_FOLDER = 5;
        SpriterBin.ATTR_OBJ_FILE = 6;
        SpriterBin.ATTR_OBJ_X = 7;
        SpriterBin.ATTR_OBJ_Y = 8;
        SpriterBin.ATTR_OBJ_SCALE_X = 9;
        SpriterBin.ATTR_OBJ_SCALE_Y = 10;
        SpriterBin.ATTR_OBJ_PIVOT_X = 11;
        SpriterBin.ATTR_OBJ_PIVOT_Y = 12;
        SpriterBin.ATTR_OBJ_ANGLE = 13;
        SpriterBin.ATTR_OBJ_ALPHA = 14;
        return SpriterBin;
    })(Spriter.SpriterFile);
    Spriter.SpriterBin = SpriterBin;
})(Spriter || (Spriter = {}));
/// <reference path="SpriterFile.ts" />
var Spriter;
(function (Spriter) {
    var SpriterJSON = (function (_super) {
        __extends(SpriterJSON, _super);
        // -------------------------------------------------------------------------
        function SpriterJSON(JSONData, minDefs) {
            if (minDefs === void 0) { minDefs = null; }
            _super.call(this);
            this._json = JSONData;
            var minimized = JSONData["min"] !== undefined;
            this.setMinimized(minimized, minDefs);
        }
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getType = function () {
            return Spriter.eFileType.JSON;
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.parseInt = function (element, attributeName, defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0; }
            var value = element[this.translateAttributeName(attributeName)];
            if (value === undefined) {
                return defaultValue;
            }
            return typeof (value) === "number" ? value : parseInt(value);
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.parseFloat = function (element, attributeName, defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0; }
            var value = element[this.translateAttributeName(attributeName)];
            if (value === undefined) {
                return defaultValue;
            }
            return typeof (value) === "number" ? value : parseFloat(value);
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.parseBoolean = function (element, attributeName, defaultValue) {
            if (defaultValue === void 0) { defaultValue = false; }
            var value = element[this.translateAttributeName(attributeName)];
            if (value === undefined) {
                return defaultValue;
            }
            return typeof (value) === "boolean" ? value : (value === "true");
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.parseString = function (element, attributeName, defaultValue) {
            if (defaultValue === void 0) { defaultValue = ""; }
            var value = element[this.translateAttributeName(attributeName)];
            return value === undefined ? defaultValue : value;
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getNodes = function (nodeName) {
            this.setMinDefsToElementName(nodeName);
            var translatedName = this.translateElementName(nodeName);
            return new Spriter.NodeListJSON(this, (this._json[translatedName] !== undefined) ? this._json[translatedName] : []);
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getNodesForElement = function (element, nodeName) {
            this.setMinDefsToElementName(nodeName);
            var translatedName = this.translateElementName(nodeName);
            return new Spriter.NodeListJSON(this, (element[translatedName] !== undefined) ? element[translatedName] : []);
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getFolder = function (element) {
            return new Spriter.Folder(this.parseInt(element, "id"), this.parseString(element, "name"));
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getFile = function (element) {
            if (element["type"] !== undefined && element["type"] === "sound") {
                return null;
            }
            return new Spriter.File(this.parseInt(element, "id"), this.getFileNameWithoutExtension(this.parseString(element, "name")), this.parseFloat(element, "pivot_x"), 1 - this.parseFloat(element, "pivot_y"));
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getTag = function (element) {
            console.error("implement loading Tag");
            return null;
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getEntity = function (element) {
            return new Spriter.Entity(this.parseInt(element, "id"), this.parseString(element, "name"));
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getObjectInfo = function (element, index) {
            return new Spriter.ObjectInfo(index, this.parseString(element, "name"), Spriter.Types.getObjectTypeForName(this.parseString(element, "type")), this.parseFloat(element, "w"), this.parseFloat(element, "h"), this.parseFloat(element, "pivot_x"), this.parseFloat(element, "pivot_y"));
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getCharMap = function (element) {
            return new Spriter.CharMap(this.parseInt(element, "id"), this.parseString(element, "name"));
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getCharMapEntry = function (element, charMap, spriter) {
            var sourceName = spriter.getFolderById(this.parseInt(element, "folder")).
                getFileById(this.parseInt(element, "file")).name;
            var target = null;
            if (element["target_folder"] !== undefined && element["target_file"] !== undefined) {
                target = spriter.getFolderById(this.parseInt(element, "target_folder")).
                    getFileById(this.parseInt(element, "target_file"));
            }
            charMap.put(sourceName, target);
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getVariable = function (element) {
            var type = Spriter.Types.getVariableTypeForName(this.parseString(element, "type"));
            return new Spriter.Variable(this.parseInt(element, "id"), this.parseString(element, "name"), type, (type === Spriter.eVariableType.STRING) ? this.parseString(element, "default") : this.parseFloat(element, "default", 0));
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getAnimation = function (element) {
            return new Spriter.Animation(this.parseInt(element, "id"), this.parseString(element, "name"), this.parseFloat(element, "length"), this.parseBoolean(element, "looping", true) === true ? Spriter.eAnimationLooping.LOOPING : Spriter.eAnimationLooping.NO_LOOPING);
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getMainlineKey = function (element) {
            return new Spriter.KeyMainline(this.parseInt(element, "id"), this.parseFloat(element, "time"));
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getRef = function (element) {
            return new Spriter.Ref(this.parseInt(element, "id"), this.parseInt(element, "parent", -1), this.parseInt(element, "timeline"), this.parseInt(element, "key"), this.parseInt(element, "z_index"));
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getTimeline = function (element) {
            return new Spriter.Timeline(this.parseInt(element, "id"), this.parseString(element, "name"), Spriter.Types.getObjectTypeForName(this.parseString(element, "object_type", "sprite")), this.parseInt(element, "obj", -1));
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getBaseline = function (element) {
            return new Spriter.Baseline(this.parseInt(element, "id"), this.parseString(element, "name", null));
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getVarline = function (element) {
            return new Spriter.Varline(this.parseInt(element, "id"), this.parseInt(element, "def"));
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getKey = function (element) {
            return new Spriter.Key(this.parseInt(element, "id"), this.parseInt(element, "time"));
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getTagKey = function (element) {
            return new Spriter.KeyTag(this.parseInt(element, "id"), this.parseInt(element, "time"));
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getVariableKey = function (element, type) {
            return new Spriter.KeyVariable(this.parseInt(element, "id"), this.parseInt(element, "time"), (type === Spriter.eVariableType.STRING) ? this.parseString(element, "val") : this.parseFloat(element, "val"));
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getTimelineKey = function (element, index, spriter) {
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
            var key = null;
            var keyDataElm = null;
            var sprite = false;
            if (element[boneTag] !== undefined) {
                keyDataElm = element[boneTag];
                key = new Spriter.KeyBone(index, time, spin);
                this.setMinDefsToElementName("bone");
            }
            else if (element[objectTag] !== undefined) {
                keyDataElm = element[objectTag];
                key = new Spriter.KeyObject(index, time, spin);
                this.setMinDefsToElementName("object");
                sprite = true;
            }
            // other curve than linear?
            if (curve !== "linear") {
                key.setCurve(Spriter.Types.getCurveTypeForName(curve), c1, c2, c3, c4);
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
                key.setFolderAndFile(folderId, fileId);
                // set pivot in spatial info different from default (based on pivot in file)
                var file = spriter.getFolderById(folderId).getFileById(fileId);
                info.pivotX = this.parseFloat(keyDataElm, "pivot_x", file.pivotX);
                // 1 - to flip Y, default anchor is already flipped, so it needs to be flipped back to avoid double flipping
                info.pivotY = 1 - this.parseFloat(keyDataElm, "pivot_y", 1 - file.pivotY);
            }
            this.popMinDefsStack();
            return key;
        };
        // -------------------------------------------------------------------------
        SpriterJSON.prototype.getTagChange = function (element) {
            return this.parseInt(element, "t");
        };
        return SpriterJSON;
    })(Spriter.SpriterFile);
    Spriter.SpriterJSON = SpriterJSON;
})(Spriter || (Spriter = {}));
/// <reference path="SpriterFile.ts" />
var Spriter;
(function (Spriter) {
    var SpriterXml = (function (_super) {
        __extends(SpriterXml, _super);
        // -------------------------------------------------------------------------
        function SpriterXml(xmlData, minDefs) {
            if (minDefs === void 0) { minDefs = null; }
            _super.call(this);
            this._xml = xmlData;
            var minimized = xmlData.documentElement.hasAttribute("min");
            this.setMinimized(minimized, minDefs);
        }
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getType = function () {
            return Spriter.eFileType.XML;
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.parseInt = function (element, attributeName, defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0; }
            var value = element.getAttribute(this.translateAttributeName(attributeName));
            return value !== null ? parseInt(value) : defaultValue;
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.parseFloat = function (element, attributeName, defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0; }
            var value = element.getAttribute(this.translateAttributeName(attributeName));
            return value !== null ? parseFloat(value) : defaultValue;
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.parseString = function (element, attributeName, defaultValue) {
            if (defaultValue === void 0) { defaultValue = ""; }
            var value = element.getAttribute(this.translateAttributeName(attributeName));
            return value !== null ? value : defaultValue;
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getNodes = function (nodeName) {
            this.setMinDefsToElementName(nodeName);
            var translatedName = this.translateElementName(nodeName);
            return new Spriter.NodeListXml(this, this._xml.documentElement.getElementsByTagName(translatedName));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getNodesForElement = function (element, nodeName) {
            this.setMinDefsToElementName(nodeName);
            var translatedName = this.translateElementName(nodeName);
            return new Spriter.NodeListXml(this, element.getElementsByTagName(translatedName));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getFolder = function (element) {
            return new Spriter.Folder(this.parseInt(element, "id"), this.parseString(element, "name"));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getFile = function (element) {
            if (element.hasAttribute("type") && element.getAttribute("type") === "sound") {
                return null;
            }
            return new Spriter.File(this.parseInt(element, "id"), this.getFileNameWithoutExtension(this.parseString(element, "name")), this.parseFloat(element, "pivot_x"), 1 - this.parseFloat(element, "pivot_y"));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getTag = function (element) {
            return new Spriter.Item(this.parseInt(element, "id"), this.parseString(element, "name"));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getEntity = function (element) {
            return new Spriter.Entity(this.parseInt(element, "id"), this.parseString(element, "name"));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getObjectInfo = function (element, index) {
            return new Spriter.ObjectInfo(index, this.parseString(element, "name"), Spriter.Types.getObjectTypeForName(this.parseString(element, "type")), this.parseFloat(element, "w"), this.parseFloat(element, "h"), this.parseFloat(element, "pivot_x"), this.parseFloat(element, "pivot_y"));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getCharMap = function (element) {
            return new Spriter.CharMap(this.parseInt(element, "id"), this.parseString(element, "name"));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getCharMapEntry = function (element, charMap, spriter) {
            var sourceName = spriter.getFolderById(this.parseInt(element, "folder")).
                getFileById(this.parseInt(element, "file")).name;
            var target = null;
            if (element.hasAttribute("target_folder") && element.hasAttribute("target_file")) {
                target = spriter.getFolderById(this.parseInt(element, "target_folder")).
                    getFileById(this.parseInt(element, "target_file"));
            }
            charMap.put(sourceName, target);
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getVariable = function (element) {
            var type = Spriter.Types.getVariableTypeForName(this.parseString(element, "type"));
            return new Spriter.Variable(this.parseInt(element, "id"), this.parseString(element, "name"), type, (type === Spriter.eVariableType.STRING) ? this.parseString(element, "default") : this.parseFloat(element, "default", 0));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getAnimation = function (element) {
            return new Spriter.Animation(this.parseInt(element, "id"), this.parseString(element, "name"), this.parseFloat(element, "length"), this.parseString(element, "looping", "true") === "true" ? Spriter.eAnimationLooping.LOOPING : Spriter.eAnimationLooping.NO_LOOPING);
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getMainlineKey = function (element) {
            return new Spriter.KeyMainline(this.parseInt(element, "id"), this.parseFloat(element, "time"));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getRef = function (element) {
            return new Spriter.Ref(this.parseInt(element, "id"), this.parseInt(element, "parent", -1), this.parseInt(element, "timeline"), this.parseInt(element, "key"), this.parseInt(element, "z_index"));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getTimeline = function (element) {
            return new Spriter.Timeline(this.parseInt(element, "id"), this.parseString(element, "name"), Spriter.Types.getObjectTypeForName(this.parseString(element, "object_type", "sprite")), this.parseInt(element, "obj", -1));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getBaseline = function (element) {
            return new Spriter.Baseline(this.parseInt(element, "id"), this.parseString(element, "name", null));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getVarline = function (element) {
            return new Spriter.Varline(this.parseInt(element, "id"), this.parseInt(element, "def"));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getKey = function (element) {
            return new Spriter.Key(this.parseInt(element, "id"), this.parseInt(element, "time"));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getTagKey = function (element) {
            return new Spriter.KeyTag(this.parseInt(element, "id"), this.parseInt(element, "time"));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getVariableKey = function (element, type) {
            return new Spriter.KeyVariable(this.parseInt(element, "id"), this.parseInt(element, "time"), (type === Spriter.eVariableType.STRING) ? this.parseString(element, "val") : this.parseFloat(element, "val"));
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getTimelineKey = function (element, index, spriter) {
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
            var key = null;
            var keyDataElm = (element.firstElementChild);
            var sprite = false;
            if (keyDataElm.tagName === boneTag) {
                key = new Spriter.KeyBone(index, time, spin);
                this.setMinDefsToElementName("bone");
            }
            else if (keyDataElm.tagName === objectTag) {
                this.setMinDefsToElementName("object");
                key = new Spriter.KeyObject(index, time, spin);
                sprite = true;
            }
            // other curve than linear?
            if (curve !== "linear") {
                key.setCurve(Spriter.Types.getCurveTypeForName(curve), c1, c2, c3, c4);
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
                key.setFolderAndFile(folderId, fileId);
                // set pivot in spatial info different from default (based on pivot in file)
                var file = spriter.getFolderById(folderId).getFileById(fileId);
                info.pivotX = this.parseFloat(keyDataElm, "pivot_x", file.pivotX);
                // 1 - to flip Y, default anchor is already flipped, so it needs to be flipped back to avoid double flipping
                info.pivotY = 1 - this.parseFloat(keyDataElm, "pivot_y", 1 - file.pivotY);
            }
            this.popMinDefsStack();
            return key;
        };
        // -------------------------------------------------------------------------
        SpriterXml.prototype.getTagChange = function (element) {
            return this.parseInt(element, "t");
        };
        return SpriterXml;
    })(Spriter.SpriterFile);
    Spriter.SpriterXml = SpriterXml;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Item = (function () {
        // -------------------------------------------------------------------------
        function Item(id, name) {
            this._id = id;
            this._name = name;
        }
        Object.defineProperty(Item.prototype, "id", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "name", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        return Item;
    })();
    Spriter.Item = Item;
})(Spriter || (Spriter = {}));
/// <reference path="../IdNameMap.ts" />
/// <reference path="Item.ts" />
var Spriter;
(function (Spriter) {
    (function (eAnimationLooping) {
        eAnimationLooping[eAnimationLooping["NO_LOOPING"] = 0] = "NO_LOOPING";
        eAnimationLooping[eAnimationLooping["LOOPING"] = 1] = "LOOPING";
    })(Spriter.eAnimationLooping || (Spriter.eAnimationLooping = {}));
    var eAnimationLooping = Spriter.eAnimationLooping;
    ;
    var Animation = (function (_super) {
        __extends(Animation, _super);
        // -------------------------------------------------------------------------
        function Animation(id, name, length, loopType) {
            _super.call(this, id, name);
            this._length = length;
            this._loopType = loopType;
            this._timelines = new Spriter.IdNameMap();
            this._lines = new Spriter.IdNameMap();
        }
        Object.defineProperty(Animation.prototype, "mainline", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._mainline;
            },
            // -------------------------------------------------------------------------
            set: function (mainline) {
                this._mainline = mainline;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        Animation.prototype.addTimeline = function (timeline) {
            this._timelines.add(timeline, timeline.id, timeline.name);
        };
        // -------------------------------------------------------------------------
        Animation.prototype.getTimelineById = function (id) {
            return this._timelines.getById(id);
        };
        // -------------------------------------------------------------------------
        Animation.prototype.getTimelineByName = function (name) {
            return this._timelines.getByName(name);
        };
        // -------------------------------------------------------------------------
        Animation.prototype.addLine = function (line) {
            this._lines.add(line, this._lines.length, line.name);
        };
        // -------------------------------------------------------------------------
        Animation.prototype.getLineById = function (id) {
            return this._lines.getById(id);
        };
        // -------------------------------------------------------------------------
        Animation.prototype.getLineByName = function (name) {
            return this._lines.getByName(name);
        };
        Object.defineProperty(Animation.prototype, "linesLength", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._lines.length;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        Animation.prototype.resetLines = function () {
            for (var i = 0; i < this._lines.length; i++) {
                this._lines.getById(i).reset();
            }
        };
        Object.defineProperty(Animation.prototype, "length", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "loopType", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._loopType;
            },
            enumerable: true,
            configurable: true
        });
        return Animation;
    })(Spriter.Item);
    Spriter.Animation = Animation;
})(Spriter || (Spriter = {}));
/// <reference path="../IdNameMap.ts" />
/// <reference path="Item.ts" />
var Spriter;
(function (Spriter) {
    var Entity = (function (_super) {
        __extends(Entity, _super);
        // -------------------------------------------------------------------------
        function Entity(id, name) {
            _super.call(this, id, name);
            this._objectInfos = new Spriter.IdNameMap();
            this._charMaps = new Spriter.IdNameMap();
            this._variables = new Spriter.IdNameMap();
            this._animations = new Spriter.IdNameMap();
        }
        // -------------------------------------------------------------------------
        Entity.prototype.addObjectInfo = function (objectInfo) {
            this._objectInfos.add(objectInfo, objectInfo.id, objectInfo.name);
        };
        // -------------------------------------------------------------------------
        Entity.prototype.getObjectInfoById = function (id) {
            return this._objectInfos.getById(id);
        };
        // -------------------------------------------------------------------------
        Entity.prototype.getObjectInfoByName = function (name) {
            return this._objectInfos.getByName(name);
        };
        // -------------------------------------------------------------------------
        Entity.prototype.addCharMap = function (charMap) {
            this._charMaps.add(charMap, charMap.id, charMap.name);
        };
        // -------------------------------------------------------------------------
        Entity.prototype.getCharMapById = function (id) {
            return this._charMaps.getById(id);
        };
        // -------------------------------------------------------------------------
        Entity.prototype.getCharMapByName = function (name) {
            return this._charMaps.getByName(name);
        };
        Object.defineProperty(Entity.prototype, "charMapsLength", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._charMaps.length;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        Entity.prototype.addVariable = function (variable) {
            this._variables.add(variable, variable.id, variable.name);
        };
        // -------------------------------------------------------------------------
        Entity.prototype.getVariableById = function (id) {
            return this._variables.getById(id);
        };
        // -------------------------------------------------------------------------
        Entity.prototype.getVariableByName = function (name) {
            return this._variables.getByName(name);
        };
        Object.defineProperty(Entity.prototype, "variablesLength", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._variables.length;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        Entity.prototype.addAnimation = function (animation) {
            this._animations.add(animation, animation.id, animation.name);
        };
        // -------------------------------------------------------------------------
        Entity.prototype.getAnimationById = function (id) {
            return this._animations.getById(id);
        };
        // -------------------------------------------------------------------------
        Entity.prototype.getAnimationByName = function (name) {
            return this._animations.getByName(name);
        };
        Object.defineProperty(Entity.prototype, "animationsLength", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._animations.length;
            },
            enumerable: true,
            configurable: true
        });
        return Entity;
    })(Spriter.Item);
    Spriter.Entity = Entity;
})(Spriter || (Spriter = {}));
/// <reference path="Item.ts" />
var Spriter;
(function (Spriter) {
    var File = (function (_super) {
        __extends(File, _super);
        // -------------------------------------------------------------------------
        function File(id, name, pivotX, pivotY) {
            _super.call(this, id, name);
            this._pivotX = pivotX;
            this._pivotY = pivotY;
        }
        Object.defineProperty(File.prototype, "pivotX", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._pivotX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "pivotY", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._pivotY;
            },
            enumerable: true,
            configurable: true
        });
        return File;
    })(Spriter.Item);
    Spriter.File = File;
})(Spriter || (Spriter = {}));
/// <reference path="../IdNameMap.ts" />
/// <reference path="Item.ts" />
var Spriter;
(function (Spriter) {
    var Folder = (function (_super) {
        __extends(Folder, _super);
        // -------------------------------------------------------------------------
        function Folder(id, name) {
            _super.call(this, id, name);
            this._files = new Spriter.IdNameMap();
        }
        // -------------------------------------------------------------------------
        Folder.prototype.addFile = function (file) {
            this._files.add(file, file.id, file.name);
        };
        // -------------------------------------------------------------------------
        Folder.prototype.getFileById = function (id) {
            return this._files.getById(id);
        };
        // -------------------------------------------------------------------------
        Folder.prototype.getFileByName = function (name) {
            return this._files.getByName(name);
        };
        return Folder;
    })(Spriter.Item);
    Spriter.Folder = Folder;
})(Spriter || (Spriter = {}));
/// <reference path="Item.ts" />
var Spriter;
(function (Spriter) {
    var CharMap = (function (_super) {
        __extends(CharMap, _super);
        function CharMap() {
            _super.apply(this, arguments);
        }
        // -------------------------------------------------------------------------
        CharMap.prototype.put = function (key, value) {
            if (this._map === undefined) {
                this._map = {};
            }
            if (this._map[key] !== undefined) {
                console.error("Key with name " + key + " already exists");
            }
            this._map[key] = value;
        };
        // -------------------------------------------------------------------------
        CharMap.prototype.value = function (key) {
            return this._map[key];
        };
        return CharMap;
    })(Spriter.Item);
    Spriter.CharMap = CharMap;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var CharMapStack = (function () {
        // -------------------------------------------------------------------------
        function CharMapStack(entity) {
            this._stack = [];
            this._length = 0;
            this._entity = entity;
        }
        // -------------------------------------------------------------------------
        CharMapStack.prototype.reset = function () {
            this._length = 0;
        };
        // -------------------------------------------------------------------------
        CharMapStack.prototype.push = function (charMapName) {
            var charMap = this.getCharMap(charMapName);
            this._stack[this._length++] = charMap;
        };
        // -------------------------------------------------------------------------
        CharMapStack.prototype.remove = function (charMapName) {
            var charMap = this.getCharMap(charMapName);
            var index = this.findCharMap(charMap);
            // shift all items down
            if (index !== -1) {
                for (var i = index; i < this._length - 2; i++) {
                    this._stack[i] = this._stack[i + 1];
                }
                this._stack[--this._length] = null;
            }
        };
        // -------------------------------------------------------------------------
        CharMapStack.prototype.getFile = function (file) {
            for (var i = this._length - 1; i >= 0; i--) {
                var value = this._stack[i].value(file.name);
                if (value !== undefined) {
                    return value;
                }
            }
            return file;
        };
        // -------------------------------------------------------------------------
        CharMapStack.prototype.getCharMap = function (charMapName) {
            var charMap = this._entity.getCharMapByName(charMapName);
            if (charMapName === null) {
                console.error("charmap with name " + charMapName + " does not exist");
            }
            return charMap;
        };
        // -------------------------------------------------------------------------
        CharMapStack.prototype.findCharMap = function (charMap) {
            for (var i = 0; i < this._length; i++) {
                if (this._stack[i] === charMap) {
                    return i;
                }
            }
            return -1;
        };
        return CharMapStack;
    })();
    Spriter.CharMapStack = CharMapStack;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Key = (function () {
        // -------------------------------------------------------------------------
        function Key(id, time) {
            this._id = id;
            this._time = time;
        }
        Object.defineProperty(Key.prototype, "id", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Key.prototype, "time", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._time;
            },
            enumerable: true,
            configurable: true
        });
        return Key;
    })();
    Spriter.Key = Key;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var KeyMainline = (function (_super) {
        __extends(KeyMainline, _super);
        function KeyMainline() {
            _super.apply(this, arguments);
            this._boneRefs = [];
            this._objectRefs = [];
        }
        Object.defineProperty(KeyMainline.prototype, "boneRefs", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._boneRefs;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        KeyMainline.prototype.addBoneRef = function (boneRef) {
            this._boneRefs.push(boneRef);
        };
        Object.defineProperty(KeyMainline.prototype, "objectRefs", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._objectRefs;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        KeyMainline.prototype.addObjectRef = function (objectRef) {
            this._objectRefs.push(objectRef);
        };
        return KeyMainline;
    })(Spriter.Key);
    Spriter.KeyMainline = KeyMainline;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var KeyTag = (function (_super) {
        __extends(KeyTag, _super);
        function KeyTag() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(KeyTag.prototype, "tagsOn", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._tagsOn;
            },
            // -------------------------------------------------------------------------
            set: function (tagsOn) {
                this._tagsOn = tagsOn;
            },
            enumerable: true,
            configurable: true
        });
        return KeyTag;
    })(Spriter.Key);
    Spriter.KeyTag = KeyTag;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var KeyVariable = (function (_super) {
        __extends(KeyVariable, _super);
        // -------------------------------------------------------------------------
        function KeyVariable(id, time, value) {
            _super.call(this, id, time);
            this._value = value;
        }
        Object.defineProperty(KeyVariable.prototype, "value", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        return KeyVariable;
    })(Spriter.Key);
    Spriter.KeyVariable = KeyVariable;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    (function (eTimelineType) {
        eTimelineType[eTimelineType["UNKNOWN"] = 0] = "UNKNOWN";
        eTimelineType[eTimelineType["MAIN_LINE"] = 1] = "MAIN_LINE";
        eTimelineType[eTimelineType["TIME_LINE"] = 2] = "TIME_LINE";
        eTimelineType[eTimelineType["SOUND_LINE"] = 3] = "SOUND_LINE";
        eTimelineType[eTimelineType["EVENT_LINE"] = 4] = "EVENT_LINE";
        eTimelineType[eTimelineType["TAG_LINE"] = 5] = "TAG_LINE";
        eTimelineType[eTimelineType["VAR_LINE"] = 6] = "VAR_LINE";
    })(Spriter.eTimelineType || (Spriter.eTimelineType = {}));
    var eTimelineType = Spriter.eTimelineType;
    var Baseline = (function (_super) {
        __extends(Baseline, _super);
        // -------------------------------------------------------------------------
        function Baseline(id, name) {
            if (name === void 0) { name = null; }
            _super.call(this, id, name);
            this._type = eTimelineType.UNKNOWN;
            this.reset();
        }
        Object.defineProperty(Baseline.prototype, "type", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._type;
            },
            // -------------------------------------------------------------------------
            set: function (type) {
                this._type = type;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        Baseline.prototype.reset = function () {
            this._lastTime = -1;
            this._currentIndex = -1;
            this._nextIndex = 0;
        };
        // -------------------------------------------------------------------------
        Baseline.prototype.add = function (key) {
            if (this._keys === null || this._keys === undefined) {
                this._keys = [];
            }
            this._keys.push(key);
        };
        // -------------------------------------------------------------------------
        Baseline.prototype.at = function (index, loop) {
            if (loop === void 0) { loop = true; }
            if (index < 0) {
                return null;
            }
            var length = this._keys.length;
            if (index >= length) {
                if (loop) {
                    index = index % length;
                }
                else {
                    index = length - 1;
                }
            }
            return this._keys[index];
        };
        Object.defineProperty(Baseline.prototype, "current", {
            // -------------------------------------------------------------------------
            get: function () {
                return this.at(this._currentIndex);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Baseline.prototype, "currentIndex", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._currentIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Baseline.prototype, "next", {
            // -------------------------------------------------------------------------
            get: function () {
                return this.at(this._nextIndex);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Baseline.prototype, "nextIndex", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._nextIndex;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        Baseline.prototype.step = function (time) {
            var index = this._nextIndex;
            // get key at current position
            var key = this._keys[index];
            var keyTime = key.time;
            // if current key time is bigger than time for stepTo, then we must first go till end of timeline and then continue from beginning
            var loop = time < this._lastTime;
            if ((!loop && (keyTime > this._lastTime && keyTime <= time)) ||
                (loop && (keyTime > this._lastTime || keyTime <= time))) {
                this._lastTime = keyTime;
                this._currentIndex = index;
                if ((++index) >= this._keys.length) {
                    index = 0;
                }
                this._nextIndex = index;
                return key;
            }
            return null;
        };
        Object.defineProperty(Baseline.prototype, "lastTime", {
            // -------------------------------------------------------------------------
            set: function (time) {
                this._lastTime = time;
            },
            enumerable: true,
            configurable: true
        });
        return Baseline;
    })(Spriter.Item);
    Spriter.Baseline = Baseline;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    // -------------------------------------------------------------------------
    function linear(a, b, t) {
        return ((b - a) * t) + a;
    }
    Spriter.linear = linear;
    // -------------------------------------------------------------------------
    function quadratic(a, b, c, t) {
        return this.linear(this.linear(a, b, t), this.linear(b, c, t), t);
    }
    Spriter.quadratic = quadratic;
    // -------------------------------------------------------------------------
    function cubic(a, b, c, d, t) {
        return this.linear(this.quadratic(a, b, c, t), this.quadratic(b, c, d, t), t);
    }
    Spriter.cubic = cubic;
    // -------------------------------------------------------------------------
    function angleLinear(angleA, angleB, spin, t) {
        // no spin
        if (spin === 0) {
            return angleA;
        }
        // spin left
        if (spin > 0) {
            if (angleB > angleA) {
                angleB -= 360;
            }
        }
        else {
            if (angleB < angleA) {
                angleB += 360;
            }
        }
        return this.linear(angleA, angleB, t);
    }
    Spriter.angleLinear = angleLinear;
})(Spriter || (Spriter = {}));
/// <reference path="Item.ts" />
var Spriter;
(function (Spriter) {
    var Variable = (function (_super) {
        __extends(Variable, _super);
        // -------------------------------------------------------------------------
        function Variable(id, name, type, defaultValue) {
            _super.call(this, id, name);
            this._type = type;
            this._default = defaultValue;
            this.reset();
        }
        // -------------------------------------------------------------------------
        Variable.prototype.clone = function () {
            return new Variable(this.id, this.name, this.type, this._default);
        };
        // -------------------------------------------------------------------------
        Variable.prototype.reset = function () {
            this.value = this._default;
        };
        Object.defineProperty(Variable.prototype, "type", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Variable.prototype, "value", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._value;
            },
            // -------------------------------------------------------------------------
            set: function (value) {
                if (this._type === Spriter.eVariableType.INT) {
                    this._value = Math.floor(value);
                }
                else {
                    this._value = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Variable.prototype, "int", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Variable.prototype, "float", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Variable.prototype, "string", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        return Variable;
    })(Spriter.Item);
    Spriter.Variable = Variable;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Varline = (function (_super) {
        __extends(Varline, _super);
        // -------------------------------------------------------------------------
        function Varline(id, varDefId) {
            _super.call(this, id, null);
            this._varDefId = varDefId;
            this.type = Spriter.eTimelineType.VAR_LINE;
        }
        Object.defineProperty(Varline.prototype, "varDefId", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._varDefId;
            },
            enumerable: true,
            configurable: true
        });
        return Varline;
    })(Spriter.Baseline);
    Spriter.Varline = Varline;
})(Spriter || (Spriter = {}));
/// <reference path="Item.ts" />
var Spriter;
(function (Spriter) {
    var ObjectInfo = (function (_super) {
        __extends(ObjectInfo, _super);
        // -------------------------------------------------------------------------
        function ObjectInfo(id, name, type, width, height, pivotX, pivotY) {
            _super.call(this, id, name);
            this._type = type;
            this._width = width;
            this._height = height;
            this._pivotX = pivotX;
            this._pivotY = pivotY;
        }
        Object.defineProperty(ObjectInfo.prototype, "type", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectInfo.prototype, "width", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectInfo.prototype, "height", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectInfo.prototype, "pivotX", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._pivotX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectInfo.prototype, "pivotY", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._pivotY;
            },
            enumerable: true,
            configurable: true
        });
        return ObjectInfo;
    })(Spriter.Item);
    Spriter.ObjectInfo = ObjectInfo;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    (function (eObjectType) {
        eObjectType[eObjectType["SPRITE"] = 0] = "SPRITE";
        eObjectType[eObjectType["BONE"] = 1] = "BONE";
        eObjectType[eObjectType["BOX"] = 2] = "BOX";
        eObjectType[eObjectType["POINT"] = 3] = "POINT";
        eObjectType[eObjectType["SOUND"] = 4] = "SOUND";
    })(Spriter.eObjectType || (Spriter.eObjectType = {}));
    var eObjectType = Spriter.eObjectType;
    (function (eCurveType) {
        eCurveType[eCurveType["LINEAR"] = 0] = "LINEAR";
        eCurveType[eCurveType["INSTANT"] = 1] = "INSTANT";
        eCurveType[eCurveType["QUADRATIC"] = 2] = "QUADRATIC";
        eCurveType[eCurveType["CUBIC"] = 3] = "CUBIC";
    })(Spriter.eCurveType || (Spriter.eCurveType = {}));
    var eCurveType = Spriter.eCurveType;
    (function (eVariableType) {
        eVariableType[eVariableType["INT"] = 0] = "INT";
        eVariableType[eVariableType["FLOAT"] = 1] = "FLOAT";
        eVariableType[eVariableType["STRING"] = 2] = "STRING";
    })(Spriter.eVariableType || (Spriter.eVariableType = {}));
    var eVariableType = Spriter.eVariableType;
    var Types = (function () {
        function Types() {
        }
        // -------------------------------------------------------------------------
        Types.getObjectTypeForName = function (typeName) {
            var type = Types.nameToObjectType[typeName];
            if (type === undefined) {
                console.error("Unknown type of object: " + typeName);
            }
            return type;
        };
        // -------------------------------------------------------------------------
        Types.getCurveTypeForName = function (typeName) {
            var type = Types.nameToCurveType[typeName];
            if (type === undefined) {
                console.error("Unknown type of curve: " + typeName);
            }
            return type;
        };
        // -------------------------------------------------------------------------
        Types.getVariableTypeForName = function (typeName) {
            var type = Types.nameToVariableType[typeName];
            if (type === undefined) {
                console.error("Unknown type of variable: " + typeName);
            }
            return type;
        };
        Types.nameToObjectType = {
            "sprite": eObjectType.SPRITE,
            "bone": eObjectType.BONE,
            "box": eObjectType.BOX,
            "point": eObjectType.POINT,
            "sound": eObjectType.SOUND
        };
        Types.nameToCurveType = {
            "instatnt": eCurveType.INSTANT,
            "linear": eCurveType.LINEAR,
            "quadratic": eCurveType.QUADRATIC,
            "cubic": eCurveType.CUBIC
        };
        Types.nameToVariableType = {
            "int": eVariableType.INT,
            "float": eVariableType.FLOAT,
            "string": eVariableType.STRING
        };
        return Types;
    })();
    Spriter.Types = Types;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Ref = (function () {
        // -------------------------------------------------------------------------
        function Ref(id, parent, timeline, key, z) {
            if (z === void 0) { z = 0; }
            this.id = id;
            this.parent = parent;
            this.timeline = timeline;
            this.key = key;
            this.z = z;
        }
        return Ref;
    })();
    Spriter.Ref = Ref;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Timeline = (function (_super) {
        __extends(Timeline, _super);
        // -------------------------------------------------------------------------
        function Timeline(id, name, type, objectRef) {
            if (type === void 0) { type = Spriter.eObjectType.SPRITE; }
            if (objectRef === void 0) { objectRef = -1; }
            _super.call(this, id, name);
            this.type = Spriter.eTimelineType.TIME_LINE;
            this._objectType = type;
            this._objectRef = objectRef;
        }
        Object.defineProperty(Timeline.prototype, "objectType", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._objectType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timeline.prototype, "objectRef", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._objectRef;
            },
            enumerable: true,
            configurable: true
        });
        return Timeline;
    })(Spriter.Baseline);
    Spriter.Timeline = Timeline;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var KeyTimeline = (function (_super) {
        __extends(KeyTimeline, _super);
        // -------------------------------------------------------------------------
        function KeyTimeline(id, time, spin) {
            _super.call(this, id, time);
            this._info = new Spriter.SpatialInfo();
            this._spin = spin;
            this.setCurve(Spriter.eCurveType.LINEAR);
        }
        // -------------------------------------------------------------------------
        KeyTimeline.prototype.setCurve = function (curveType, c1, c2, c3, c4) {
            if (c1 === void 0) { c1 = 0; }
            if (c2 === void 0) { c2 = 0; }
            if (c3 === void 0) { c3 = 0; }
            if (c4 === void 0) { c4 = 0; }
            this._curveType = curveType;
            this._c1 = c1;
            this._c2 = c2;
            this._c3 = c3;
            this._c4 = c4;
        };
        Object.defineProperty(KeyTimeline.prototype, "spin", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._spin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyTimeline.prototype, "curveType", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._curveType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyTimeline.prototype, "c1", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._c1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyTimeline.prototype, "c2", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._c2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyTimeline.prototype, "c3", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._c3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyTimeline.prototype, "c4", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._c4;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyTimeline.prototype, "info", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._info;
            },
            enumerable: true,
            configurable: true
        });
        return KeyTimeline;
    })(Spriter.Key);
    Spriter.KeyTimeline = KeyTimeline;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpatialInfo = (function () {
        function SpatialInfo() {
            this.x = 0;
            this.y = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.pivotX = 0;
            this.pivotY = 0;
            this.alpha = 1;
            this.angle = 0;
        }
        return SpatialInfo;
    })();
    Spriter.SpatialInfo = SpatialInfo;
})(Spriter || (Spriter = {}));
/// <reference path="KeyTimeline.ts" />
var Spriter;
(function (Spriter) {
    var KeyObject = (function (_super) {
        __extends(KeyObject, _super);
        function KeyObject() {
            _super.apply(this, arguments);
        }
        // -------------------------------------------------------------------------
        KeyObject.prototype.setFolderAndFile = function (folder, file) {
            this._folder = folder;
            this._file = file;
        };
        Object.defineProperty(KeyObject.prototype, "folder", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._folder;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyObject.prototype, "file", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._file;
            },
            enumerable: true,
            configurable: true
        });
        return KeyObject;
    })(Spriter.KeyTimeline);
    Spriter.KeyObject = KeyObject;
})(Spriter || (Spriter = {}));
/// <reference path="KeyTimeline.ts" />
var Spriter;
(function (Spriter) {
    var KeyBone = (function (_super) {
        __extends(KeyBone, _super);
        function KeyBone() {
            _super.apply(this, arguments);
        }
        return KeyBone;
    })(Spriter.KeyTimeline);
    Spriter.KeyBone = KeyBone;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Loader = (function () {
        function Loader() {
        }
        // -------------------------------------------------------------------------
        Loader.prototype.load = function (file) {
            this._spriter = new Spriter.Spriter();
            this._fileType = file.getType();
            // folders and files
            var folders = file.getNodes("folder");
            this.loadFolders(this._spriter, folders);
            folders.processed();
            // tags
            var tags = file.getNodes("tag_list");
            this.loadTags(this._spriter, tags);
            tags.processed();
            // entity
            var entities = file.getNodes("entity");
            this.loadEntities(this._spriter, entities);
            entities.processed();
            return this._spriter;
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadFolders = function (spriter, folders) {
            // through all folders
            for (var i = 0; i < folders.length(); i++) {
                var folder = folders.getFolder(i);
                // images in folder - ignore sounds
                var files = folders.getChildNodes(i, "file");
                this.loadFiles(folder, files);
                files.processed();
                // add folder to spriter object
                spriter.addFolder(folder);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadFiles = function (folder, files) {
            for (var f = 0; f < files.length(); f++) {
                var file = files.getFile(f);
                // null is returned if file is not image but sound
                if (file !== null) {
                    folder.addFile(file);
                }
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadTags = function (spriter, tags) {
            // no tags
            if (tags.length() === 0) {
                return;
            }
            var tagDefs = tags.getChildNodes(0, "i");
            for (var i = 0; i < tagDefs.length(); i++) {
                var tag = tagDefs.getTag(i);
                spriter.addTag(tag);
            }
            tagDefs.processed();
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadEntities = function (spriter, entities) {
            for (var i = 0; i < entities.length(); i++) {
                var entity = entities.getEntity(i);
                // bones, boxes, ...
                var objInfos = entities.getChildNodes(i, "obj_info");
                this.loadObjInfo(entity, objInfos);
                objInfos.processed();
                // character maps
                var charMaps = entities.getChildNodes(i, "character_map");
                this.loadCharMaps(entity, charMaps);
                charMaps.processed();
                // variable definitions
                var variables = entities.getChildNodes(i, "var_defs");
                this.loadVariables(entity, variables);
                variables.processed();
                // animations
                var animations = entities.getChildNodes(i, "animation");
                this.loadAnimations(entity, animations);
                animations.processed();
                spriter.addEntity(entity);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadObjInfo = function (entity, objInfos) {
            for (var i = 0; i < objInfos.length(); i++) {
                var objInfo = objInfos.getObjectInfo(i);
                entity.addObjectInfo(objInfo);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadCharMaps = function (entity, charMaps) {
            for (var i = 0; i < charMaps.length(); i++) {
                var charMap = charMaps.getCharMap(i);
                var charMapEntries = charMaps.getChildNodes(i, "map");
                this.loadCharMapEntries(charMap, charMapEntries);
                charMapEntries.processed();
                entity.addCharMap(charMap);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadCharMapEntries = function (charMap, charMapEntries) {
            for (var i = 0; i < charMapEntries.length(); i++) {
                charMapEntries.getCharMapEntry(i, charMap, this._spriter);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadVariables = function (entity, variables) {
            // no variables
            if (variables.length() === 0) {
                return;
            }
            // different structure for json than for xml
            var varDefs;
            if (this._fileType !== Spriter.eFileType.JSON) {
                varDefs = variables.getChildNodes(0, "i");
            }
            else {
                varDefs = variables;
            }
            for (var i = 0; i < varDefs.length(); i++) {
                var varDef = varDefs.getVariable(i);
                entity.addVariable(varDef);
            }
            // different structure for json than for xml
            if (this._fileType !== Spriter.eFileType.JSON) {
                varDefs.processed();
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadAnimations = function (entity, animations) {
            for (var i = 0; i < animations.length(); i++) {
                var animation = animations.getAnimation(i);
                // main line keys
                var mainlines = animations.getChildNodes(i, "mainline");
                this.loadMainline(animation, mainlines);
                mainlines.processed();
                // timelines
                var timelines = animations.getChildNodes(i, "timeline");
                this.loadTimelines(animation, timelines);
                timelines.processed();
                // sound lines
                var soundlines = animations.getChildNodes(i, "soundline");
                this.loadSoundlines(animation, soundlines);
                soundlines.processed();
                // event lines
                var eventlines = animations.getChildNodes(i, "eventline");
                this.loadEventlines(animation, eventlines);
                eventlines.processed();
                // get meta tag
                var meta = animations.getChildNodes(i, "meta");
                if (meta.length() > 0) {
                    // var lines
                    // OMG - typo in attribute name in JSOUN export... what the hell! TODO - remove when corrected
                    var varlines = meta.getChildNodes(0, (this._fileType !== Spriter.eFileType.JSON) ? "varline" : "valline");
                    this.loadVarlines(entity, animation, varlines);
                    varlines.processed();
                    // tag lines
                    var taglines = meta.getChildNodes(0, "tagline");
                    this.loadTaglines(animation, taglines);
                    taglines.processed();
                }
                meta.processed();
                // add completely built animation to entity
                entity.addAnimation(animation);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadMainline = function (animation, mainlines) {
            var mainline = mainlines.getMainline(0);
            mainline.type = Spriter.eTimelineType.MAIN_LINE;
            var mainlineKeys = mainlines.getChildNodes(0, "key");
            this.loadMainlineKeys(mainline, mainlineKeys);
            mainlineKeys.processed();
            animation.mainline = mainline;
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadMainlineKeys = function (mainline, mainlineKeys) {
            for (var i = 0; i < mainlineKeys.length(); i++) {
                var mainLineKey = mainlineKeys.getMainlineKey(i);
                // load bone refs
                var boneRefs = mainlineKeys.getChildNodes(i, "bone_ref");
                for (var b = 0; b < boneRefs.length(); b++) {
                    mainLineKey.addBoneRef(boneRefs.getRef(b));
                }
                boneRefs.processed();
                // load sprite refs (object refs)
                var spriteRefs = mainlineKeys.getChildNodes(i, "object_ref");
                for (var s = 0; s < spriteRefs.length(); s++) {
                    mainLineKey.addObjectRef(spriteRefs.getRef(s));
                }
                spriteRefs.processed();
                mainline.add(mainLineKey);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadTimelines = function (animation, aTimelines) {
            for (var i = 0; i < aTimelines.length(); i++) {
                var timeline = aTimelines.getTimeline(i);
                var keys = aTimelines.getChildNodes(i, "key");
                this.loadTimelineKeys(timeline, keys);
                keys.processed();
                animation.addTimeline(timeline);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadTimelineKeys = function (aTimeline, aKeys) {
            for (var i = 0; i < aKeys.length(); i++) {
                var key = aKeys.getTimelineKey(i, this._spriter);
                aTimeline.add(key);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadSoundlines = function (animation, soundlines) {
            for (var i = 0; i < soundlines.length(); i++) {
                var soundline = soundlines.getSoundline(i);
                soundline.type = Spriter.eTimelineType.SOUND_LINE;
                var keys = soundlines.getChildNodes(i, "key");
                this.loadKeys(soundline, keys);
                keys.processed();
                animation.addLine(soundline);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadKeys = function (timeline, keys) {
            for (var i = 0; i < keys.length(); i++) {
                var key = keys.getKey(i);
                timeline.add(key);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadEventlines = function (animation, eventlines) {
            for (var i = 0; i < eventlines.length(); i++) {
                var eventline = eventlines.getEventline(i);
                eventline.type = Spriter.eTimelineType.EVENT_LINE;
                var keys = eventlines.getChildNodes(i, "key");
                this.loadKeys(eventline, keys);
                keys.processed();
                animation.addLine(eventline);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadTaglines = function (animation, taglines) {
            for (var i = 0; i < taglines.length(); i++) {
                var tagline = taglines.getTagline(i);
                tagline.type = Spriter.eTimelineType.TAG_LINE;
                var keys = taglines.getChildNodes(i, "key");
                this.loadTagKeys(tagline, keys);
                keys.processed();
                animation.addLine(tagline);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadTagKeys = function (tagline, keys) {
            for (var i = 0; i < keys.length(); i++) {
                var key = keys.getTagKey(i);
                var tagChangeElements = keys.getChildNodes(i, "tag");
                var tagChanges = tagChangeElements.getTagChanges(this._spriter);
                tagChangeElements.processed();
                key.tagsOn = tagChanges;
                tagline.add(key);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadVarlines = function (entity, animation, varlines) {
            for (var i = 0; i < varlines.length(); i++) {
                var varline = varlines.getVarline(i);
                var type = entity.getVariableById(varline.varDefId).type;
                var keys = varlines.getChildNodes(i, "key");
                this.loadVariableKeys(varline, keys, type);
                keys.processed();
                animation.addLine(varline);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadVariableKeys = function (varline, keys, type) {
            for (var i = 0; i < keys.length(); i++) {
                var key = keys.getVariableKey(i, type);
                varline.add(key);
            }
        };
        return Loader;
    })();
    Spriter.Loader = Loader;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter_1) {
    var Spriter = (function () {
        // -------------------------------------------------------------------------
        function Spriter() {
            this._folders = new Spriter_1.IdNameMap();
            this._tags = new Spriter_1.IdNameMap();
            this._entities = new Spriter_1.IdNameMap();
        }
        // -------------------------------------------------------------------------
        Spriter.prototype.addFolder = function (folder) {
            this._folders.add(folder, folder.id, folder.name);
        };
        // -------------------------------------------------------------------------
        Spriter.prototype.getFolderById = function (id) {
            return this._folders.getById(id);
        };
        // -------------------------------------------------------------------------
        Spriter.prototype.getFolderByName = function (name) {
            return this._folders.getByName(name);
        };
        // -------------------------------------------------------------------------
        Spriter.prototype.addEntity = function (entity) {
            this._entities.add(entity, entity.id, entity.name);
        };
        // -------------------------------------------------------------------------
        Spriter.prototype.getEntityById = function (id) {
            return this._entities.getById(id);
        };
        // -------------------------------------------------------------------------
        Spriter.prototype.getEntityByName = function (name) {
            return this._entities.getByName(name);
        };
        // -------------------------------------------------------------------------
        Spriter.prototype.addTag = function (tag) {
            this._tags.add(tag, tag.id, tag.name);
        };
        // -------------------------------------------------------------------------
        Spriter.prototype.getTagById = function (id) {
            return this._tags.getById(id);
        };
        // -------------------------------------------------------------------------
        Spriter.prototype.getTagByName = function (name) {
            return this._tags.getByName(name);
        };
        Object.defineProperty(Spriter.prototype, "tagsLength", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._tags.length;
            },
            enumerable: true,
            configurable: true
        });
        return Spriter;
    })();
    Spriter_1.Spriter = Spriter;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpriterBone = (function () {
        // -------------------------------------------------------------------------
        function SpriterBone() {
            this.timeline = -1;
            this.timelineKey = -1;
            this.transformed = new Spriter.SpatialInfo();
        }
        // -------------------------------------------------------------------------
        SpriterBone.prototype.setOn = function (on) {
            this._on = on;
        };
        Object.defineProperty(SpriterBone.prototype, "on", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._on;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        SpriterBone.prototype.setKey = function (entity, animation, timelineId, keyId) {
            this.timeline = timelineId;
            this.timelineKey = keyId;
            var timeline = animation.getTimelineById(timelineId);
            this.name = timeline.name;
            this.objectInfo = (timeline.objectRef === -1) ? null : entity.getObjectInfoById(timeline.objectRef);
            var keyFrom = timeline.at(keyId);
            // in the end loop to first key. If animation is not looping, then repeat last key
            var keyTo = (timeline.at(keyId + 1, animation.loopType !== Spriter.eAnimationLooping.NO_LOOPING));
            this.key = keyFrom;
            this.timeFrom = keyFrom.time;
            this.timeTo = keyTo.time;
            // if loop to key 0
            if (this.timeTo < this.timeFrom) {
                this.timeTo = animation.length;
            }
            this.from = keyFrom.info;
            this.to = keyTo.info;
            // create update mask
            this.updateMask = 0;
            if (Math.abs(this.from.x - this.to.x) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_X;
            }
            if (Math.abs(this.from.y - this.to.y) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_Y;
            }
            if (Math.abs(this.from.scaleX - this.to.scaleX) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_SCALE_X;
            }
            if (Math.abs(this.from.scaleY - this.to.scaleY) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_SCALE_Y;
            }
            if (Math.abs(this.from.pivotX - this.to.pivotX) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_PIVOT_X;
            }
            if (Math.abs(this.from.pivotY - this.to.pivotY) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_PIVOT_Y;
            }
            if (Math.abs(this.from.alpha - this.to.alpha) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_ALPHA;
            }
            if (Math.abs(this.from.angle - this.to.angle) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_ANGLE;
            }
            // init data
            this.transformed.x = this.from.x;
            this.transformed.y = this.from.y;
            this.transformed.scaleX = this.from.scaleX;
            this.transformed.scaleY = this.from.scaleY;
            this.transformed.pivotX = this.from.pivotX;
            this.transformed.pivotY = this.from.pivotY;
            this.transformed.angle = this.from.angle;
            this.transformed.alpha = this.from.alpha;
        };
        // -------------------------------------------------------------------------
        SpriterBone.prototype.tween = function (time) {
            // calculate normalized time
            //var t = Phaser.Math.clamp((time - this.timeFrom) / (this.timeTo - this.timeFrom), 0, 1);
            var t = (this.updateMask > 0) ? this.getTweenTime(time) : 0;
            this.transformed.x = (this.updateMask & SpriterBone.UPDATE_X) > 0 ?
                Spriter.linear(this.from.x, this.to.x, t) : this.from.x;
            this.transformed.y = (this.updateMask & SpriterBone.UPDATE_Y) > 0 ?
                Spriter.linear(this.from.y, this.to.y, t) : this.from.y;
            this.transformed.scaleX = (this.updateMask & SpriterBone.UPDATE_SCALE_X) > 0 ?
                Spriter.linear(this.from.scaleX, this.to.scaleX, t) : this.from.scaleX;
            this.transformed.scaleY = (this.updateMask & SpriterBone.UPDATE_SCALE_Y) > 0 ?
                Spriter.linear(this.from.scaleY, this.to.scaleY, t) : this.from.scaleY;
            this.transformed.pivotX = (this.updateMask & SpriterBone.UPDATE_PIVOT_X) > 0 ?
                Spriter.linear(this.from.pivotX, this.to.pivotX, t) : this.from.pivotX;
            this.transformed.pivotY = (this.updateMask & SpriterBone.UPDATE_PIVOT_Y) > 0 ?
                Spriter.linear(this.from.pivotY, this.to.pivotY, t) : this.from.pivotY;
            this.transformed.alpha = (this.updateMask & SpriterBone.UPDATE_ALPHA) > 0 ?
                Spriter.linear(this.from.alpha, this.to.alpha, t) : this.from.alpha;
            this.transformed.angle = (this.updateMask & SpriterBone.UPDATE_ANGLE) > 0 ?
                Spriter.angleLinear(this.from.angle, this.to.angle, this.key.spin, t) : this.from.angle;
        };
        // -------------------------------------------------------------------------
        SpriterBone.prototype.update = function (parent) {
            this.transformed.angle *= Phaser.Math.sign(parent.scaleX) * Phaser.Math.sign(parent.scaleY);
            this.transformed.angle += parent.angle;
            this.transformed.scaleX *= parent.scaleX;
            this.transformed.scaleY *= parent.scaleY;
            this.scalePosition(parent.scaleX, parent.scaleY);
            this.rotatePosition(parent.angle);
            this.translatePosition(parent.x, parent.y);
            this.transformed.alpha *= parent.alpha;
        };
        // -------------------------------------------------------------------------
        SpriterBone.prototype.scalePosition = function (parentScaleX, parentScaleY) {
            this.transformed.x *= parentScaleX;
            this.transformed.y *= parentScaleY;
        };
        // -------------------------------------------------------------------------
        SpriterBone.prototype.rotatePosition = function (parentAngle) {
            var x = this.transformed.x;
            var y = this.transformed.y;
            if (x !== 0 || y !== 0) {
                var rads = parentAngle * (Math.PI / 180);
                var cos = Math.cos(rads);
                var sin = Math.sin(rads);
                this.transformed.x = x * cos - y * sin;
                this.transformed.y = x * sin + y * cos;
            }
        };
        // -------------------------------------------------------------------------
        SpriterBone.prototype.translatePosition = function (parentX, parentY) {
            this.transformed.x += parentX;
            this.transformed.y += parentY;
        };
        // -------------------------------------------------------------------------
        SpriterBone.prototype.getTweenTime = function (time) {
            if (this.key.curveType === Spriter.eCurveType.INSTANT) {
                return 0;
            }
            var t = Phaser.Math.clamp((time - this.timeFrom) / (this.timeTo - this.timeFrom), 0, 1);
            switch (this.key.curveType) {
                case Spriter.eCurveType.LINEAR:
                    return t;
                case Spriter.eCurveType.QUADRATIC:
                    return Spriter.quadratic(0, this.key.c1, 1, t);
                case Spriter.eCurveType.CUBIC:
                    return Spriter.cubic(0, this.key.c1, this.key.c2, 1, t);
            }
            return 0;
        };
        SpriterBone.UPDATE_X = 1;
        SpriterBone.UPDATE_Y = 2;
        SpriterBone.UPDATE_SCALE_X = 4;
        SpriterBone.UPDATE_SCALE_Y = 8;
        SpriterBone.UPDATE_PIVOT_X = 16;
        SpriterBone.UPDATE_PIVOT_Y = 32;
        SpriterBone.UPDATE_ANGLE = 64;
        SpriterBone.UPDATE_ALPHA = 128;
        return SpriterBone;
    })();
    Spriter.SpriterBone = SpriterBone;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpriterGroup = (function (_super) {
        __extends(SpriterGroup, _super);
        // -------------------------------------------------------------------------
        function SpriterGroup(game, spriter, texutreKey, entityName, animation, animationSpeedPercent) {
            _super.call(this, game, null);
            // onLoop(SpriterGroup);
            this.onLoop = new Phaser.Signal();
            // onFinish(SpriterGroup);
            this.onFinish = new Phaser.Signal();
            // onSound(SpriterGroup, string); // string for line name which equals soud name without extension
            this.onSound = new Phaser.Signal();
            // onEvent(SpriterGroup, string); // string for line name which equals event name
            this.onEvent = new Phaser.Signal();
            // onTagChange(SpriterGroup, string, boolean); // string for tag name, boolean for change (true = set / false = unset)
            this.onTagChange = new Phaser.Signal();
            // onVariableSet(SpriterGroup, Variable); // Variable is Spriter variable def with access to value
            this.onVariableSet = new Phaser.Signal();
            this._bones = [];
            this._objects = [];
            this._tags = 0; // up to 32 tags - 1 per bit
            this._vars = [];
            this._paused = false;
            this._spriter = spriter;
            this._entityName = entityName;
            this._entity = spriter.getEntityByName(entityName);
            this._textureKey = texutreKey;
            this._root = new Spriter.SpatialInfo();
            // clone variables
            for (var i = 0; i < this._entity.variablesLength; i++) {
                this._vars[i] = this._entity.getVariableById(i).clone();
            }
            // create charmap stack
            this._charMapStack = new Spriter.CharMapStack(this._entity);
            // set animation speed
            if (animationSpeedPercent === undefined) {
                animationSpeedPercent = 100;
            }
            this.setAnimationSpeedPercent(animationSpeedPercent);
            // set animation
            if (animation === undefined || animation === null) {
                // set first animation
                this.playAnimationById(0);
            }
            else if (typeof animation === "number") {
                this.playAnimationById(animation);
            }
            else {
                this.playAnimationByName(animation);
            }
        }
        Object.defineProperty(SpriterGroup.prototype, "spriter", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._spriter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriterGroup.prototype, "entity", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._entity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriterGroup.prototype, "charMapStack", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._charMapStack;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriterGroup.prototype, "puased", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._paused;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriterGroup.prototype, "paused", {
            // -------------------------------------------------------------------------
            set: function (paused) {
                this.paused = paused;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriterGroup.prototype, "animationsCount", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._entity.animationsLength;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriterGroup.prototype, "currentAnimationName", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._animationName;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.pushCharMap = function (charMapName) {
            this._charMapStack.push(charMapName);
            this.resetSprites();
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.removeCharMap = function (charMapName) {
            this._charMapStack.remove(charMapName);
            this.resetSprites();
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.clearCharMaps = function () {
            this._charMapStack.reset();
            this.resetSprites();
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.resetSprites = function () {
            for (var i = 0; i < this._objects.length; i++) {
                this._objects[i].resetFile();
            }
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.isTagOn = function (tagName) {
            return this.isTagOnById(this._spriter.getTagByName(tagName).id);
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.isTagOnById = function (tagId) {
            return (this._tags & (1 << tagId)) > 0;
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.getVariable = function (varName) {
            return this.getVariableById(this._entity.getVariableByName(varName).id);
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.getVariableById = function (varId) {
            return this._vars[varId];
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.getObject = function (objectName) {
            for (var i = 0; i < this._objects.length; i++) {
                var object = this._objects[i];
                if (object.name === objectName) {
                    return object;
                }
            }
            return null;
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.setAnimationSpeedPercent = function (aAnimationSpeedPercent) {
            if (aAnimationSpeedPercent === void 0) { aAnimationSpeedPercent = 100; }
            this._animationSpeed = aAnimationSpeedPercent / 100;
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.playAnimationById = function (aAnimationId) {
            var animation = this._entity.getAnimationById(aAnimationId);
            if (animation === undefined || animation === null) {
                console.warn("Animation " + aAnimationId + " for entity " + this._entityName + " does not exist!");
                return;
            }
            this.playAnimation(animation);
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.playAnimationByName = function (aAnimationName) {
            var animation = this._entity.getAnimationByName(aAnimationName);
            if (animation === undefined || animation === null) {
                console.warn("Animation " + aAnimationName + " for entity " + this._entityName + " does not exist!");
                return;
            }
            this.playAnimation(animation);
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.playAnimation = function (aAnimation) {
            this._animationName = aAnimation.name;
            this._animation = aAnimation;
            this._finished = false;
            // reset time to beginning of animation and find first from and to keys
            this._animation.mainline.reset();
            this._time = 0;
            // reset all additional time lines (soundline, varline, tagline, eventline)
            aAnimation.resetLines();
            // reset tags
            this._tags = 0;
            // reset variables to defaults
            for (var i = 0; i < this._vars.length; i++) {
                this._vars[i].reset();
            }
            // create bones and sprites - based on data in mainLine key 0
            this.loadKeys(this._animation.mainline.at(0), true);
            // first update - to set correct positions
            this.updateCharacter();
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.setBones = function (aBones, aForce) {
            if (aForce === void 0) { aForce = false; }
            // switch off all existing bones
            for (var i = 0; i < this._bones.length; i++) {
                if (this._bones[i] !== undefined) {
                    this._bones[i].setOn(false);
                }
            }
            // go through all bones and add new ones if necessary and activate used ones
            for (var i = 0; i < aBones.length; i++) {
                var ref = aBones[i];
                // if bone does not exist add it and make active, else make it active only
                if (this._bones[ref.id] === undefined) {
                    var newBone = new Spriter.SpriterBone();
                    newBone.type = Spriter.eObjectType.BONE;
                    this._bones[ref.id] = newBone;
                }
                var bone = this._bones[ref.id];
                bone.setOn(true);
                bone.parent = ref.parent;
                if (bone.timelineKey !== ref.key || bone.timeline !== ref.timeline || aForce) {
                    bone.setKey(this._entity, this._animation, ref.timeline, ref.key);
                }
            }
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.setObjects = function (aObjects, aForce) {
            if (aForce === void 0) { aForce = false; }
            // switch off (kill) all existing sprites
            for (var i = 0; i < this._objects.length; i++) {
                if (this._objects[i] !== undefined) {
                    this._objects[i].setOn(false);
                }
            }
            // go through all objects/sprites and add new ones if necessary and activate used ones
            var zChange = false;
            for (var i = 0; i < aObjects.length; i++) {
                var ref = aObjects[i];
                var object = null;
                var sprite = null;
                // if sprite does not exist add it and make active, else make it active only
                if (this._objects[ref.id] === undefined) {
                    sprite = new Phaser.Sprite(this.game, 0, 0, this._textureKey);
                    object = new Spriter.SpriterObject(this, sprite);
                    this._objects[ref.id] = object;
                    this.add(sprite);
                }
                else {
                    object = this._objects[ref.id];
                    sprite = object.sprite;
                }
                object.parent = ref.parent;
                object.type = this._animation.getTimelineById(ref.timeline).objectType;
                // is it sprite or any other type of object? (box / point)
                if (object.type === Spriter.eObjectType.SPRITE) {
                    object.setOn(true);
                    if (object.sprite.z !== ref.z) {
                        object.sprite.z = ref.z;
                        zChange = true;
                    }
                }
                //// TODO remove - debug
                //else {
                //    object.setOn(true);
                //    if (object.type === eObjectType.POINT) {
                //        object.setOn(true);
                //        object.sprite.frameName = "DebugPoint";
                //        object.sprite.anchor.set(0.5, 0.5);
                //    } else if (object.type === eObjectType.BOX) {
                //        object.setOn(true);
                //        object.sprite.frameName = "DebugBox";
                //    }
                //}
                if (object.timelineKey !== ref.key || object.timeline !== ref.timeline || aForce) {
                    object.setKey(this._entity, this._animation, ref.timeline, ref.key);
                }
            }
            // need to sort sprites?
            if (zChange) {
                this.sort();
            }
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.loadKeys = function (keyMainline, force) {
            if (force === void 0) { force = false; }
            this.setBones(keyMainline.boneRefs, force);
            this.setObjects(keyMainline.objectRefs, force);
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.updateAnimation = function () {
            if (this._paused || this._finished) {
                return;
            }
            var mainline = this._animation.mainline;
            // check if in the end of animation and whether to loop or not
            if (this._time > this._animation.length) {
                if (this._animation.loopType === Spriter.eAnimationLooping.NO_LOOPING) {
                    this._time = this._animation.length;
                    this._finished = true;
                }
                else {
                    this._time -= this._animation.length;
                    this.onLoop.dispatch(this);
                }
            }
            // consume all new keys
            var key;
            while ((key = mainline.step(this._time)) !== null) {
                //console.log("got key at: " + key.time + " time: " + this._time);
                this.loadKeys(key);
                mainline.lastTime = key.time;
            }
            this.updateCharacter();
            this.updateLines();
            if (this._finished) {
                this.onFinish.dispatch(this);
            }
            this._time += (this.game.time.physicsElapsedMS * this._animationSpeed);
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.updateCharacter = function () {
            for (var i = 0; i < this._bones.length; i++) {
                var bone = this._bones[i];
                if (bone.on) {
                    var parentSpatial = (bone.parent === -1) ? this._root : this._bones[bone.parent].transformed;
                    bone.tween(this._time);
                    bone.update(parentSpatial);
                }
            }
            for (var i = 0; i < this._objects.length; i++) {
                var object = this._objects[i];
                if (object.on) {
                    var parentSpatial = (object.parent === -1) ? this._root : this._bones[object.parent].transformed;
                    object.tween(this._time);
                    object.update(parentSpatial);
                }
            }
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.updateLines = function () {
            for (var i = this._animation.linesLength - 1; i >= 0; i--) {
                var line = this._animation.getLineById(i);
                var key;
                while ((key = line.step(this._time)) !== null) {
                    switch (line.type) {
                        case Spriter.eTimelineType.SOUND_LINE:
                            //console.log("sound: " + line.name + " - key: " + key.id + ", time: " + key.time);
                            this.onSound.dispatch(this, line.name);
                            break;
                        case Spriter.eTimelineType.EVENT_LINE:
                            //console.log("event: " + line.name + " - key: " + key.id + ", time: " + key.time);
                            this.onEvent.dispatch(this, line.name);
                            break;
                        case Spriter.eTimelineType.TAG_LINE:
                            var tagsOn = key.tagsOn;
                            var tagChanges = this._tags ^ tagsOn;
                            this._tags = tagsOn;
                            // go through all changes
                            for (var j = 0; j < this._spriter.tagsLength; j++) {
                                var mask = 1 << j;
                                if (tagChanges & mask) {
                                    //console.log("tag change: " + this._spriter.getTagById(j).name + " value: " + ((tagsOn & mask) > 0) + " - key: " + key.id + ", time: " + key.time);
                                    this.onTagChange.dispatch(this, this._spriter.getTagById(j).name, (tagsOn & mask) > 0);
                                }
                            }
                            break;
                        case Spriter.eTimelineType.VAR_LINE:
                            var newVal = key.value;
                            var variable = this._vars[line.varDefId];
                            variable.value = newVal;
                            //console.log("var set: " + variable.name + " value: " + variable.value + " - key: " + key.id + ", time: " + key.time);
                            this.onVariableSet.dispatch(this, variable);
                            break;
                    }
                    line.lastTime = key.time;
                }
            }
        };
        return SpriterGroup;
    })(Phaser.Group);
    Spriter.SpriterGroup = SpriterGroup;
})(Spriter || (Spriter = {}));
/// <reference path="SpriterBone.ts" />
var Spriter;
(function (Spriter) {
    var SpriterObject = (function (_super) {
        __extends(SpriterObject, _super);
        // -------------------------------------------------------------------------
        function SpriterObject(parent, sprite) {
            _super.call(this);
            this._spriter = parent.spriter;
            this._charMapStack = parent.charMapStack;
            this._sprite = sprite;
        }
        Object.defineProperty(SpriterObject.prototype, "sprite", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._sprite;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        SpriterObject.prototype.setOn = function (on) {
            _super.prototype.setOn.call(this, on);
            this._sprite.exists = on;
            this._sprite.visible = (on && !this._hide);
        };
        // -------------------------------------------------------------------------
        SpriterObject.prototype.setKey = function (entity, animation, timelineId, keyId) {
            _super.prototype.setKey.call(this, entity, animation, timelineId, keyId);
            // set sprite - skip invisible objects - boxes, points
            if (this.type === Spriter.eObjectType.SPRITE) {
                var spriteKey = this.key;
                var file = this._spriter.getFolderById(spriteKey.folder).getFileById(spriteKey.file);
                this._file = file;
                this.setFile(file);
            }
            else {
                this._file = null;
            }
        };
        // -------------------------------------------------------------------------
        SpriterObject.prototype.resetFile = function () {
            if (this.type === Spriter.eObjectType.SPRITE) {
                this.setFile(this._file);
            }
        };
        // -------------------------------------------------------------------------
        SpriterObject.prototype.setFile = function (file) {
            file = this._charMapStack.getFile(file);
            if (file !== null) {
                this._hide = false;
                this._sprite.frameName = file.name;
            }
            else {
                this._hide = true;
                this._sprite.visible = false;
            }
        };
        // -------------------------------------------------------------------------
        SpriterObject.prototype.update = function (parent) {
            _super.prototype.update.call(this, parent);
            this.updateSprite();
        };
        // -------------------------------------------------------------------------
        SpriterObject.prototype.updateSprite = function () {
            var t = this.transformed;
            var s = this.sprite;
            s.position.set(t.x, t.y);
            s.scale.set(t.scaleX, t.scaleY);
            s.anchor.set(t.pivotX, t.pivotY);
            s.alpha = t.alpha;
            s.angle = t.angle;
        };
        return SpriterObject;
    })(Spriter.SpriterBone);
    Spriter.SpriterObject = SpriterObject;
})(Spriter || (Spriter = {}));
/// <reference path="../../lib/phaser.d.ts" />
var SpriterExample;
(function (SpriterExample) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        // -------------------------------------------------------------------------
        function Boot() {
            _super.call(this);
        }
        // -------------------------------------------------------------------------
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            // pause game when not focused
            this.stage.disableVisibilityChange = false;
        };
        // -------------------------------------------------------------------------
        Boot.prototype.create = function () {
            this.game.state.start("Preloader", true, false);
        };
        return Boot;
    })(Phaser.State);
    SpriterExample.Boot = Boot;
})(SpriterExample || (SpriterExample = {}));
var SpriterExample;
(function (SpriterExample) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        // -------------------------------------------------------------------------
        function Preloader() {
            _super.call(this);
        }
        // -------------------------------------------------------------------------
        Preloader.prototype.preload = function () {
            // load assets
            var path = SpriterExample.Global.assetsPath;
            //this.load.atlas("Hero", path + "Atlas.png", path + "Atlas.json");
            //this.load.xml("HeroDataXml", path + "Hero.xml");
            //this.load.json("HeroDataJSON", path + "Hero.json");
            //this.load.binary("HeroDataBin", path + "Hero.bin", this.onBinaryLoaded, this);
            // test
            this.load.atlas("TEST", path + "Atlas.png", path + "Atlas.json");
            this.load.xml("TESTXml", path + "TEST.xml");
            this.load.json("TESTJson", path + "TEST.json");
        };
        // -------------------------------------------------------------------------
        Preloader.prototype.onBinaryLoaded = function (key, data) {
            return data;
        };
        // -------------------------------------------------------------------------
        Preloader.prototype.create = function () {
            this.game.state.start("Test");
        };
        return Preloader;
    })(Phaser.State);
    SpriterExample.Preloader = Preloader;
})(SpriterExample || (SpriterExample = {}));
var SpriterExample;
(function (SpriterExample) {
    var Test = (function (_super) {
        __extends(Test, _super);
        // -------------------------------------------------------------------------
        function Test() {
            _super.call(this);
            this._text = "";
            // -------------------------------------------------------------------------
            // definitions if using minimized Spriter files
            this.minimizedDefinitions = {
                "name": "spriter_data",
                "minName": "s",
                "attributes": {
                    "scml_version": "v",
                    "generator": "g",
                    "generator_version": "gv"
                },
                "childElements": {
                    "folder": {
                        "name": "folder",
                        "minName": "d",
                        "attributes": {
                            "id": "i",
                            "name": "n"
                        },
                        "childElements": {
                            "file": {
                                "name": "file",
                                "minName": "f",
                                "attributes": {
                                    "id": "i",
                                    "name": "n",
                                    "width": "w",
                                    "height": "h",
                                    "pivot_x": "px",
                                    "pivot_y": "py"
                                }
                            }
                        }
                    },
                    "entity": {
                        "name": "entity",
                        "minName": "e",
                        "attributes": {
                            "id": "i",
                            "name": "n"
                        },
                        "childElements": {
                            "obj_info": {
                                "name": "obj_info",
                                "minName": "o",
                                "attributes": {
                                    "name": "n",
                                    "type": "t",
                                    "w": "w",
                                    "h": "h"
                                },
                                "childElements": {
                                    "frames": {
                                        "name": "frames",
                                        "minName": "f",
                                        "childElements": {
                                            "i": {
                                                "name": "i",
                                                "minName": "i",
                                                "attributes": {
                                                    "folder": "d",
                                                    "file": "f"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "animation": {
                                "name": "animation",
                                "minName": "a",
                                "attributes": {
                                    "id": "i",
                                    "name": "n",
                                    "length": "l",
                                    "interval": "t",
                                    "looping": "c"
                                },
                                "childElements": {
                                    "mainline": {
                                        "name": "mainline",
                                        "minName": "m",
                                        "childElements": {
                                            "key": {
                                                "name": "key",
                                                "minName": "k",
                                                "attributes": {
                                                    "id": "i",
                                                    "time": "t"
                                                },
                                                "childElements": {
                                                    "bone_ref": {
                                                        "name": "bone_ref",
                                                        "minName": "b",
                                                        "attributes": {
                                                            "id": "i",
                                                            "parent": "p",
                                                            "timeline": "t",
                                                            "key": "k"
                                                        }
                                                    },
                                                    "object_ref": {
                                                        "name": "object_ref",
                                                        "minName": "o",
                                                        "attributes": {
                                                            "id": "i",
                                                            "name": "n",
                                                            "timeline": "t",
                                                            "parent": "p",
                                                            "key": "k",
                                                            "z_index": "z",
                                                            "folder": "d",
                                                            "file": "f",
                                                            "abs_x": "ax",
                                                            "abs_y": "ay",
                                                            "abs_pivot_x": "apx",
                                                            "abs_pivot_y": "apy",
                                                            "abs_scale_x": "asx",
                                                            "abs_scale_y": "asy",
                                                            "abs_angle": "r",
                                                            "abs_a": "a"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "timeline": {
                                        "name": "timeline",
                                        "minName": "t",
                                        "attributes": {
                                            "id": "i",
                                            "name": "n",
                                            "obj": "o",
                                            "object_type": "t"
                                        },
                                        "childElements": {
                                            "key": {
                                                "name": "key",
                                                "minName": "k",
                                                "attributes": {
                                                    "id": "i",
                                                    "time": "t",
                                                    "spin": "s",
                                                    "curve_type": "ct",
                                                    "c1": "c1",
                                                    "c2": "c2"
                                                },
                                                "childElements": {
                                                    "bone": {
                                                        "name": "bone",
                                                        "minName": "b",
                                                        "attributes": {
                                                            "x": "x",
                                                            "y": "y",
                                                            "angle": "r",
                                                            "scale_x": "sx",
                                                            "scale_y": "sy"
                                                        }
                                                    },
                                                    "object": {
                                                        "name": "object",
                                                        "minName": "o",
                                                        "attributes": {
                                                            "folder": "d",
                                                            "file": "f",
                                                            "x": "x",
                                                            "y": "y",
                                                            "scale_x": "sx",
                                                            "scale_y": "sy",
                                                            "pivot_x": "px",
                                                            "pivot_y": "py",
                                                            "angle": "r",
                                                            "a": "a"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };
        }
        // -------------------------------------------------------------------------
        Test.prototype.create = function () {
            this.stage.backgroundColor = 0x527F68;
            //var spriterLoader = new Spriter.Loader();
            //var spriterFile = new Spriter.SpriterXml(this.cache.getXML("HeroDataXml") /*, this.minimizedDefinitions*/);
            ////var spriterFile = new Spriter.SpriterJSON(this.cache.getJSON("HeroDataJSON"), this.minimizedDefinitions);
            ////var spriterFile = new Spriter.SpriterBin(this.cache.getBinary("HeroDataBin"));
            //var spriterData = spriterLoader.load(spriterFile);
            //this.spriterGroup = new Spriter.SpriterGroup(this.game, spriterData, "Hero", "Player", 0, 100);
            //this.spriterGroup.position.setTo(320, 350);
            var spriterLoader = new Spriter.Loader();
            //var spriterFile = new Spriter.SpriterXml(this.cache.getXML("TESTXml"));
            var spriterFile = new Spriter.SpriterJSON(this.cache.getJSON("TESTJson"));
            var spriterData = spriterLoader.load(spriterFile);
            this._spriterGroup = new Spriter.SpriterGroup(this.game, spriterData, "TEST", "Hero", 0, 100);
            this._spriterGroup.position.setTo(420, 400);
            this._spriterGroup.onVariableSet.add(function (spriter, variable) {
                this._text = variable.string;
            }, this);
            this.world.add(this._spriterGroup);
            // cycle animations
            var animation = 0;
            var key = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            key.onDown.add(function () {
                animation = (animation + 1) % this._spriterGroup.animationsCount;
                this._spriterGroup.playAnimationById(animation);
            }, this);
            // change char maps
            var charMaps = ["Green", "Brush"];
            var charmapID = 0;
            key = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
            key.onDown.add(function () {
                if (charmapID >= this._spriterGroup.entity.charMapsLength) {
                    this._spriterGroup.clearCharMaps();
                    charmapID = 0;
                }
                else {
                    this._spriterGroup.pushCharMap(charMaps[charmapID]);
                    ++charmapID;
                }
            }, this);
        };
        // -------------------------------------------------------------------------
        Test.prototype.update = function () {
            this._spriterGroup.updateAnimation();
        };
        // -------------------------------------------------------------------------
        Test.prototype.render = function () {
            this.game.debug.text("Playing animation: " + this._spriterGroup.currentAnimationName + " (Press A to next...)", 50, 30, "rgb(255, 255, 255)");
            this.game.debug.text("Press C to cycle charmaps", 50, 46, "rgb(255, 255, 255)");
            this.game.debug.text(this._text, 180, 232, "rgb(255, 255, 255)");
        };
        return Test;
    })(Phaser.State);
    SpriterExample.Test = Test;
})(SpriterExample || (SpriterExample = {}));
var SpriterExample;
(function (SpriterExample) {
    var Global = (function () {
        function Global() {
        }
        // game derived from Phaser.Game
        Global.game = null;
        // game size
        Global.GAME_WIDTH = 640;
        Global.GAME_HEIGHT = 640;
        // assets path
        Global.assetsPath = "assets/";
        return Global;
    })();
    SpriterExample.Global = Global;
})(SpriterExample || (SpriterExample = {}));
var PhaserGlobal = {
    stopFocus: true
};
// -------------------------------------------------------------------------
window.onload = function () {
    SpriterExample.Global.game = new SpriterExample.Game();
};
/// <reference path="../lib/phaser.d.ts" />
var SpriterExample;
(function (SpriterExample) {
    var Game = (function (_super) {
        __extends(Game, _super);
        // -------------------------------------------------------------------------
        function Game() {
            Game.game = this;
            // init game
            _super.call(this, SpriterExample.Global.GAME_WIDTH, SpriterExample.Global.GAME_HEIGHT, Phaser.AUTO, "content", null /* , transparent, antialias, physicsConfig */);
            // states
            this.state.add("Boot", SpriterExample.Boot);
            this.state.add("Preloader", SpriterExample.Preloader);
            this.state.add("Test", SpriterExample.Test);
            // start
            this.state.start("Boot");
        }
        return Game;
    })(Phaser.Game);
    SpriterExample.Game = Game;
})(SpriterExample || (SpriterExample = {}));
//# sourceMappingURL=SpriterExample.js.map