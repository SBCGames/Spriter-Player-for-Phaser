(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Spriter", [], factory);
	else if(typeof exports === 'object')
		exports["Spriter"] = factory();
	else
		root["Spriter"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Spriter/IdNameMap.ts":
/*!**********************************!*\
  !*** ./src/Spriter/IdNameMap.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdNameMap = void 0;
var IdNameMap = /** @class */ (function () {
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
        enumerable: false,
        configurable: true
    });
    return IdNameMap;
}());
exports.IdNameMap = IdNameMap;


/***/ }),

/***/ "./src/Spriter/LineStepper.ts":
/*!************************************!*\
  !*** ./src/Spriter/LineStepper.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LineStepper = void 0;
var LineStepper = /** @class */ (function () {
    // -------------------------------------------------------------------------
    function LineStepper() {
        this.reset();
    }
    Object.defineProperty(LineStepper.prototype, "current", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._line.at(this._currentIndex);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineStepper.prototype, "currentIndex", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._currentIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineStepper.prototype, "next", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._line.at(this._nextIndex);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineStepper.prototype, "nextIndex", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._nextIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineStepper.prototype, "lastTime", {
        // -------------------------------------------------------------------------
        set: function (time) {
            this._lastTime = time;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineStepper.prototype, "line", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._line;
        },
        // -------------------------------------------------------------------------
        set: function (line) {
            this._line = line;
        },
        enumerable: false,
        configurable: true
    });
    // -------------------------------------------------------------------------
    LineStepper.prototype.reset = function () {
        this._lastTime = -1;
        this._currentIndex = -1;
        this._nextIndex = 0;
    };
    // -------------------------------------------------------------------------
    LineStepper.prototype.step = function (time) {
        var index = this._nextIndex;
        // get key at current position
        var key = this._line.keys[index];
        var keyTime = key.time;
        // if current key time is bigger than time for stepTo, then we must first go till end of timeline and then continue from beginning
        var loop = time < this._lastTime;
        if ((!loop && (keyTime > this._lastTime && keyTime <= time)) ||
            (loop && (keyTime > this._lastTime || keyTime <= time))) {
            this._lastTime = keyTime;
            this._currentIndex = index;
            if ((++index) >= this._line.keys.length) {
                index = 0;
            }
            this._nextIndex = index;
            return key;
        }
        else if (loop) {
            this._lastTime = -1;
        }
        return null;
    };
    return LineStepper;
}());
exports.LineStepper = LineStepper;


/***/ }),

/***/ "./src/Spriter/Loader/Loader.ts":
/*!**************************************!*\
  !*** ./src/Spriter/Loader/Loader.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Loader = void 0;
var Spriter_1 = __webpack_require__(/*! ../Spriter */ "./src/Spriter/Spriter.ts");
var SpriterFile_1 = __webpack_require__(/*! ./SpriterFile */ "./src/Spriter/Loader/SpriterFile.ts");
var Baseline_1 = __webpack_require__(/*! ../Structure/Baseline */ "./src/Spriter/Structure/Baseline.ts");
var Loader = /** @class */ (function () {
    function Loader() {
    }
    // -------------------------------------------------------------------------
    Loader.prototype.load = function (file) {
        this._spriter = new Spriter_1.Spriter();
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
        // different structure for json than for xml
        var tagDefs;
        if (this._fileType !== SpriterFile_1.eFileType.JSON) {
            tagDefs = tags.getChildNodes(0, "i");
        }
        else {
            tagDefs = tags;
        }
        for (var i = 0; i < tagDefs.length(); i++) {
            var tag = tagDefs.getTag(i);
            spriter.addTag(tag);
        }
        // different structure for json than for xml
        if (this._fileType !== SpriterFile_1.eFileType.JSON) {
            tagDefs.processed();
        }
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
        if (this._fileType !== SpriterFile_1.eFileType.JSON) {
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
        if (this._fileType !== SpriterFile_1.eFileType.JSON) {
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
                var varlines = meta.getChildNodes(0, (this._fileType !== SpriterFile_1.eFileType.JSON) ? "varline" : "valline");
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
        mainline.type = Baseline_1.eTimelineType.MAIN_LINE;
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
            soundline.type = Baseline_1.eTimelineType.SOUND_LINE;
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
            eventline.type = Baseline_1.eTimelineType.EVENT_LINE;
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
            tagline.type = Baseline_1.eTimelineType.TAG_LINE;
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
}());
exports.Loader = Loader;


/***/ }),

/***/ "./src/Spriter/Loader/NodeListJSON.ts":
/*!********************************************!*\
  !*** ./src/Spriter/Loader/NodeListJSON.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeListJSON = void 0;
var NodeListJSON = /** @class */ (function () {
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
}());
exports.NodeListJSON = NodeListJSON;


/***/ }),

/***/ "./src/Spriter/Loader/NodeListXml.ts":
/*!*******************************************!*\
  !*** ./src/Spriter/Loader/NodeListXml.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeListXml = void 0;
var NodeListXml = /** @class */ (function () {
    // -------------------------------------------------------------------------
    function NodeListXml(spriterXmlFile, nodeList /*NodeList*/) {
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
}());
exports.NodeListXml = NodeListXml;


/***/ }),

/***/ "./src/Spriter/Loader/SpriterFile.ts":
/*!*******************************************!*\
  !*** ./src/Spriter/Loader/SpriterFile.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpriterFile = exports.eImageNameType = exports.eFileType = void 0;
var eFileType;
(function (eFileType) {
    eFileType[eFileType["XML"] = 0] = "XML";
    eFileType[eFileType["JSON"] = 1] = "JSON";
    eFileType[eFileType["BIN"] = 2] = "BIN";
})(eFileType = exports.eFileType || (exports.eFileType = {}));
var eImageNameType;
(function (eImageNameType) {
    eImageNameType[eImageNameType["ORIGINAL"] = 0] = "ORIGINAL";
    eImageNameType[eImageNameType["NAME_ONLY"] = 1] = "NAME_ONLY";
    eImageNameType[eImageNameType["NAME_AND_EXTENSION"] = 2] = "NAME_AND_EXTENSION";
    eImageNameType[eImageNameType["FULL_PATH_NO_EXTENSION"] = 3] = "FULL_PATH_NO_EXTENSION";
})(eImageNameType = exports.eImageNameType || (exports.eImageNameType = {}));
var SpriterFile = /** @class */ (function () {
    // -------------------------------------------------------------------------
    function SpriterFile(options) {
        var hasOptions = typeof options !== "undefined" && options !== null;
        // type of image names (path / name / extension)
        this._imageNameType = (hasOptions && typeof options.imageNameType !== "undefined") ? options.imageNameType : eImageNameType.NAME_ONLY;
        // min defs are present?
        this._minDefs = (hasOptions && typeof options.minDefs !== "undefined") ? options.minDefs : null;
    }
    // -------------------------------------------------------------------------
    SpriterFile.prototype.processed = function () {
        this.popMinDefsStack();
    };
    // -------------------------------------------------------------------------
    SpriterFile.prototype.setMinimized = function (minimized) {
        this._minimized = minimized;
        if (minimized) {
            this._minDefsStack = [];
            if (this._minDefs === null) {
                console.error("Spriter file is minimized - you must provide object with name definitions");
                return;
            }
        }
    };
    // -------------------------------------------------------------------------
    SpriterFile.prototype.getFileName = function (path) {
        var name;
        switch (this._imageNameType) {
            case eImageNameType.NAME_ONLY:
                name = (path.split('\\').pop().split('/').pop().split('.'))[0];
                break;
            case eImageNameType.NAME_AND_EXTENSION:
                name = path.split('\\').pop().split('/').pop();
                break;
            case eImageNameType.FULL_PATH_NO_EXTENSION:
                name = (path.split('.'))[0];
                break;
            case eImageNameType.ORIGINAL:
                name = path;
                break;
        }
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
}());
exports.SpriterFile = SpriterFile;


/***/ }),

/***/ "./src/Spriter/Loader/SpriterJSON.ts":
/*!*******************************************!*\
  !*** ./src/Spriter/Loader/SpriterJSON.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpriterJSON = void 0;
var Animation_1 = __webpack_require__(/*! ../Structure/Animation */ "./src/Spriter/Structure/Animation.ts");
var Baseline_1 = __webpack_require__(/*! ../Structure/Baseline */ "./src/Spriter/Structure/Baseline.ts");
var CharMap_1 = __webpack_require__(/*! ../Structure/CharMap */ "./src/Spriter/Structure/CharMap.ts");
var Entity_1 = __webpack_require__(/*! ../Structure/Entity */ "./src/Spriter/Structure/Entity.ts");
var File_1 = __webpack_require__(/*! ../Structure/File */ "./src/Spriter/Structure/File.ts");
var Folder_1 = __webpack_require__(/*! ../Structure/Folder */ "./src/Spriter/Structure/Folder.ts");
var Item_1 = __webpack_require__(/*! ../Structure/Item */ "./src/Spriter/Structure/Item.ts");
var Key_1 = __webpack_require__(/*! ../Structure/Key */ "./src/Spriter/Structure/Key.ts");
var KeyBone_1 = __webpack_require__(/*! ../Structure/KeyBone */ "./src/Spriter/Structure/KeyBone.ts");
var KeyMainline_1 = __webpack_require__(/*! ../Structure/KeyMainline */ "./src/Spriter/Structure/KeyMainline.ts");
var KeyObject_1 = __webpack_require__(/*! ../Structure/KeyObject */ "./src/Spriter/Structure/KeyObject.ts");
var KeyTag_1 = __webpack_require__(/*! ../Structure/KeyTag */ "./src/Spriter/Structure/KeyTag.ts");
var KeyVariable_1 = __webpack_require__(/*! ../Structure/KeyVariable */ "./src/Spriter/Structure/KeyVariable.ts");
var ObjectInfo_1 = __webpack_require__(/*! ../Structure/ObjectInfo */ "./src/Spriter/Structure/ObjectInfo.ts");
var Ref_1 = __webpack_require__(/*! ../Structure/Ref */ "./src/Spriter/Structure/Ref.ts");
var Timeline_1 = __webpack_require__(/*! ../Structure/Timeline */ "./src/Spriter/Structure/Timeline.ts");
var Types_1 = __webpack_require__(/*! ../Structure/Types */ "./src/Spriter/Structure/Types.ts");
var Variable_1 = __webpack_require__(/*! ../Structure/Variable */ "./src/Spriter/Structure/Variable.ts");
var Varline_1 = __webpack_require__(/*! ../Structure/Varline */ "./src/Spriter/Structure/Varline.ts");
var NodeListJSON_1 = __webpack_require__(/*! ./NodeListJSON */ "./src/Spriter/Loader/NodeListJSON.ts");
var SpriterFile_1 = __webpack_require__(/*! ./SpriterFile */ "./src/Spriter/Loader/SpriterFile.ts");
var SpriterJSON = /** @class */ (function (_super) {
    __extends(SpriterJSON, _super);
    // -------------------------------------------------------------------------
    function SpriterJSON(JSONData, options) {
        var _this = _super.call(this, options) || this;
        _this._json = JSONData;
        var minimized = JSONData["min"] !== undefined;
        _this.setMinimized(minimized);
        return _this;
    }
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getType = function () {
        return SpriterFile_1.eFileType.JSON;
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
        return new NodeListJSON_1.NodeListJSON(this, (this._json[translatedName] !== undefined) ? this._json[translatedName] : []);
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getNodesForElement = function (element, nodeName) {
        this.setMinDefsToElementName(nodeName);
        var translatedName = this.translateElementName(nodeName);
        return new NodeListJSON_1.NodeListJSON(this, (element[translatedName] !== undefined) ? element[translatedName] : []);
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getFolder = function (element) {
        return new Folder_1.Folder(this.parseInt(element, "id"), this.parseString(element, "name"));
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getFile = function (element) {
        if (element["type"] !== undefined && element["type"] === "sound") {
            return null;
        }
        return new File_1.File(this.parseInt(element, "id"), this.getFileName(this.parseString(element, "name")), this.parseFloat(element, "pivot_x"), 1 - this.parseFloat(element, "pivot_y"));
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getTag = function (element) {
        return new Item_1.Item(this.parseInt(element, "id"), this.parseString(element, "name"));
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getEntity = function (element) {
        return new Entity_1.Entity(this.parseInt(element, "id"), this.parseString(element, "name"));
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getObjectInfo = function (element, index) {
        return new ObjectInfo_1.ObjectInfo(index, this.parseString(element, "name"), Types_1.Types.getObjectTypeForName(this.parseString(element, "type")), this.parseFloat(element, "w"), this.parseFloat(element, "h"), this.parseFloat(element, "pivot_x"), this.parseFloat(element, "pivot_y"));
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getCharMap = function (element) {
        return new CharMap_1.CharMap(this.parseInt(element, "id"), this.parseString(element, "name"));
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
        var type = Types_1.Types.getVariableTypeForName(this.parseString(element, "type"));
        return new Variable_1.Variable(this.parseInt(element, "id"), this.parseString(element, "name"), type, (type === 2 /* STRING */) ? this.parseString(element, "default") : this.parseFloat(element, "default", 0));
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getAnimation = function (element) {
        return new Animation_1.Animation(this.parseInt(element, "id"), this.parseString(element, "name"), this.parseFloat(element, "length"), this.parseBoolean(element, "looping", true) === true ? Animation_1.eAnimationLooping.LOOPING : Animation_1.eAnimationLooping.NO_LOOPING);
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getMainlineKey = function (element) {
        return new KeyMainline_1.KeyMainline(this.parseInt(element, "id"), this.parseFloat(element, "time"));
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getRef = function (element) {
        return new Ref_1.Ref(this.parseInt(element, "id"), this.parseInt(element, "parent", -1), this.parseInt(element, "timeline"), this.parseInt(element, "key"), this.parseInt(element, "z_index"));
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getTimeline = function (element) {
        return new Timeline_1.Timeline(this.parseInt(element, "id"), this.parseString(element, "name"), Types_1.Types.getObjectTypeForName(this.parseString(element, "object_type", "sprite")), this.parseInt(element, "obj", -1));
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getBaseline = function (element) {
        return new Baseline_1.Baseline(this.parseInt(element, "id"), this.parseString(element, "name", null));
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getVarline = function (element) {
        return new Varline_1.Varline(this.parseInt(element, "id"), this.parseInt(element, "def"));
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getKey = function (element) {
        return new Key_1.Key(this.parseInt(element, "id"), this.parseInt(element, "time"));
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getTagKey = function (element) {
        return new KeyTag_1.KeyTag(this.parseInt(element, "id"), this.parseInt(element, "time"));
    };
    // -------------------------------------------------------------------------
    SpriterJSON.prototype.getVariableKey = function (element, type) {
        return new KeyVariable_1.KeyVariable(this.parseInt(element, "id"), this.parseInt(element, "time"), (type === 2 /* STRING */) ? this.parseString(element, "val") : this.parseFloat(element, "val"));
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
            key = new KeyBone_1.KeyBone(index, time, spin);
            this.setMinDefsToElementName("bone");
        }
        else if (element[objectTag] !== undefined) {
            keyDataElm = element[objectTag];
            key = new KeyObject_1.KeyObject(index, time, spin);
            this.setMinDefsToElementName("object");
            sprite = true;
        }
        // other curve than linear?
        if (curve !== "linear") {
            key.setCurve(Types_1.Types.getCurveTypeForName(curve), c1, c2, c3, c4);
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
}(SpriterFile_1.SpriterFile));
exports.SpriterJSON = SpriterJSON;


/***/ }),

/***/ "./src/Spriter/Loader/SpriterXml.ts":
/*!******************************************!*\
  !*** ./src/Spriter/Loader/SpriterXml.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpriterXml = void 0;
var Animation_1 = __webpack_require__(/*! ../Structure/Animation */ "./src/Spriter/Structure/Animation.ts");
var Baseline_1 = __webpack_require__(/*! ../Structure/Baseline */ "./src/Spriter/Structure/Baseline.ts");
var CharMap_1 = __webpack_require__(/*! ../Structure/CharMap */ "./src/Spriter/Structure/CharMap.ts");
var Entity_1 = __webpack_require__(/*! ../Structure/Entity */ "./src/Spriter/Structure/Entity.ts");
var File_1 = __webpack_require__(/*! ../Structure/File */ "./src/Spriter/Structure/File.ts");
var Folder_1 = __webpack_require__(/*! ../Structure/Folder */ "./src/Spriter/Structure/Folder.ts");
var Item_1 = __webpack_require__(/*! ../Structure/Item */ "./src/Spriter/Structure/Item.ts");
var Key_1 = __webpack_require__(/*! ../Structure/Key */ "./src/Spriter/Structure/Key.ts");
var KeyBone_1 = __webpack_require__(/*! ../Structure/KeyBone */ "./src/Spriter/Structure/KeyBone.ts");
var KeyMainline_1 = __webpack_require__(/*! ../Structure/KeyMainline */ "./src/Spriter/Structure/KeyMainline.ts");
var KeyObject_1 = __webpack_require__(/*! ../Structure/KeyObject */ "./src/Spriter/Structure/KeyObject.ts");
var KeyTag_1 = __webpack_require__(/*! ../Structure/KeyTag */ "./src/Spriter/Structure/KeyTag.ts");
var KeyVariable_1 = __webpack_require__(/*! ../Structure/KeyVariable */ "./src/Spriter/Structure/KeyVariable.ts");
var ObjectInfo_1 = __webpack_require__(/*! ../Structure/ObjectInfo */ "./src/Spriter/Structure/ObjectInfo.ts");
var Ref_1 = __webpack_require__(/*! ../Structure/Ref */ "./src/Spriter/Structure/Ref.ts");
var Timeline_1 = __webpack_require__(/*! ../Structure/Timeline */ "./src/Spriter/Structure/Timeline.ts");
var Types_1 = __webpack_require__(/*! ../Structure/Types */ "./src/Spriter/Structure/Types.ts");
var Variable_1 = __webpack_require__(/*! ../Structure/Variable */ "./src/Spriter/Structure/Variable.ts");
var Varline_1 = __webpack_require__(/*! ../Structure/Varline */ "./src/Spriter/Structure/Varline.ts");
var NodeListXml_1 = __webpack_require__(/*! ./NodeListXml */ "./src/Spriter/Loader/NodeListXml.ts");
var SpriterFile_1 = __webpack_require__(/*! ./SpriterFile */ "./src/Spriter/Loader/SpriterFile.ts");
var SpriterXml = /** @class */ (function (_super) {
    __extends(SpriterXml, _super);
    // -------------------------------------------------------------------------
    function SpriterXml(xmlData, options) {
        var _this = _super.call(this, options) || this;
        _this._xml = xmlData;
        var minimized = xmlData.documentElement.hasAttribute("min");
        _this.setMinimized(minimized);
        return _this;
    }
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getType = function () {
        return SpriterFile_1.eFileType.XML;
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
        return new NodeListXml_1.NodeListXml(this, this._xml.documentElement.getElementsByTagName(translatedName));
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getNodesForElement = function (element, nodeName) {
        this.setMinDefsToElementName(nodeName);
        var translatedName = this.translateElementName(nodeName);
        return new NodeListXml_1.NodeListXml(this, element.getElementsByTagName(translatedName));
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getFolder = function (element) {
        return new Folder_1.Folder(this.parseInt(element, "id"), this.parseString(element, "name"));
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getFile = function (element) {
        if (element.hasAttribute("type") && element.getAttribute("type") === "sound") {
            return null;
        }
        return new File_1.File(this.parseInt(element, "id"), this.getFileName(this.parseString(element, "name")), this.parseFloat(element, "pivot_x"), 1 - this.parseFloat(element, "pivot_y"));
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getTag = function (element) {
        return new Item_1.Item(this.parseInt(element, "id"), this.parseString(element, "name"));
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getEntity = function (element) {
        return new Entity_1.Entity(this.parseInt(element, "id"), this.parseString(element, "name"));
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getObjectInfo = function (element, index) {
        return new ObjectInfo_1.ObjectInfo(index, this.parseString(element, "name"), Types_1.Types.getObjectTypeForName(this.parseString(element, "type")), this.parseFloat(element, "w"), this.parseFloat(element, "h"), this.parseFloat(element, "pivot_x"), this.parseFloat(element, "pivot_y"));
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getCharMap = function (element) {
        return new CharMap_1.CharMap(this.parseInt(element, "id"), this.parseString(element, "name"));
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
        var type = Types_1.Types.getVariableTypeForName(this.parseString(element, "type"));
        return new Variable_1.Variable(this.parseInt(element, "id"), this.parseString(element, "name"), type, (type === 2 /* STRING */) ? this.parseString(element, "default") : this.parseFloat(element, "default", 0));
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getAnimation = function (element) {
        return new Animation_1.Animation(this.parseInt(element, "id"), this.parseString(element, "name"), this.parseFloat(element, "length"), this.parseString(element, "looping", "true") === "true" ? Animation_1.eAnimationLooping.LOOPING : Animation_1.eAnimationLooping.NO_LOOPING);
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getMainlineKey = function (element) {
        return new KeyMainline_1.KeyMainline(this.parseInt(element, "id"), this.parseFloat(element, "time"));
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getRef = function (element) {
        return new Ref_1.Ref(this.parseInt(element, "id"), this.parseInt(element, "parent", -1), this.parseInt(element, "timeline"), this.parseInt(element, "key"), this.parseInt(element, "z_index"));
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getTimeline = function (element) {
        return new Timeline_1.Timeline(this.parseInt(element, "id"), this.parseString(element, "name"), Types_1.Types.getObjectTypeForName(this.parseString(element, "object_type", "sprite")), this.parseInt(element, "obj", -1));
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getBaseline = function (element) {
        return new Baseline_1.Baseline(this.parseInt(element, "id"), this.parseString(element, "name", null));
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getVarline = function (element) {
        return new Varline_1.Varline(this.parseInt(element, "id"), this.parseInt(element, "def"));
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getKey = function (element) {
        return new Key_1.Key(this.parseInt(element, "id"), this.parseInt(element, "time"));
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getTagKey = function (element) {
        return new KeyTag_1.KeyTag(this.parseInt(element, "id"), this.parseInt(element, "time"));
    };
    // -------------------------------------------------------------------------
    SpriterXml.prototype.getVariableKey = function (element, type) {
        return new KeyVariable_1.KeyVariable(this.parseInt(element, "id"), this.parseInt(element, "time"), (type === 2 /* STRING */) ? this.parseString(element, "val") : this.parseFloat(element, "val"));
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
            key = new KeyBone_1.KeyBone(index, time, spin);
            this.setMinDefsToElementName("bone");
        }
        else if (keyDataElm.tagName === objectTag) {
            this.setMinDefsToElementName("object");
            key = new KeyObject_1.KeyObject(index, time, spin);
            sprite = true;
        }
        // other curve than linear?
        if (curve !== "linear") {
            key.setCurve(Types_1.Types.getCurveTypeForName(curve), c1, c2, c3, c4);
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
}(SpriterFile_1.SpriterFile));
exports.SpriterXml = SpriterXml;


/***/ }),

/***/ "./src/Spriter/Math.ts":
/*!*****************************!*\
  !*** ./src/Spriter/Math.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.angleLinear = exports.bezier = exports.quintic = exports.quartic = exports.cubic = exports.quadratic = exports.linear = void 0;
// -------------------------------------------------------------------------
function linear(a, b, t) {
    return ((b - a) * t) + a;
}
exports.linear = linear;
// -------------------------------------------------------------------------
function quadratic(a, b, c, t) {
    return linear(linear(a, b, t), linear(b, c, t), t);
}
exports.quadratic = quadratic;
// -------------------------------------------------------------------------
function cubic(a, b, c, d, t) {
    return linear(quadratic(a, b, c, t), quadratic(b, c, d, t), t);
}
exports.cubic = cubic;
// -------------------------------------------------------------------------
function quartic(a, b, c, d, e, t) {
    return linear(cubic(a, b, c, d, t), cubic(b, c, d, e, t), t);
}
exports.quartic = quartic;
// -------------------------------------------------------------------------
function quintic(a, b, c, d, e, f, t) {
    return linear(quartic(a, b, c, d, e, t), quartic(b, c, d, e, f, t), t);
}
exports.quintic = quintic;
// -------------------------------------------------------------------------
// B(t) = (1 − t)^3 * P0 + 3(1 − t)^2 * t * P1 + 3(1 − t) *  t^2 * P2 + t^3 * P3  , 0 ≤ t ≤ 1.
function bezierCoord(p1, p2, t) {
    // p0 = 0, p3 = 1
    var p0 = 0;
    var p3 = 1;
    var u = 1 - t;
    var t2 = t * t;
    var u2 = u * u;
    var u3 = u2 * u;
    var t3 = t2 * t;
    return /*u3 * p0*/ 0 + 3 * u2 * t * p1 + 3 * u * t2 * p2 + t3 * p3;
}
// -------------------------------------------------------------------------
function bezier(p1x, p1y, p2x, p2y, t) {
    var epsilon = 0.001;
    var maxIterations = 10;
    // binary search
    //establish bounds
    var lower = 0;
    var upper = 1;
    var percent = (upper + lower) / 2;
    //initial x
    var x = bezierCoord(p1x, p2x, percent);
    //loop until returned x - t is less than epsilon
    var iterations = 0;
    while (Math.abs(t - x) > epsilon && iterations < maxIterations) {
        if (t > x) {
            lower = percent;
        }
        else {
            upper = percent;
        }
        percent = (upper + lower) / 2;
        x = bezierCoord(p1x, p2x, percent);
        ++iterations;
    }
    //we're within tolerance of the desired x value. Return the y value.
    return bezierCoord(p1y, p2y, percent);
}
exports.bezier = bezier;
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
    else { // spin right
        if (angleB < angleA) {
            angleB += 360;
        }
    }
    return linear(angleA, angleB, t);
}
exports.angleLinear = angleLinear;


/***/ }),

/***/ "./src/Spriter/Spriter.ts":
/*!********************************!*\
  !*** ./src/Spriter/Spriter.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Spriter = void 0;
var IdNameMap_1 = __webpack_require__(/*! ./IdNameMap */ "./src/Spriter/IdNameMap.ts");
var Spriter = /** @class */ (function () {
    // -------------------------------------------------------------------------
    function Spriter() {
        this._folders = new IdNameMap_1.IdNameMap();
        this._tags = new IdNameMap_1.IdNameMap();
        this._entities = new IdNameMap_1.IdNameMap();
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
        enumerable: false,
        configurable: true
    });
    return Spriter;
}());
exports.Spriter = Spriter;


/***/ }),

/***/ "./src/Spriter/SpriterBone.ts":
/*!************************************!*\
  !*** ./src/Spriter/SpriterBone.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpriterBone = void 0;
var Math_1 = __webpack_require__(/*! ./Math */ "./src/Spriter/Math.ts");
var Animation_1 = __webpack_require__(/*! ./Structure/Animation */ "./src/Spriter/Structure/Animation.ts");
var SpatialInfo_1 = __webpack_require__(/*! ./Structure/SpatialInfo */ "./src/Spriter/Structure/SpatialInfo.ts");
var SpriterBone = /** @class */ (function () {
    // -------------------------------------------------------------------------
    function SpriterBone() {
        this.timeline = -1;
        this.timelineKey = -1;
        this.transformed = new SpatialInfo_1.SpatialInfo();
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
        enumerable: false,
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
        var keyTo = (timeline.at(keyId + 1, animation.loopType !== Animation_1.eAnimationLooping.NO_LOOPING));
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
            (0, Math_1.linear)(this.from.x, this.to.x, t) : this.from.x;
        this.transformed.y = (this.updateMask & SpriterBone.UPDATE_Y) > 0 ?
            (0, Math_1.linear)(this.from.y, this.to.y, t) : this.from.y;
        this.transformed.scaleX = (this.updateMask & SpriterBone.UPDATE_SCALE_X) > 0 ?
            (0, Math_1.linear)(this.from.scaleX, this.to.scaleX, t) : this.from.scaleX;
        this.transformed.scaleY = (this.updateMask & SpriterBone.UPDATE_SCALE_Y) > 0 ?
            (0, Math_1.linear)(this.from.scaleY, this.to.scaleY, t) : this.from.scaleY;
        this.transformed.pivotX = (this.updateMask & SpriterBone.UPDATE_PIVOT_X) > 0 ?
            (0, Math_1.linear)(this.from.pivotX, this.to.pivotX, t) : this.from.pivotX;
        this.transformed.pivotY = (this.updateMask & SpriterBone.UPDATE_PIVOT_Y) > 0 ?
            (0, Math_1.linear)(this.from.pivotY, this.to.pivotY, t) : this.from.pivotY;
        this.transformed.alpha = (this.updateMask & SpriterBone.UPDATE_ALPHA) > 0 ?
            (0, Math_1.linear)(this.from.alpha, this.to.alpha, t) : this.from.alpha;
        this.transformed.angle = (this.updateMask & SpriterBone.UPDATE_ANGLE) > 0 ?
            (0, Math_1.angleLinear)(this.from.angle, this.to.angle, this.key.spin, t) : this.from.angle;
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
        if (this.key.curveType === 1 /* INSTANT */) {
            return 0;
        }
        var t = Phaser.Math.clamp((time - this.timeFrom) / (this.timeTo - this.timeFrom), 0, 1);
        switch (this.key.curveType) {
            case 0 /* LINEAR */:
                return t;
            case 2 /* QUADRATIC */:
                return (0, Math_1.quadratic)(0, this.key.c1, 1, t);
            case 3 /* CUBIC */:
                return (0, Math_1.cubic)(0, this.key.c1, this.key.c2, 1, t);
            case 4 /* QUARTIC */:
                return (0, Math_1.quartic)(0, this.key.c1, this.key.c2, this.key.c3, 1, t);
            case 5 /* QUINTIC */:
                return (0, Math_1.quintic)(0, this.key.c1, this.key.c2, this.key.c3, this.key.c4, 1, t);
            case 6 /* BEZIER */:
                return (0, Math_1.bezier)(this.key.c1, this.key.c2, this.key.c3, this.key.c4, t);
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
}());
exports.SpriterBone = SpriterBone;


/***/ }),

/***/ "./src/Spriter/SpriterGroup.ts":
/*!*************************************!*\
  !*** ./src/Spriter/SpriterGroup.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpriterGroup = void 0;
var LineStepper_1 = __webpack_require__(/*! ./LineStepper */ "./src/Spriter/LineStepper.ts");
var SpriterBone_1 = __webpack_require__(/*! ./SpriterBone */ "./src/Spriter/SpriterBone.ts");
var SpriterObject_1 = __webpack_require__(/*! ./SpriterObject */ "./src/Spriter/SpriterObject.ts");
var Animation_1 = __webpack_require__(/*! ./Structure/Animation */ "./src/Spriter/Structure/Animation.ts");
var Baseline_1 = __webpack_require__(/*! ./Structure/Baseline */ "./src/Spriter/Structure/Baseline.ts");
var CharMapStack_1 = __webpack_require__(/*! ./Structure/CharMapStack */ "./src/Spriter/Structure/CharMapStack.ts");
var SpatialInfo_1 = __webpack_require__(/*! ./Structure/SpatialInfo */ "./src/Spriter/Structure/SpatialInfo.ts");
var SpriterGroup = /** @class */ (function (_super) {
    __extends(SpriterGroup, _super);
    // -------------------------------------------------------------------------
    function SpriterGroup(game, spriter, texutreKey, entityName, animation, animationSpeedPercent) {
        var _this = _super.call(this, game, null) || this;
        // onLoop(SpriterGroup);
        _this.onLoop = new Phaser.Signal();
        // onFinish(SpriterGroup);
        _this.onFinish = new Phaser.Signal();
        // onSound(SpriterGroup, string); // string for line name which equals soud name without extension
        _this.onSound = new Phaser.Signal();
        // onEvent(SpriterGroup, string); // string for line name which equals event name
        _this.onEvent = new Phaser.Signal();
        // onTagChange(SpriterGroup, string, boolean); // string for tag name, boolean for change (true = set / false = unset)
        _this.onTagChange = new Phaser.Signal();
        // onVariableSet(SpriterGroup, Variable); // Variable is Spriter variable def with access to value
        _this.onVariableSet = new Phaser.Signal();
        // onBoxUpdated(SpriterGroup, SpriterObject);
        _this.onBoxUpdated = new Phaser.Signal();
        // onPointUpdated(SpriterGroup, SpriterObject);
        _this.onPointUpdated = new Phaser.Signal();
        _this._mainlineStepper = new LineStepper_1.LineStepper();
        _this._lineSteppers = [];
        _this._lineSteppersCount = 0;
        _this._bones = [];
        _this._objects = [];
        _this._tags = 0; // up to 32 tags - 1 per bit
        _this._vars = [];
        _this._paused = false;
        _this._spriter = spriter;
        _this._entityName = entityName;
        _this._entity = spriter.getEntityByName(entityName);
        _this._textureKey = texutreKey;
        _this._root = new SpatialInfo_1.SpatialInfo();
        // clone variables
        for (var i = 0; i < _this._entity.variablesLength; i++) {
            _this._vars[i] = _this._entity.getVariableById(i).clone();
        }
        // create charmap stack
        _this._charMapStack = new CharMapStack_1.CharMapStack(_this._entity);
        // set animation speed
        if (animationSpeedPercent === undefined) {
            animationSpeedPercent = 100;
        }
        _this.setAnimationSpeedPercent(animationSpeedPercent);
        // set animation
        if (animation === undefined || animation === null) {
            // set first animation
            _this.playAnimationById(0);
        }
        else if (typeof animation === "number") {
            _this.playAnimationById(animation);
        }
        else {
            _this.playAnimationByName(animation);
        }
        return _this;
    }
    Object.defineProperty(SpriterGroup.prototype, "spriter", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._spriter;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpriterGroup.prototype, "entity", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._entity;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpriterGroup.prototype, "charMapStack", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._charMapStack;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpriterGroup.prototype, "paused", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._paused;
        },
        // -------------------------------------------------------------------------
        set: function (paused) {
            this._paused = paused;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpriterGroup.prototype, "animationsCount", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._entity.animationsLength;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpriterGroup.prototype, "currentAnimationName", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._animationName;
        },
        enumerable: false,
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
    SpriterGroup.prototype.setAnimationSpeedPercent = function (animationSpeedPercent) {
        if (animationSpeedPercent === void 0) { animationSpeedPercent = 100; }
        this._animationSpeed = animationSpeedPercent / 100;
    };
    // -------------------------------------------------------------------------
    SpriterGroup.prototype.playAnimationById = function (animationId) {
        var animation = this._entity.getAnimationById(animationId);
        if (animation === undefined || animation === null) {
            console.warn("Animation " + animationId + " for entity " + this._entityName + " does not exist!");
            return;
        }
        this.playAnimation(animation);
    };
    // -------------------------------------------------------------------------
    SpriterGroup.prototype.playAnimationByName = function (animationName) {
        var animation = this._entity.getAnimationByName(animationName);
        if (animation === undefined || animation === null) {
            console.warn("Animation " + animationName + " for entity " + this._entityName + " does not exist!");
            return;
        }
        this.playAnimation(animation);
    };
    // -------------------------------------------------------------------------
    SpriterGroup.prototype.playAnimation = function (animation) {
        this._animationName = animation.name;
        this._animation = animation;
        this._finished = false;
        // reset time to beginning of animation and find first from and to keys
        this._mainlineStepper.reset();
        this._mainlineStepper.line = this._animation.mainline;
        this._time = 0;
        // reset all additional time lines (soundline, varline, tagline, eventline)
        this.resetLines();
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
    SpriterGroup.prototype.resetLines = function () {
        // reset steppers
        this._lineSteppersCount = 0;
        // go through all lines (sounds, events, tags, vars)
        for (var i = 0; i < this._animation.linesLength; i++) {
            var line = this._animation.getLineById(i);
            // if not enough line steppers in array, add new one
            if (this._lineSteppersCount >= this._lineSteppers.length) {
                this._lineSteppers[this._lineSteppersCount] = new LineStepper_1.LineStepper();
            }
            // get free stepper
            var stepper = this._lineSteppers[this._lineSteppersCount++];
            stepper.reset();
            stepper.line = line;
        }
    };
    // -------------------------------------------------------------------------
    SpriterGroup.prototype.setBones = function (bones, force) {
        if (force === void 0) { force = false; }
        // switch off all existing bones
        for (var i = 0; i < this._bones.length; i++) {
            if (this._bones[i] !== undefined) {
                this._bones[i].setOn(false);
            }
        }
        // go through all bones and add new ones if necessary and activate used ones
        for (var i = 0; i < bones.length; i++) {
            var ref = bones[i];
            // if bone does not exist add it and make active, else make it active only
            if (this._bones[ref.id] === undefined) {
                var newBone = new SpriterBone_1.SpriterBone();
                newBone.type = 1 /* BONE */;
                this._bones[ref.id] = newBone;
            }
            var bone = this._bones[ref.id];
            bone.setOn(true);
            bone.parent = ref.parent;
            if (bone.timelineKey !== ref.key || bone.timeline !== ref.timeline || force) {
                bone.setKey(this._entity, this._animation, ref.timeline, ref.key);
            }
        }
    };
    // -------------------------------------------------------------------------
    SpriterGroup.prototype.setObjects = function (objects, force) {
        if (force === void 0) { force = false; }
        // switch off (kill) all existing sprites
        for (var i = 0; i < this._objects.length; i++) {
            if (this._objects[i] !== undefined) {
                this._objects[i].setOn(false);
            }
        }
        // go through all objects/sprites and add new ones if necessary and activate used ones
        var zChange = false;
        for (var i = 0; i < objects.length; i++) {
            var ref = objects[i];
            var object = null;
            var sprite = null;
            // if sprite does not exist add it and make active, else make it active only
            if (this._objects[ref.id] === undefined) {
                sprite = new Phaser.Sprite(this.game, 0, 0, this._textureKey);
                object = new SpriterObject_1.SpriterObject(this, sprite);
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
            if (object.type === 0 /* SPRITE */) {
                object.setOn(true);
                if (object.sprite.z !== ref.z) {
                    object.sprite.z = ref.z;
                    zChange = true;
                }
            }
            else {
                object.setOn(true, true);
                // TODO remove - debug
                //if (object.type === eObjectType.POINT) {
                //    object.setOn(true);
                //    object.sprite.frameName = "DebugPoint";
                //    object.sprite.anchor.set(0.5, 0.5);
                //} else if (object.type === eObjectType.BOX) {
                //    object.setOn(true);
                //    object.sprite.frameName = "DebugBox";
                //}
            }
            if (object.timelineKey !== ref.key || object.timeline !== ref.timeline || force) {
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
        var mainlineStepper = this._mainlineStepper;
        // check if in the end of animation and whether to loop or not
        if (this._time > this._animation.length) {
            if (this._animation.loopType === Animation_1.eAnimationLooping.NO_LOOPING) {
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
        while ((key = mainlineStepper.step(this._time)) !== null) {
            //console.log("got key at: " + key.time + " time: " + this._time);
            this.loadKeys(key);
            mainlineStepper.lastTime = key.time;
        }
        this.updateCharacter();
        this.updateLines();
        if (this._finished) {
            this.onFinish.dispatch(this);
        }
        this._time += (this.game.time.delta /* this.game.time.physicsElapsedMS */ * this._animationSpeed);
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
                if (object.type === 0 /* SPRITE */) {
                    object.updateSprite();
                }
                else if (object.type === 2 /* BOX */) {
                    this.onBoxUpdated.dispatch(this, object);
                }
                else if (object.type === 3 /* POINT */) {
                    this.onPointUpdated.dispatch(this, object);
                }
                //// TODO remove - debug
                //if (object.type === eObjectType.BOX) {
                //    var frame = this.game.cache.getFrameByName(this._textureKey, "DebugBox");
                //    var timeline = this._animation.getTimelineById(object.timeline);
                //    var objDef = this._spriter.getEntityByName(this._entityName).getObjectInfoById(timeline.objectRef);
                //    var transformed = object.transformed;
                //    var objWidth = objDef.width * transformed.scaleX;
                //    var objHeight = objDef.height * transformed.scaleY;
                //    object.sprite.scale.set(objWidth / frame.width, objHeight / frame.height);
                //}
            }
        }
    };
    // -------------------------------------------------------------------------
    SpriterGroup.prototype.updateLines = function () {
        for (var i = this._lineSteppersCount - 1; i >= 0; i--) {
            var lineStepper = this._lineSteppers[i];
            var line = lineStepper.line;
            var key;
            while ((key = lineStepper.step(this._time)) !== null) {
                switch (line.type) {
                    case Baseline_1.eTimelineType.SOUND_LINE:
                        //console.log("sound: " + line.name + " - key: " + key.id + ", time: " + key.time);
                        this.onSound.dispatch(this, line.name);
                        break;
                    case Baseline_1.eTimelineType.EVENT_LINE:
                        //console.log("event: " + line.name + " - key: " + key.id + ", time: " + key.time);
                        this.onEvent.dispatch(this, line.name);
                        break;
                    case Baseline_1.eTimelineType.TAG_LINE:
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
                    case Baseline_1.eTimelineType.VAR_LINE:
                        var newVal = key.value;
                        var variable = this._vars[line.varDefId];
                        variable.value = newVal;
                        //console.log("var set: " + variable.name + " value: " + variable.value + " - key: " + key.id + ", time: " + key.time);
                        this.onVariableSet.dispatch(this, variable);
                        break;
                }
                lineStepper.lastTime = key.time;
            }
        }
    };
    return SpriterGroup;
}(Phaser.Group));
exports.SpriterGroup = SpriterGroup;


/***/ }),

/***/ "./src/Spriter/SpriterObject.ts":
/*!**************************************!*\
  !*** ./src/Spriter/SpriterObject.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpriterObject = void 0;
var SpriterBone_1 = __webpack_require__(/*! ./SpriterBone */ "./src/Spriter/SpriterBone.ts");
var SpriterObject = /** @class */ (function (_super) {
    __extends(SpriterObject, _super);
    // -------------------------------------------------------------------------
    function SpriterObject(parent, sprite) {
        var _this = _super.call(this) || this;
        _this._spriter = parent.spriter;
        _this._charMapStack = parent.charMapStack;
        _this._sprite = sprite;
        return _this;
    }
    Object.defineProperty(SpriterObject.prototype, "sprite", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._sprite;
        },
        enumerable: false,
        configurable: true
    });
    // -------------------------------------------------------------------------
    SpriterObject.prototype.setOn = function (on, hideSprite) {
        if (hideSprite === void 0) { hideSprite = false; }
        _super.prototype.setOn.call(this, on);
        // hide sprite for non-sprite objects
        this._sprite.exists = on && !hideSprite;
        this._sprite.visible = (on && !this._hide && !hideSprite);
    };
    // -------------------------------------------------------------------------
    SpriterObject.prototype.setKey = function (entity, animation, timelineId, keyId) {
        _super.prototype.setKey.call(this, entity, animation, timelineId, keyId);
        // set sprite - skip invisible objects - boxes, points
        if (this.type === 0 /* SPRITE */) {
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
        if (this.type === 0 /* SPRITE */) {
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
}(SpriterBone_1.SpriterBone));
exports.SpriterObject = SpriterObject;


/***/ }),

/***/ "./src/Spriter/Structure/Animation.ts":
/*!********************************************!*\
  !*** ./src/Spriter/Structure/Animation.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Animation = exports.eAnimationLooping = void 0;
var Item_1 = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");
var IdNameMap_1 = __webpack_require__(/*! ../IdNameMap */ "./src/Spriter/IdNameMap.ts");
var eAnimationLooping;
(function (eAnimationLooping) {
    eAnimationLooping[eAnimationLooping["NO_LOOPING"] = 0] = "NO_LOOPING";
    eAnimationLooping[eAnimationLooping["LOOPING"] = 1] = "LOOPING";
})(eAnimationLooping = exports.eAnimationLooping || (exports.eAnimationLooping = {}));
;
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    // -------------------------------------------------------------------------
    function Animation(id, name, length, loopType) {
        var _this = _super.call(this, id, name) || this;
        _this._length = length;
        _this._loopType = loopType;
        _this._timelines = new IdNameMap_1.IdNameMap();
        _this._lines = new IdNameMap_1.IdNameMap();
        return _this;
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
        enumerable: false,
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "length", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animation.prototype, "loopType", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._loopType;
        },
        enumerable: false,
        configurable: true
    });
    return Animation;
}(Item_1.Item));
exports.Animation = Animation;


/***/ }),

/***/ "./src/Spriter/Structure/Baseline.ts":
/*!*******************************************!*\
  !*** ./src/Spriter/Structure/Baseline.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Baseline = exports.eTimelineType = void 0;
var Item_1 = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");
var eTimelineType;
(function (eTimelineType) {
    eTimelineType[eTimelineType["UNKNOWN"] = 0] = "UNKNOWN";
    eTimelineType[eTimelineType["MAIN_LINE"] = 1] = "MAIN_LINE";
    eTimelineType[eTimelineType["TIME_LINE"] = 2] = "TIME_LINE";
    eTimelineType[eTimelineType["SOUND_LINE"] = 3] = "SOUND_LINE";
    eTimelineType[eTimelineType["EVENT_LINE"] = 4] = "EVENT_LINE";
    eTimelineType[eTimelineType["TAG_LINE"] = 5] = "TAG_LINE";
    eTimelineType[eTimelineType["VAR_LINE"] = 6] = "VAR_LINE";
})(eTimelineType = exports.eTimelineType || (exports.eTimelineType = {}));
var Baseline = /** @class */ (function (_super) {
    __extends(Baseline, _super);
    // -------------------------------------------------------------------------
    function Baseline(id, name) {
        if (name === void 0) { name = null; }
        var _this = _super.call(this, id, name) || this;
        _this._type = eTimelineType.UNKNOWN;
        return _this;
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Baseline.prototype, "keys", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._keys;
        },
        enumerable: false,
        configurable: true
    });
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
    return Baseline;
}(Item_1.Item));
exports.Baseline = Baseline;


/***/ }),

/***/ "./src/Spriter/Structure/CharMap.ts":
/*!******************************************!*\
  !*** ./src/Spriter/Structure/CharMap.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CharMap = void 0;
var Item_1 = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");
var CharMap = /** @class */ (function (_super) {
    __extends(CharMap, _super);
    function CharMap() {
        return _super !== null && _super.apply(this, arguments) || this;
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
}(Item_1.Item));
exports.CharMap = CharMap;


/***/ }),

/***/ "./src/Spriter/Structure/CharMapStack.ts":
/*!***********************************************!*\
  !*** ./src/Spriter/Structure/CharMapStack.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CharMapStack = void 0;
var CharMapStack = /** @class */ (function () {
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
}());
exports.CharMapStack = CharMapStack;


/***/ }),

/***/ "./src/Spriter/Structure/Entity.ts":
/*!*****************************************!*\
  !*** ./src/Spriter/Structure/Entity.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Entity = void 0;
var IdNameMap_1 = __webpack_require__(/*! ../IdNameMap */ "./src/Spriter/IdNameMap.ts");
var Item_1 = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");
var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    // -------------------------------------------------------------------------
    function Entity(id, name) {
        var _this = _super.call(this, id, name) || this;
        _this._objectInfos = new IdNameMap_1.IdNameMap();
        _this._charMaps = new IdNameMap_1.IdNameMap();
        _this._variables = new IdNameMap_1.IdNameMap();
        _this._animations = new IdNameMap_1.IdNameMap();
        return _this;
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
        enumerable: false,
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
        enumerable: false,
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
        enumerable: false,
        configurable: true
    });
    return Entity;
}(Item_1.Item));
exports.Entity = Entity;


/***/ }),

/***/ "./src/Spriter/Structure/File.ts":
/*!***************************************!*\
  !*** ./src/Spriter/Structure/File.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.File = void 0;
var Item_1 = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    // -------------------------------------------------------------------------
    function File(id, name, pivotX, pivotY) {
        var _this = _super.call(this, id, name) || this;
        _this._pivotX = pivotX;
        _this._pivotY = pivotY;
        return _this;
    }
    Object.defineProperty(File.prototype, "pivotX", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._pivotX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(File.prototype, "pivotY", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._pivotY;
        },
        enumerable: false,
        configurable: true
    });
    return File;
}(Item_1.Item));
exports.File = File;


/***/ }),

/***/ "./src/Spriter/Structure/Folder.ts":
/*!*****************************************!*\
  !*** ./src/Spriter/Structure/Folder.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Folder = void 0;
var Item_1 = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");
var IdNameMap_1 = __webpack_require__(/*! ../IdNameMap */ "./src/Spriter/IdNameMap.ts");
var Folder = /** @class */ (function (_super) {
    __extends(Folder, _super);
    // -------------------------------------------------------------------------
    function Folder(id, name) {
        var _this = _super.call(this, id, name) || this;
        _this._files = new IdNameMap_1.IdNameMap();
        return _this;
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
}(Item_1.Item));
exports.Folder = Folder;


/***/ }),

/***/ "./src/Spriter/Structure/Item.ts":
/*!***************************************!*\
  !*** ./src/Spriter/Structure/Item.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Item = void 0;
var Item = /** @class */ (function () {
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "name", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    return Item;
}());
exports.Item = Item;


/***/ }),

/***/ "./src/Spriter/Structure/Key.ts":
/*!**************************************!*\
  !*** ./src/Spriter/Structure/Key.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Key = void 0;
var Key = /** @class */ (function () {
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Key.prototype, "time", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._time;
        },
        enumerable: false,
        configurable: true
    });
    return Key;
}());
exports.Key = Key;


/***/ }),

/***/ "./src/Spriter/Structure/KeyBone.ts":
/*!******************************************!*\
  !*** ./src/Spriter/Structure/KeyBone.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeyBone = void 0;
var KeyTimeline_1 = __webpack_require__(/*! ./KeyTimeline */ "./src/Spriter/Structure/KeyTimeline.ts");
var KeyBone = /** @class */ (function (_super) {
    __extends(KeyBone, _super);
    function KeyBone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return KeyBone;
}(KeyTimeline_1.KeyTimeline));
exports.KeyBone = KeyBone;


/***/ }),

/***/ "./src/Spriter/Structure/KeyMainline.ts":
/*!**********************************************!*\
  !*** ./src/Spriter/Structure/KeyMainline.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeyMainline = void 0;
var Key_1 = __webpack_require__(/*! ./Key */ "./src/Spriter/Structure/Key.ts");
var KeyMainline = /** @class */ (function (_super) {
    __extends(KeyMainline, _super);
    function KeyMainline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._boneRefs = [];
        _this._objectRefs = [];
        return _this;
    }
    Object.defineProperty(KeyMainline.prototype, "boneRefs", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._boneRefs;
        },
        enumerable: false,
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
        enumerable: false,
        configurable: true
    });
    // -------------------------------------------------------------------------
    KeyMainline.prototype.addObjectRef = function (objectRef) {
        this._objectRefs.push(objectRef);
    };
    return KeyMainline;
}(Key_1.Key));
exports.KeyMainline = KeyMainline;


/***/ }),

/***/ "./src/Spriter/Structure/KeyObject.ts":
/*!********************************************!*\
  !*** ./src/Spriter/Structure/KeyObject.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeyObject = void 0;
var KeyTimeline_1 = __webpack_require__(/*! ./KeyTimeline */ "./src/Spriter/Structure/KeyTimeline.ts");
var KeyObject = /** @class */ (function (_super) {
    __extends(KeyObject, _super);
    function KeyObject() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KeyObject.prototype, "file", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._file;
        },
        enumerable: false,
        configurable: true
    });
    return KeyObject;
}(KeyTimeline_1.KeyTimeline));
exports.KeyObject = KeyObject;


/***/ }),

/***/ "./src/Spriter/Structure/KeyTag.ts":
/*!*****************************************!*\
  !*** ./src/Spriter/Structure/KeyTag.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeyTag = void 0;
var Key_1 = __webpack_require__(/*! ./Key */ "./src/Spriter/Structure/Key.ts");
var KeyTag = /** @class */ (function (_super) {
    __extends(KeyTag, _super);
    function KeyTag() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        enumerable: false,
        configurable: true
    });
    return KeyTag;
}(Key_1.Key));
exports.KeyTag = KeyTag;


/***/ }),

/***/ "./src/Spriter/Structure/KeyTimeline.ts":
/*!**********************************************!*\
  !*** ./src/Spriter/Structure/KeyTimeline.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeyTimeline = void 0;
var Key_1 = __webpack_require__(/*! ./Key */ "./src/Spriter/Structure/Key.ts");
var SpatialInfo_1 = __webpack_require__(/*! ./SpatialInfo */ "./src/Spriter/Structure/SpatialInfo.ts");
var KeyTimeline = /** @class */ (function (_super) {
    __extends(KeyTimeline, _super);
    // -------------------------------------------------------------------------
    function KeyTimeline(id, time, spin) {
        var _this = _super.call(this, id, time) || this;
        _this._info = new SpatialInfo_1.SpatialInfo();
        _this._spin = spin;
        _this.setCurve(0 /* LINEAR */);
        return _this;
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KeyTimeline.prototype, "curveType", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._curveType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KeyTimeline.prototype, "c1", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._c1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KeyTimeline.prototype, "c2", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._c2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KeyTimeline.prototype, "c3", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._c3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KeyTimeline.prototype, "c4", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._c4;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KeyTimeline.prototype, "info", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._info;
        },
        enumerable: false,
        configurable: true
    });
    return KeyTimeline;
}(Key_1.Key));
exports.KeyTimeline = KeyTimeline;


/***/ }),

/***/ "./src/Spriter/Structure/KeyVariable.ts":
/*!**********************************************!*\
  !*** ./src/Spriter/Structure/KeyVariable.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeyVariable = void 0;
var Key_1 = __webpack_require__(/*! ./Key */ "./src/Spriter/Structure/Key.ts");
var KeyVariable = /** @class */ (function (_super) {
    __extends(KeyVariable, _super);
    // -------------------------------------------------------------------------
    function KeyVariable(id, time, value) {
        var _this = _super.call(this, id, time) || this;
        _this._value = value;
        return _this;
    }
    Object.defineProperty(KeyVariable.prototype, "value", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    return KeyVariable;
}(Key_1.Key));
exports.KeyVariable = KeyVariable;


/***/ }),

/***/ "./src/Spriter/Structure/ObjectInfo.ts":
/*!*********************************************!*\
  !*** ./src/Spriter/Structure/ObjectInfo.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObjectInfo = void 0;
var Item_1 = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");
var ObjectInfo = /** @class */ (function (_super) {
    __extends(ObjectInfo, _super);
    // -------------------------------------------------------------------------
    function ObjectInfo(id, name, type, width, height, pivotX, pivotY) {
        var _this = _super.call(this, id, name) || this;
        _this._type = type;
        _this._width = width;
        _this._height = height;
        _this._pivotX = pivotX;
        _this._pivotY = pivotY;
        return _this;
    }
    Object.defineProperty(ObjectInfo.prototype, "type", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObjectInfo.prototype, "width", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObjectInfo.prototype, "height", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObjectInfo.prototype, "pivotX", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._pivotX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObjectInfo.prototype, "pivotY", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._pivotY;
        },
        enumerable: false,
        configurable: true
    });
    return ObjectInfo;
}(Item_1.Item));
exports.ObjectInfo = ObjectInfo;


/***/ }),

/***/ "./src/Spriter/Structure/Ref.ts":
/*!**************************************!*\
  !*** ./src/Spriter/Structure/Ref.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Ref = void 0;
var Ref = /** @class */ (function () {
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
}());
exports.Ref = Ref;


/***/ }),

/***/ "./src/Spriter/Structure/SpatialInfo.ts":
/*!**********************************************!*\
  !*** ./src/Spriter/Structure/SpatialInfo.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpatialInfo = void 0;
var SpatialInfo = /** @class */ (function () {
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
}());
exports.SpatialInfo = SpatialInfo;


/***/ }),

/***/ "./src/Spriter/Structure/Timeline.ts":
/*!*******************************************!*\
  !*** ./src/Spriter/Structure/Timeline.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Timeline = void 0;
var Baseline_1 = __webpack_require__(/*! ./Baseline */ "./src/Spriter/Structure/Baseline.ts");
var Timeline = /** @class */ (function (_super) {
    __extends(Timeline, _super);
    // -------------------------------------------------------------------------
    function Timeline(id, name, type, objectRef) {
        if (type === void 0) { type = 0 /* SPRITE */; }
        if (objectRef === void 0) { objectRef = -1; }
        var _this = _super.call(this, id, name) || this;
        _this.type = Baseline_1.eTimelineType.TIME_LINE;
        _this._objectType = type;
        _this._objectRef = objectRef;
        return _this;
    }
    Object.defineProperty(Timeline.prototype, "objectType", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._objectType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "objectRef", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._objectRef;
        },
        enumerable: false,
        configurable: true
    });
    return Timeline;
}(Baseline_1.Baseline));
exports.Timeline = Timeline;


/***/ }),

/***/ "./src/Spriter/Structure/Types.ts":
/*!****************************************!*\
  !*** ./src/Spriter/Structure/Types.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Types = void 0;
var Types = /** @class */ (function () {
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
        "sprite": 0 /* SPRITE */,
        "bone": 1 /* BONE */,
        "box": 2 /* BOX */,
        "point": 3 /* POINT */,
        "sound": 4 /* SOUND */
    };
    Types.nameToCurveType = {
        "instant": 1 /* INSTANT */,
        "linear": 0 /* LINEAR */,
        "quadratic": 2 /* QUADRATIC */,
        "cubic": 3 /* CUBIC */,
        "quartic": 4 /* QUARTIC */,
        "quintic": 5 /* QUINTIC */,
        "bezier": 6 /* BEZIER */
    };
    Types.nameToVariableType = {
        "int": 0 /* INT */,
        "float": 1 /* FLOAT */,
        "string": 2 /* STRING */
    };
    return Types;
}());
exports.Types = Types;


/***/ }),

/***/ "./src/Spriter/Structure/Variable.ts":
/*!*******************************************!*\
  !*** ./src/Spriter/Structure/Variable.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Variable = void 0;
var Item_1 = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");
var Variable = /** @class */ (function (_super) {
    __extends(Variable, _super);
    // -------------------------------------------------------------------------
    function Variable(id, name, type, defaultValue) {
        var _this = _super.call(this, id, name) || this;
        _this._type = type;
        _this._default = defaultValue;
        _this.reset();
        return _this;
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Variable.prototype, "value", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._value;
        },
        // -------------------------------------------------------------------------
        set: function (value) {
            if (this._type === 0 /* INT */) {
                this._value = Math.floor(value);
            }
            else {
                this._value = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Variable.prototype, "int", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Variable.prototype, "float", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Variable.prototype, "string", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    return Variable;
}(Item_1.Item));
exports.Variable = Variable;


/***/ }),

/***/ "./src/Spriter/Structure/Varline.ts":
/*!******************************************!*\
  !*** ./src/Spriter/Structure/Varline.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Varline = void 0;
var Baseline_1 = __webpack_require__(/*! ./Baseline */ "./src/Spriter/Structure/Baseline.ts");
var Varline = /** @class */ (function (_super) {
    __extends(Varline, _super);
    // -------------------------------------------------------------------------
    function Varline(id, varDefId) {
        var _this = _super.call(this, id, null) || this;
        _this._varDefId = varDefId;
        _this.type = Baseline_1.eTimelineType.VAR_LINE;
        return _this;
    }
    Object.defineProperty(Varline.prototype, "varDefId", {
        // -------------------------------------------------------------------------
        get: function () {
            return this._varDefId;
        },
        enumerable: false,
        configurable: true
    });
    return Varline;
}(Baseline_1.Baseline));
exports.Varline = Varline;


/***/ }),

/***/ "./src/Spriter/index.ts":
/*!******************************!*\
  !*** ./src/Spriter/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./Spriter */ "./src/Spriter/Spriter.ts"), exports);
__exportStar(__webpack_require__(/*! ./SpriterGroup */ "./src/Spriter/SpriterGroup.ts"), exports);
__exportStar(__webpack_require__(/*! ./Loader/Loader */ "./src/Spriter/Loader/Loader.ts"), exports);
__exportStar(__webpack_require__(/*! ./Loader/SpriterFile */ "./src/Spriter/Loader/SpriterFile.ts"), exports);
__exportStar(__webpack_require__(/*! ./Loader/SpriterJSON */ "./src/Spriter/Loader/SpriterJSON.ts"), exports);
__exportStar(__webpack_require__(/*! ./Loader/SpriterXml */ "./src/Spriter/Loader/SpriterXml.ts"), exports);
//export * from "./Loader/SpriterBin";


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Spriter/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=spriter.js.map