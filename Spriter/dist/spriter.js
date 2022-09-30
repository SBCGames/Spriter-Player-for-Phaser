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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IdNameMap": () => (/* binding */ IdNameMap)
/* harmony export */ });
class IdNameMap {
    constructor() {
        this._items = [];
        this._itemNames = []; // keys are names and returned value is index into _tems array
    }
    // -------------------------------------------------------------------------
    add(item, id, name) {
        if (id === undefined) {
            id = this._items.length;
        }
        if (name === undefined || name === null) {
            name = "item_" + id;
        }
        this._items[id] = item;
        this._itemNames[name] = id;
    }
    // -------------------------------------------------------------------------
    getById(id) {
        return this._items[id];
    }
    // -------------------------------------------------------------------------
    getByName(name) {
        var id = this._itemNames[name];
        // TODO remove
        if (typeof id !== "number") {
            console.warn("item " + name + "  not found!");
        }
        return (typeof id === "number") ? this._items[id] : null;
    }
    // -------------------------------------------------------------------------
    get length() {
        return this._items.length;
    }
}


/***/ }),

/***/ "./src/Spriter/LineStepper.ts":
/*!************************************!*\
  !*** ./src/Spriter/LineStepper.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LineStepper": () => (/* binding */ LineStepper)
/* harmony export */ });
class LineStepper {
    // -------------------------------------------------------------------------
    constructor() {
        this.reset();
    }
    // -------------------------------------------------------------------------
    get current() {
        return this._line.at(this._currentIndex);
    }
    // -------------------------------------------------------------------------
    get currentIndex() {
        return this._currentIndex;
    }
    // -------------------------------------------------------------------------
    get next() {
        return this._line.at(this._nextIndex);
    }
    // -------------------------------------------------------------------------
    get nextIndex() {
        return this._nextIndex;
    }
    // -------------------------------------------------------------------------
    set lastTime(time) {
        this._lastTime = time;
    }
    // -------------------------------------------------------------------------
    set line(line) {
        this._line = line;
    }
    // -------------------------------------------------------------------------
    get line() {
        return this._line;
    }
    // -------------------------------------------------------------------------
    reset() {
        this._lastTime = -1;
        this._currentIndex = -1;
        this._nextIndex = 0;
    }
    // -------------------------------------------------------------------------
    step(time) {
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
    }
}


/***/ }),

/***/ "./src/Spriter/Loader/Loader.ts":
/*!**************************************!*\
  !*** ./src/Spriter/Loader/Loader.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Loader": () => (/* binding */ Loader)
/* harmony export */ });
/* harmony import */ var _Spriter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Spriter */ "./src/Spriter/Spriter.ts");
/* harmony import */ var _SpriterFile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpriterFile */ "./src/Spriter/Loader/SpriterFile.ts");
/* harmony import */ var _Structure_Baseline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Structure/Baseline */ "./src/Spriter/Structure/Baseline.ts");



class Loader {
    // -------------------------------------------------------------------------
    load(file) {
        this._spriter = new _Spriter__WEBPACK_IMPORTED_MODULE_0__.Spriter();
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
    }
    // -------------------------------------------------------------------------
    loadFolders(spriter, folders) {
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
    }
    // -------------------------------------------------------------------------
    loadFiles(folder, files) {
        for (var f = 0; f < files.length(); f++) {
            var file = files.getFile(f);
            // null is returned if file is not image but sound
            if (file !== null) {
                folder.addFile(file);
            }
        }
    }
    // -------------------------------------------------------------------------
    loadTags(spriter, tags) {
        // no tags
        if (tags.length() === 0) {
            return;
        }
        // different structure for json than for xml
        var tagDefs;
        if (this._fileType !== _SpriterFile__WEBPACK_IMPORTED_MODULE_1__.eFileType.JSON) {
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
        if (this._fileType !== _SpriterFile__WEBPACK_IMPORTED_MODULE_1__.eFileType.JSON) {
            tagDefs.processed();
        }
    }
    // -------------------------------------------------------------------------
    loadEntities(spriter, entities) {
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
    }
    // -------------------------------------------------------------------------
    loadObjInfo(entity, objInfos) {
        for (var i = 0; i < objInfos.length(); i++) {
            var objInfo = objInfos.getObjectInfo(i);
            entity.addObjectInfo(objInfo);
        }
    }
    // -------------------------------------------------------------------------
    loadCharMaps(entity, charMaps) {
        for (var i = 0; i < charMaps.length(); i++) {
            var charMap = charMaps.getCharMap(i);
            var charMapEntries = charMaps.getChildNodes(i, "map");
            this.loadCharMapEntries(charMap, charMapEntries);
            charMapEntries.processed();
            entity.addCharMap(charMap);
        }
    }
    // -------------------------------------------------------------------------
    loadCharMapEntries(charMap, charMapEntries) {
        for (var i = 0; i < charMapEntries.length(); i++) {
            charMapEntries.getCharMapEntry(i, charMap, this._spriter);
        }
    }
    // -------------------------------------------------------------------------
    loadVariables(entity, variables) {
        // no variables
        if (variables.length() === 0) {
            return;
        }
        // different structure for json than for xml
        var varDefs;
        if (this._fileType !== _SpriterFile__WEBPACK_IMPORTED_MODULE_1__.eFileType.JSON) {
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
        if (this._fileType !== _SpriterFile__WEBPACK_IMPORTED_MODULE_1__.eFileType.JSON) {
            varDefs.processed();
        }
    }
    // -------------------------------------------------------------------------
    loadAnimations(entity, animations) {
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
                var varlines = meta.getChildNodes(0, (this._fileType !== _SpriterFile__WEBPACK_IMPORTED_MODULE_1__.eFileType.JSON) ? "varline" : "valline");
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
    }
    // -------------------------------------------------------------------------
    loadMainline(animation, mainlines) {
        var mainline = mainlines.getMainline(0);
        mainline.type = _Structure_Baseline__WEBPACK_IMPORTED_MODULE_2__.eTimelineType.MAIN_LINE;
        var mainlineKeys = mainlines.getChildNodes(0, "key");
        this.loadMainlineKeys(mainline, mainlineKeys);
        mainlineKeys.processed();
        animation.mainline = mainline;
    }
    // -------------------------------------------------------------------------
    loadMainlineKeys(mainline, mainlineKeys) {
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
    }
    // -------------------------------------------------------------------------
    loadTimelines(animation, aTimelines) {
        for (var i = 0; i < aTimelines.length(); i++) {
            var timeline = aTimelines.getTimeline(i);
            var keys = aTimelines.getChildNodes(i, "key");
            this.loadTimelineKeys(timeline, keys);
            keys.processed();
            animation.addTimeline(timeline);
        }
    }
    // -------------------------------------------------------------------------
    loadTimelineKeys(aTimeline, aKeys) {
        for (var i = 0; i < aKeys.length(); i++) {
            var key = aKeys.getTimelineKey(i, this._spriter);
            aTimeline.add(key);
        }
    }
    // -------------------------------------------------------------------------
    loadSoundlines(animation, soundlines) {
        for (var i = 0; i < soundlines.length(); i++) {
            var soundline = soundlines.getSoundline(i);
            soundline.type = _Structure_Baseline__WEBPACK_IMPORTED_MODULE_2__.eTimelineType.SOUND_LINE;
            var keys = soundlines.getChildNodes(i, "key");
            this.loadKeys(soundline, keys);
            keys.processed();
            animation.addLine(soundline);
        }
    }
    // -------------------------------------------------------------------------
    loadKeys(timeline, keys) {
        for (var i = 0; i < keys.length(); i++) {
            var key = keys.getKey(i);
            timeline.add(key);
        }
    }
    // -------------------------------------------------------------------------
    loadEventlines(animation, eventlines) {
        for (var i = 0; i < eventlines.length(); i++) {
            var eventline = eventlines.getEventline(i);
            eventline.type = _Structure_Baseline__WEBPACK_IMPORTED_MODULE_2__.eTimelineType.EVENT_LINE;
            var keys = eventlines.getChildNodes(i, "key");
            this.loadKeys(eventline, keys);
            keys.processed();
            animation.addLine(eventline);
        }
    }
    // -------------------------------------------------------------------------
    loadTaglines(animation, taglines) {
        for (var i = 0; i < taglines.length(); i++) {
            var tagline = taglines.getTagline(i);
            tagline.type = _Structure_Baseline__WEBPACK_IMPORTED_MODULE_2__.eTimelineType.TAG_LINE;
            var keys = taglines.getChildNodes(i, "key");
            this.loadTagKeys(tagline, keys);
            keys.processed();
            animation.addLine(tagline);
        }
    }
    // -------------------------------------------------------------------------
    loadTagKeys(tagline, keys) {
        for (var i = 0; i < keys.length(); i++) {
            var key = keys.getTagKey(i);
            var tagChangeElements = keys.getChildNodes(i, "tag");
            var tagChanges = tagChangeElements.getTagChanges(this._spriter);
            tagChangeElements.processed();
            key.tagsOn = tagChanges;
            tagline.add(key);
        }
    }
    // -------------------------------------------------------------------------
    loadVarlines(entity, animation, varlines) {
        for (var i = 0; i < varlines.length(); i++) {
            var varline = varlines.getVarline(i);
            var type = entity.getVariableById(varline.varDefId).type;
            var keys = varlines.getChildNodes(i, "key");
            this.loadVariableKeys(varline, keys, type);
            keys.processed();
            animation.addLine(varline);
        }
    }
    // -------------------------------------------------------------------------
    loadVariableKeys(varline, keys, type) {
        for (var i = 0; i < keys.length(); i++) {
            var key = keys.getVariableKey(i, type);
            varline.add(key);
        }
    }
}


/***/ }),

/***/ "./src/Spriter/Loader/NodeListJSON.ts":
/*!********************************************!*\
  !*** ./src/Spriter/Loader/NodeListJSON.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NodeListJSON": () => (/* binding */ NodeListJSON)
/* harmony export */ });
class NodeListJSON {
    // -------------------------------------------------------------------------
    constructor(spriterJSONFile, nodeList) {
        this._file = spriterJSONFile;
        this._nodeList = nodeList;
        if (!Array.isArray(nodeList)) {
            nodeList.length = 1;
        }
    }
    // -------------------------------------------------------------------------
    length() {
        return this._nodeList.length;
    }
    // -------------------------------------------------------------------------
    processed() {
        this._file.processed();
    }
    // -------------------------------------------------------------------------
    getNode(index) {
        if (Array.isArray(this._nodeList)) {
            return this._nodeList[index];
        }
        else {
            return this._nodeList;
        }
    }
    // -------------------------------------------------------------------------
    getChildNodes(index, elementName) {
        return this._file.getNodesForElement(this.getNode(index), elementName);
    }
    // -------------------------------------------------------------------------
    getFolder(index) {
        return this._file.getFolder(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getFile(index) {
        return this._file.getFile(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getTag(index) {
        return this._file.getTag(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getEntity(index) {
        return this._file.getEntity(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getObjectInfo(index) {
        return this._file.getObjectInfo(this.getNode(index), index);
    }
    // -------------------------------------------------------------------------
    getCharMap(index) {
        return this._file.getCharMap(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getCharMapEntry(index, charMap, spriter) {
        this._file.getCharMapEntry(this.getNode(index), charMap, spriter);
    }
    // -------------------------------------------------------------------------
    getVariable(index) {
        return this._file.getVariable(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getAnimation(index) {
        return this._file.getAnimation(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getMainline(index) {
        return this._file.getBaseline(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getMainlineKey(index) {
        return this._file.getMainlineKey(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getRef(index) {
        return this._file.getRef(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getTimeline(index) {
        return this._file.getTimeline(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getSoundline(index) {
        return this._file.getBaseline(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getEventline(index) {
        return this._file.getBaseline(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getTagline(index) {
        return this._file.getBaseline(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getVarline(index) {
        return this._file.getVarline(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getKey(index) {
        return this._file.getKey(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getTagKey(index) {
        return this._file.getTagKey(this.getNode(index));
    }
    // -------------------------------------------------------------------------
    getVariableKey(index, type) {
        return this._file.getVariableKey(this.getNode(index), type);
    }
    // -------------------------------------------------------------------------
    getTimelineKey(index, spriter) {
        return this._file.getTimelineKey(this.getNode(index), index, spriter);
    }
    // -------------------------------------------------------------------------
    getTagChanges(spriter) {
        var tags = 0;
        for (var i = 0; i < this.length(); i++) {
            var tagIndex = this._file.getTagChange(this.getNode(i));
            tags |= (1 << tagIndex);
        }
        return tags;
    }
}


/***/ }),

/***/ "./src/Spriter/Loader/NodeListXml.ts":
/*!*******************************************!*\
  !*** ./src/Spriter/Loader/NodeListXml.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NodeListXml": () => (/* binding */ NodeListXml)
/* harmony export */ });
class NodeListXml {
    // -------------------------------------------------------------------------
    constructor(spriterXmlFile, nodeList /*NodeList*/) {
        this._file = spriterXmlFile;
        this._nodeList = nodeList;
    }
    // -------------------------------------------------------------------------
    length() {
        return this._nodeList.length;
    }
    // -------------------------------------------------------------------------
    processed() {
        this._file.processed();
    }
    // -------------------------------------------------------------------------
    getChildNodes(index, elementName) {
        return this._file.getNodesForElement(this._nodeList.item(index), elementName);
    }
    // -------------------------------------------------------------------------
    getFolder(index) {
        return this._file.getFolder(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getFile(index) {
        return this._file.getFile(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getTag(index) {
        return this._file.getTag(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getEntity(index) {
        return this._file.getEntity(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getObjectInfo(index) {
        return this._file.getObjectInfo(this._nodeList.item(index), index);
    }
    // -------------------------------------------------------------------------
    getCharMap(index) {
        return this._file.getCharMap(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getCharMapEntry(index, charMap, spriter) {
        this._file.getCharMapEntry(this._nodeList.item(index), charMap, spriter);
    }
    // -------------------------------------------------------------------------
    getVariable(index) {
        return this._file.getVariable(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getAnimation(index) {
        return this._file.getAnimation(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getMainline(index) {
        return this._file.getBaseline(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getMainlineKey(index) {
        return this._file.getMainlineKey(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getRef(index) {
        return this._file.getRef(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getTimeline(index) {
        return this._file.getTimeline(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getSoundline(index) {
        return this._file.getBaseline(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getEventline(index) {
        return this._file.getBaseline(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getTagline(index) {
        return this._file.getBaseline(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getVarline(index) {
        return this._file.getVarline(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getKey(index) {
        return this._file.getKey(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getTagKey(index) {
        return this._file.getTagKey(this._nodeList.item(index));
    }
    // -------------------------------------------------------------------------
    getVariableKey(index, type) {
        return this._file.getVariableKey(this._nodeList.item(index), type);
    }
    // -------------------------------------------------------------------------
    getTimelineKey(index, spriter) {
        return this._file.getTimelineKey(this._nodeList.item(index), index, spriter);
    }
    // -------------------------------------------------------------------------
    getTagChanges(spriter) {
        var tags = 0;
        for (var i = 0; i < this.length(); i++) {
            var tagIndex = this._file.getTagChange(this._nodeList.item(i));
            tags |= (1 << tagIndex);
        }
        return tags;
    }
}


/***/ }),

/***/ "./src/Spriter/Loader/SpriterFile.ts":
/*!*******************************************!*\
  !*** ./src/Spriter/Loader/SpriterFile.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpriterFile": () => (/* binding */ SpriterFile),
/* harmony export */   "eFileType": () => (/* binding */ eFileType),
/* harmony export */   "eImageNameType": () => (/* binding */ eImageNameType)
/* harmony export */ });
var eFileType;
(function (eFileType) {
    eFileType[eFileType["XML"] = 0] = "XML";
    eFileType[eFileType["JSON"] = 1] = "JSON";
    eFileType[eFileType["BIN"] = 2] = "BIN";
})(eFileType || (eFileType = {}));
var eImageNameType;
(function (eImageNameType) {
    eImageNameType[eImageNameType["ORIGINAL"] = 0] = "ORIGINAL";
    eImageNameType[eImageNameType["NAME_ONLY"] = 1] = "NAME_ONLY";
    eImageNameType[eImageNameType["NAME_AND_EXTENSION"] = 2] = "NAME_AND_EXTENSION";
    eImageNameType[eImageNameType["FULL_PATH_NO_EXTENSION"] = 3] = "FULL_PATH_NO_EXTENSION";
})(eImageNameType || (eImageNameType = {}));
class SpriterFile {
    // -------------------------------------------------------------------------
    constructor(options) {
        let hasOptions = typeof options !== "undefined" && options !== null;
        // type of image names (path / name / extension)
        this._imageNameType = (hasOptions && typeof options.imageNameType !== "undefined") ? options.imageNameType : eImageNameType.NAME_ONLY;
        // min defs are present?
        this._minDefs = (hasOptions && typeof options.minDefs !== "undefined") ? options.minDefs : null;
    }
    // -------------------------------------------------------------------------
    processed() {
        this.popMinDefsStack();
    }
    // -------------------------------------------------------------------------
    setMinimized(minimized) {
        this._minimized = minimized;
        if (minimized) {
            this._minDefsStack = [];
            if (this._minDefs === null) {
                console.error("Spriter file is minimized - you must provide object with name definitions");
                return;
            }
        }
    }
    // -------------------------------------------------------------------------
    getFileName(path) {
        let name;
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
    }
    // -------------------------------------------------------------------------
    translateElementName(elementName) {
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
    }
    // -------------------------------------------------------------------------
    translateChildElementName(elementName) {
        if (this._minimized && this._minDefs !== null) {
            var elements = this._minDefs["childElements"];
            if (elements !== null) {
                elementName = elements[elementName] === null ? elementName : elements[elementName]["minName"];
            }
        }
        return elementName;
    }
    // -------------------------------------------------------------------------
    translateAttributeName(attributeName) {
        if (this._minimized && this._minDefs !== null) {
            var attributes = this._minDefs["attributes"];
            if (attributes !== null) {
                attributeName = attributes[attributeName] === null ? attributeName : attributes[attributeName];
            }
        }
        return attributeName;
    }
    // -------------------------------------------------------------------------
    setMinDefsToElementName(tagName) {
        if (this._minimized) {
            // save current level of min defs
            this._minDefsStack.push(this._minDefs);
            // get child definition and set it as current
            var minDef = this._minDefs["childElements"][tagName];
            this._minDefs = minDef;
        }
    }
    // -------------------------------------------------------------------------
    popMinDefsStack() {
        if (this._minimized) {
            this._minDefs = this._minDefsStack.pop();
        }
    }
}


/***/ }),

/***/ "./src/Spriter/Loader/SpriterJSON.ts":
/*!*******************************************!*\
  !*** ./src/Spriter/Loader/SpriterJSON.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpriterJSON": () => (/* binding */ SpriterJSON)
/* harmony export */ });
/* harmony import */ var _Structure_Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Structure/Animation */ "./src/Spriter/Structure/Animation.ts");
/* harmony import */ var _Structure_Baseline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Structure/Baseline */ "./src/Spriter/Structure/Baseline.ts");
/* harmony import */ var _Structure_CharMap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Structure/CharMap */ "./src/Spriter/Structure/CharMap.ts");
/* harmony import */ var _Structure_Entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Structure/Entity */ "./src/Spriter/Structure/Entity.ts");
/* harmony import */ var _Structure_File__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Structure/File */ "./src/Spriter/Structure/File.ts");
/* harmony import */ var _Structure_Folder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Structure/Folder */ "./src/Spriter/Structure/Folder.ts");
/* harmony import */ var _Structure_Item__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Structure/Item */ "./src/Spriter/Structure/Item.ts");
/* harmony import */ var _Structure_Key__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Structure/Key */ "./src/Spriter/Structure/Key.ts");
/* harmony import */ var _Structure_KeyBone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Structure/KeyBone */ "./src/Spriter/Structure/KeyBone.ts");
/* harmony import */ var _Structure_KeyMainline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Structure/KeyMainline */ "./src/Spriter/Structure/KeyMainline.ts");
/* harmony import */ var _Structure_KeyObject__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Structure/KeyObject */ "./src/Spriter/Structure/KeyObject.ts");
/* harmony import */ var _Structure_KeyTag__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Structure/KeyTag */ "./src/Spriter/Structure/KeyTag.ts");
/* harmony import */ var _Structure_KeyVariable__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Structure/KeyVariable */ "./src/Spriter/Structure/KeyVariable.ts");
/* harmony import */ var _Structure_ObjectInfo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Structure/ObjectInfo */ "./src/Spriter/Structure/ObjectInfo.ts");
/* harmony import */ var _Structure_Ref__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Structure/Ref */ "./src/Spriter/Structure/Ref.ts");
/* harmony import */ var _Structure_Timeline__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../Structure/Timeline */ "./src/Spriter/Structure/Timeline.ts");
/* harmony import */ var _Structure_Types__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../Structure/Types */ "./src/Spriter/Structure/Types.ts");
/* harmony import */ var _Structure_Variable__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../Structure/Variable */ "./src/Spriter/Structure/Variable.ts");
/* harmony import */ var _Structure_Varline__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../Structure/Varline */ "./src/Spriter/Structure/Varline.ts");
/* harmony import */ var _NodeListJSON__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./NodeListJSON */ "./src/Spriter/Loader/NodeListJSON.ts");
/* harmony import */ var _SpriterFile__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./SpriterFile */ "./src/Spriter/Loader/SpriterFile.ts");





















class SpriterJSON extends _SpriterFile__WEBPACK_IMPORTED_MODULE_20__.SpriterFile {
    // -------------------------------------------------------------------------
    constructor(JSONData, options) {
        super(options);
        this._json = JSONData;
        var minimized = JSONData["min"] !== undefined;
        this.setMinimized(minimized);
    }
    // -------------------------------------------------------------------------
    getType() {
        return _SpriterFile__WEBPACK_IMPORTED_MODULE_20__.eFileType.JSON;
    }
    // -------------------------------------------------------------------------
    parseInt(element, attributeName, defaultValue = 0) {
        var value = element[this.translateAttributeName(attributeName)];
        if (value === undefined) {
            return defaultValue;
        }
        return typeof (value) === "number" ? value : parseInt(value);
    }
    // -------------------------------------------------------------------------
    parseFloat(element, attributeName, defaultValue = 0) {
        var value = element[this.translateAttributeName(attributeName)];
        if (value === undefined) {
            return defaultValue;
        }
        return typeof (value) === "number" ? value : parseFloat(value);
    }
    // -------------------------------------------------------------------------
    parseBoolean(element, attributeName, defaultValue = false) {
        var value = element[this.translateAttributeName(attributeName)];
        if (value === undefined) {
            return defaultValue;
        }
        return typeof (value) === "boolean" ? value : (value === "true");
    }
    // -------------------------------------------------------------------------
    parseString(element, attributeName, defaultValue = "") {
        var value = element[this.translateAttributeName(attributeName)];
        return value === undefined ? defaultValue : value;
    }
    // -------------------------------------------------------------------------
    getNodes(nodeName) {
        this.setMinDefsToElementName(nodeName);
        var translatedName = this.translateElementName(nodeName);
        return new _NodeListJSON__WEBPACK_IMPORTED_MODULE_19__.NodeListJSON(this, (this._json[translatedName] !== undefined) ? this._json[translatedName] : []);
    }
    // -------------------------------------------------------------------------
    getNodesForElement(element, nodeName) {
        this.setMinDefsToElementName(nodeName);
        var translatedName = this.translateElementName(nodeName);
        return new _NodeListJSON__WEBPACK_IMPORTED_MODULE_19__.NodeListJSON(this, (element[translatedName] !== undefined) ? element[translatedName] : []);
    }
    // -------------------------------------------------------------------------
    getFolder(element) {
        return new _Structure_Folder__WEBPACK_IMPORTED_MODULE_5__.Folder(this.parseInt(element, "id"), this.parseString(element, "name"));
    }
    // -------------------------------------------------------------------------
    getFile(element) {
        if (element["type"] !== undefined && element["type"] === "sound") {
            return null;
        }
        return new _Structure_File__WEBPACK_IMPORTED_MODULE_4__.File(this.parseInt(element, "id"), this.getFileName(this.parseString(element, "name")), this.parseFloat(element, "pivot_x"), 1 - this.parseFloat(element, "pivot_y"));
    }
    // -------------------------------------------------------------------------
    getTag(element) {
        return new _Structure_Item__WEBPACK_IMPORTED_MODULE_6__.Item(this.parseInt(element, "id"), this.parseString(element, "name"));
    }
    // -------------------------------------------------------------------------
    getEntity(element) {
        return new _Structure_Entity__WEBPACK_IMPORTED_MODULE_3__.Entity(this.parseInt(element, "id"), this.parseString(element, "name"));
    }
    // -------------------------------------------------------------------------
    getObjectInfo(element, index) {
        return new _Structure_ObjectInfo__WEBPACK_IMPORTED_MODULE_13__.ObjectInfo(index, this.parseString(element, "name"), _Structure_Types__WEBPACK_IMPORTED_MODULE_16__.Types.getObjectTypeForName(this.parseString(element, "type")), this.parseFloat(element, "w"), this.parseFloat(element, "h"), this.parseFloat(element, "pivot_x"), this.parseFloat(element, "pivot_y"));
    }
    // -------------------------------------------------------------------------
    getCharMap(element) {
        return new _Structure_CharMap__WEBPACK_IMPORTED_MODULE_2__.CharMap(this.parseInt(element, "id"), this.parseString(element, "name"));
    }
    // -------------------------------------------------------------------------
    getCharMapEntry(element, charMap, spriter) {
        var sourceName = spriter.getFolderById(this.parseInt(element, "folder")).
            getFileById(this.parseInt(element, "file")).name;
        var target = null;
        if (element["target_folder"] !== undefined && element["target_file"] !== undefined) {
            target = spriter.getFolderById(this.parseInt(element, "target_folder")).
                getFileById(this.parseInt(element, "target_file"));
        }
        charMap.put(sourceName, target);
    }
    // -------------------------------------------------------------------------
    getVariable(element) {
        var type = _Structure_Types__WEBPACK_IMPORTED_MODULE_16__.Types.getVariableTypeForName(this.parseString(element, "type"));
        return new _Structure_Variable__WEBPACK_IMPORTED_MODULE_17__.Variable(this.parseInt(element, "id"), this.parseString(element, "name"), type, (type === 2 /* eVariableType.STRING */) ? this.parseString(element, "default") : this.parseFloat(element, "default", 0));
    }
    // -------------------------------------------------------------------------
    getAnimation(element) {
        return new _Structure_Animation__WEBPACK_IMPORTED_MODULE_0__.Animation(this.parseInt(element, "id"), this.parseString(element, "name"), this.parseFloat(element, "length"), this.parseBoolean(element, "looping", true) === true ? _Structure_Animation__WEBPACK_IMPORTED_MODULE_0__.eAnimationLooping.LOOPING : _Structure_Animation__WEBPACK_IMPORTED_MODULE_0__.eAnimationLooping.NO_LOOPING);
    }
    // -------------------------------------------------------------------------
    getMainlineKey(element) {
        return new _Structure_KeyMainline__WEBPACK_IMPORTED_MODULE_9__.KeyMainline(this.parseInt(element, "id"), this.parseFloat(element, "time"));
    }
    // -------------------------------------------------------------------------
    getRef(element) {
        return new _Structure_Ref__WEBPACK_IMPORTED_MODULE_14__.Ref(this.parseInt(element, "id"), this.parseInt(element, "parent", -1), this.parseInt(element, "timeline"), this.parseInt(element, "key"), this.parseInt(element, "z_index"));
    }
    // -------------------------------------------------------------------------
    getTimeline(element) {
        return new _Structure_Timeline__WEBPACK_IMPORTED_MODULE_15__.Timeline(this.parseInt(element, "id"), this.parseString(element, "name"), _Structure_Types__WEBPACK_IMPORTED_MODULE_16__.Types.getObjectTypeForName(this.parseString(element, "object_type", "sprite")), this.parseInt(element, "obj", -1));
    }
    // -------------------------------------------------------------------------
    getBaseline(element) {
        return new _Structure_Baseline__WEBPACK_IMPORTED_MODULE_1__.Baseline(this.parseInt(element, "id"), this.parseString(element, "name", null));
    }
    // -------------------------------------------------------------------------
    getVarline(element) {
        return new _Structure_Varline__WEBPACK_IMPORTED_MODULE_18__.Varline(this.parseInt(element, "id"), this.parseInt(element, "def"));
    }
    // -------------------------------------------------------------------------
    getKey(element) {
        return new _Structure_Key__WEBPACK_IMPORTED_MODULE_7__.Key(this.parseInt(element, "id"), this.parseInt(element, "time"));
    }
    // -------------------------------------------------------------------------
    getTagKey(element) {
        return new _Structure_KeyTag__WEBPACK_IMPORTED_MODULE_11__.KeyTag(this.parseInt(element, "id"), this.parseInt(element, "time"));
    }
    // -------------------------------------------------------------------------
    getVariableKey(element, type) {
        return new _Structure_KeyVariable__WEBPACK_IMPORTED_MODULE_12__.KeyVariable(this.parseInt(element, "id"), this.parseInt(element, "time"), (type === 2 /* eVariableType.STRING */) ? this.parseString(element, "val") : this.parseFloat(element, "val"));
    }
    // -------------------------------------------------------------------------
    getTimelineKey(element, index, spriter) {
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
            key = new _Structure_KeyBone__WEBPACK_IMPORTED_MODULE_8__.KeyBone(index, time, spin);
            this.setMinDefsToElementName("bone");
        }
        else if (element[objectTag] !== undefined) {
            keyDataElm = element[objectTag];
            key = new _Structure_KeyObject__WEBPACK_IMPORTED_MODULE_10__.KeyObject(index, time, spin);
            this.setMinDefsToElementName("object");
            sprite = true;
        }
        // other curve than linear?
        if (curve !== "linear") {
            key.setCurve(_Structure_Types__WEBPACK_IMPORTED_MODULE_16__.Types.getCurveTypeForName(curve), c1, c2, c3, c4);
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
    }
    // -------------------------------------------------------------------------
    getTagChange(element) {
        return this.parseInt(element, "t");
    }
}


/***/ }),

/***/ "./src/Spriter/Loader/SpriterXml.ts":
/*!******************************************!*\
  !*** ./src/Spriter/Loader/SpriterXml.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpriterXml": () => (/* binding */ SpriterXml)
/* harmony export */ });
/* harmony import */ var _Structure_Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Structure/Animation */ "./src/Spriter/Structure/Animation.ts");
/* harmony import */ var _Structure_Baseline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Structure/Baseline */ "./src/Spriter/Structure/Baseline.ts");
/* harmony import */ var _Structure_CharMap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Structure/CharMap */ "./src/Spriter/Structure/CharMap.ts");
/* harmony import */ var _Structure_Entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Structure/Entity */ "./src/Spriter/Structure/Entity.ts");
/* harmony import */ var _Structure_File__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Structure/File */ "./src/Spriter/Structure/File.ts");
/* harmony import */ var _Structure_Folder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Structure/Folder */ "./src/Spriter/Structure/Folder.ts");
/* harmony import */ var _Structure_Item__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Structure/Item */ "./src/Spriter/Structure/Item.ts");
/* harmony import */ var _Structure_Key__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Structure/Key */ "./src/Spriter/Structure/Key.ts");
/* harmony import */ var _Structure_KeyBone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Structure/KeyBone */ "./src/Spriter/Structure/KeyBone.ts");
/* harmony import */ var _Structure_KeyMainline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Structure/KeyMainline */ "./src/Spriter/Structure/KeyMainline.ts");
/* harmony import */ var _Structure_KeyObject__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Structure/KeyObject */ "./src/Spriter/Structure/KeyObject.ts");
/* harmony import */ var _Structure_KeyTag__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Structure/KeyTag */ "./src/Spriter/Structure/KeyTag.ts");
/* harmony import */ var _Structure_KeyVariable__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Structure/KeyVariable */ "./src/Spriter/Structure/KeyVariable.ts");
/* harmony import */ var _Structure_ObjectInfo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Structure/ObjectInfo */ "./src/Spriter/Structure/ObjectInfo.ts");
/* harmony import */ var _Structure_Ref__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Structure/Ref */ "./src/Spriter/Structure/Ref.ts");
/* harmony import */ var _Structure_Timeline__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../Structure/Timeline */ "./src/Spriter/Structure/Timeline.ts");
/* harmony import */ var _Structure_Types__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../Structure/Types */ "./src/Spriter/Structure/Types.ts");
/* harmony import */ var _Structure_Variable__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../Structure/Variable */ "./src/Spriter/Structure/Variable.ts");
/* harmony import */ var _Structure_Varline__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../Structure/Varline */ "./src/Spriter/Structure/Varline.ts");
/* harmony import */ var _NodeListXml__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./NodeListXml */ "./src/Spriter/Loader/NodeListXml.ts");
/* harmony import */ var _SpriterFile__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./SpriterFile */ "./src/Spriter/Loader/SpriterFile.ts");





















class SpriterXml extends _SpriterFile__WEBPACK_IMPORTED_MODULE_20__.SpriterFile {
    // -------------------------------------------------------------------------
    constructor(xmlData, options) {
        super(options);
        this._xml = xmlData;
        var minimized = xmlData.documentElement.hasAttribute("min");
        this.setMinimized(minimized);
    }
    // -------------------------------------------------------------------------
    getType() {
        return _SpriterFile__WEBPACK_IMPORTED_MODULE_20__.eFileType.XML;
    }
    // -------------------------------------------------------------------------
    parseInt(element, attributeName, defaultValue = 0) {
        var value = element.getAttribute(this.translateAttributeName(attributeName));
        return value !== null ? parseInt(value) : defaultValue;
    }
    // -------------------------------------------------------------------------
    parseFloat(element, attributeName, defaultValue = 0) {
        var value = element.getAttribute(this.translateAttributeName(attributeName));
        return value !== null ? parseFloat(value) : defaultValue;
    }
    // -------------------------------------------------------------------------
    parseString(element, attributeName, defaultValue = "") {
        var value = element.getAttribute(this.translateAttributeName(attributeName));
        return value !== null ? value : defaultValue;
    }
    // -------------------------------------------------------------------------
    getNodes(nodeName) {
        this.setMinDefsToElementName(nodeName);
        var translatedName = this.translateElementName(nodeName);
        return new _NodeListXml__WEBPACK_IMPORTED_MODULE_19__.NodeListXml(this, this._xml.documentElement.getElementsByTagName(translatedName));
    }
    // -------------------------------------------------------------------------
    getNodesForElement(element, nodeName) {
        this.setMinDefsToElementName(nodeName);
        var translatedName = this.translateElementName(nodeName);
        return new _NodeListXml__WEBPACK_IMPORTED_MODULE_19__.NodeListXml(this, element.getElementsByTagName(translatedName));
    }
    // -------------------------------------------------------------------------
    getFolder(element) {
        return new _Structure_Folder__WEBPACK_IMPORTED_MODULE_5__.Folder(this.parseInt(element, "id"), this.parseString(element, "name"));
    }
    // -------------------------------------------------------------------------
    getFile(element) {
        if (element.hasAttribute("type") && element.getAttribute("type") === "sound") {
            return null;
        }
        return new _Structure_File__WEBPACK_IMPORTED_MODULE_4__.File(this.parseInt(element, "id"), this.getFileName(this.parseString(element, "name")), this.parseFloat(element, "pivot_x"), 1 - this.parseFloat(element, "pivot_y"));
    }
    // -------------------------------------------------------------------------
    getTag(element) {
        return new _Structure_Item__WEBPACK_IMPORTED_MODULE_6__.Item(this.parseInt(element, "id"), this.parseString(element, "name"));
    }
    // -------------------------------------------------------------------------
    getEntity(element) {
        return new _Structure_Entity__WEBPACK_IMPORTED_MODULE_3__.Entity(this.parseInt(element, "id"), this.parseString(element, "name"));
    }
    // -------------------------------------------------------------------------
    getObjectInfo(element, index) {
        return new _Structure_ObjectInfo__WEBPACK_IMPORTED_MODULE_13__.ObjectInfo(index, this.parseString(element, "name"), _Structure_Types__WEBPACK_IMPORTED_MODULE_16__.Types.getObjectTypeForName(this.parseString(element, "type")), this.parseFloat(element, "w"), this.parseFloat(element, "h"), this.parseFloat(element, "pivot_x"), this.parseFloat(element, "pivot_y"));
    }
    // -------------------------------------------------------------------------
    getCharMap(element) {
        return new _Structure_CharMap__WEBPACK_IMPORTED_MODULE_2__.CharMap(this.parseInt(element, "id"), this.parseString(element, "name"));
    }
    // -------------------------------------------------------------------------
    getCharMapEntry(element, charMap, spriter) {
        var sourceName = spriter.getFolderById(this.parseInt(element, "folder")).
            getFileById(this.parseInt(element, "file")).name;
        var target = null;
        if (element.hasAttribute("target_folder") && element.hasAttribute("target_file")) {
            target = spriter.getFolderById(this.parseInt(element, "target_folder")).
                getFileById(this.parseInt(element, "target_file"));
        }
        charMap.put(sourceName, target);
    }
    // -------------------------------------------------------------------------
    getVariable(element) {
        var type = _Structure_Types__WEBPACK_IMPORTED_MODULE_16__.Types.getVariableTypeForName(this.parseString(element, "type"));
        return new _Structure_Variable__WEBPACK_IMPORTED_MODULE_17__.Variable(this.parseInt(element, "id"), this.parseString(element, "name"), type, (type === 2 /* eVariableType.STRING */) ? this.parseString(element, "default") : this.parseFloat(element, "default", 0));
    }
    // -------------------------------------------------------------------------
    getAnimation(element) {
        return new _Structure_Animation__WEBPACK_IMPORTED_MODULE_0__.Animation(this.parseInt(element, "id"), this.parseString(element, "name"), this.parseFloat(element, "length"), this.parseString(element, "looping", "true") === "true" ? _Structure_Animation__WEBPACK_IMPORTED_MODULE_0__.eAnimationLooping.LOOPING : _Structure_Animation__WEBPACK_IMPORTED_MODULE_0__.eAnimationLooping.NO_LOOPING);
    }
    // -------------------------------------------------------------------------
    getMainlineKey(element) {
        return new _Structure_KeyMainline__WEBPACK_IMPORTED_MODULE_9__.KeyMainline(this.parseInt(element, "id"), this.parseFloat(element, "time"));
    }
    // -------------------------------------------------------------------------
    getRef(element) {
        return new _Structure_Ref__WEBPACK_IMPORTED_MODULE_14__.Ref(this.parseInt(element, "id"), this.parseInt(element, "parent", -1), this.parseInt(element, "timeline"), this.parseInt(element, "key"), this.parseInt(element, "z_index"));
    }
    // -------------------------------------------------------------------------
    getTimeline(element) {
        return new _Structure_Timeline__WEBPACK_IMPORTED_MODULE_15__.Timeline(this.parseInt(element, "id"), this.parseString(element, "name"), _Structure_Types__WEBPACK_IMPORTED_MODULE_16__.Types.getObjectTypeForName(this.parseString(element, "object_type", "sprite")), this.parseInt(element, "obj", -1));
    }
    // -------------------------------------------------------------------------
    getBaseline(element) {
        return new _Structure_Baseline__WEBPACK_IMPORTED_MODULE_1__.Baseline(this.parseInt(element, "id"), this.parseString(element, "name", null));
    }
    // -------------------------------------------------------------------------
    getVarline(element) {
        return new _Structure_Varline__WEBPACK_IMPORTED_MODULE_18__.Varline(this.parseInt(element, "id"), this.parseInt(element, "def"));
    }
    // -------------------------------------------------------------------------
    getKey(element) {
        return new _Structure_Key__WEBPACK_IMPORTED_MODULE_7__.Key(this.parseInt(element, "id"), this.parseInt(element, "time"));
    }
    // -------------------------------------------------------------------------
    getTagKey(element) {
        return new _Structure_KeyTag__WEBPACK_IMPORTED_MODULE_11__.KeyTag(this.parseInt(element, "id"), this.parseInt(element, "time"));
    }
    // -------------------------------------------------------------------------
    getVariableKey(element, type) {
        return new _Structure_KeyVariable__WEBPACK_IMPORTED_MODULE_12__.KeyVariable(this.parseInt(element, "id"), this.parseInt(element, "time"), (type === 2 /* eVariableType.STRING */) ? this.parseString(element, "val") : this.parseFloat(element, "val"));
    }
    // -------------------------------------------------------------------------
    getTimelineKey(element, index, spriter) {
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
            key = new _Structure_KeyBone__WEBPACK_IMPORTED_MODULE_8__.KeyBone(index, time, spin);
            this.setMinDefsToElementName("bone");
        }
        else if (keyDataElm.tagName === objectTag) {
            this.setMinDefsToElementName("object");
            key = new _Structure_KeyObject__WEBPACK_IMPORTED_MODULE_10__.KeyObject(index, time, spin);
            sprite = true;
        }
        // other curve than linear?
        if (curve !== "linear") {
            key.setCurve(_Structure_Types__WEBPACK_IMPORTED_MODULE_16__.Types.getCurveTypeForName(curve), c1, c2, c3, c4);
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
    }
    // -------------------------------------------------------------------------
    getTagChange(element) {
        return this.parseInt(element, "t");
    }
}


/***/ }),

/***/ "./src/Spriter/Math.ts":
/*!*****************************!*\
  !*** ./src/Spriter/Math.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "angleLinear": () => (/* binding */ angleLinear),
/* harmony export */   "bezier": () => (/* binding */ bezier),
/* harmony export */   "cubic": () => (/* binding */ cubic),
/* harmony export */   "linear": () => (/* binding */ linear),
/* harmony export */   "quadratic": () => (/* binding */ quadratic),
/* harmony export */   "quartic": () => (/* binding */ quartic),
/* harmony export */   "quintic": () => (/* binding */ quintic)
/* harmony export */ });
// -------------------------------------------------------------------------
function linear(a, b, t) {
    return ((b - a) * t) + a;
}
// -------------------------------------------------------------------------
function quadratic(a, b, c, t) {
    return linear(linear(a, b, t), linear(b, c, t), t);
}
// -------------------------------------------------------------------------
function cubic(a, b, c, d, t) {
    return linear(quadratic(a, b, c, t), quadratic(b, c, d, t), t);
}
// -------------------------------------------------------------------------
function quartic(a, b, c, d, e, t) {
    return linear(cubic(a, b, c, d, t), cubic(b, c, d, e, t), t);
}
// -------------------------------------------------------------------------
function quintic(a, b, c, d, e, f, t) {
    return linear(quartic(a, b, c, d, e, t), quartic(b, c, d, e, f, t), t);
}
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


/***/ }),

/***/ "./src/Spriter/Spriter.ts":
/*!********************************!*\
  !*** ./src/Spriter/Spriter.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Spriter": () => (/* binding */ Spriter)
/* harmony export */ });
/* harmony import */ var _IdNameMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IdNameMap */ "./src/Spriter/IdNameMap.ts");

class Spriter {
    // -------------------------------------------------------------------------
    constructor() {
        this._folders = new _IdNameMap__WEBPACK_IMPORTED_MODULE_0__.IdNameMap();
        this._tags = new _IdNameMap__WEBPACK_IMPORTED_MODULE_0__.IdNameMap();
        this._entities = new _IdNameMap__WEBPACK_IMPORTED_MODULE_0__.IdNameMap();
    }
    // -------------------------------------------------------------------------
    addFolder(folder) {
        this._folders.add(folder, folder.id, folder.name);
    }
    // -------------------------------------------------------------------------
    getFolderById(id) {
        return this._folders.getById(id);
    }
    // -------------------------------------------------------------------------
    getFolderByName(name) {
        return this._folders.getByName(name);
    }
    // -------------------------------------------------------------------------
    addEntity(entity) {
        this._entities.add(entity, entity.id, entity.name);
    }
    // -------------------------------------------------------------------------
    getEntityById(id) {
        return this._entities.getById(id);
    }
    // -------------------------------------------------------------------------
    getEntityByName(name) {
        return this._entities.getByName(name);
    }
    // -------------------------------------------------------------------------
    addTag(tag) {
        this._tags.add(tag, tag.id, tag.name);
    }
    // -------------------------------------------------------------------------
    getTagById(id) {
        return this._tags.getById(id);
    }
    // -------------------------------------------------------------------------
    getTagByName(name) {
        return this._tags.getByName(name);
    }
    // -------------------------------------------------------------------------
    get tagsLength() {
        return this._tags.length;
    }
}


/***/ }),

/***/ "./src/Spriter/SpriterBone.ts":
/*!************************************!*\
  !*** ./src/Spriter/SpriterBone.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpriterBone": () => (/* binding */ SpriterBone)
/* harmony export */ });
/* harmony import */ var _Math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math */ "./src/Spriter/Math.ts");
/* harmony import */ var _Structure_Animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Structure/Animation */ "./src/Spriter/Structure/Animation.ts");
/* harmony import */ var _Structure_SpatialInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Structure/SpatialInfo */ "./src/Spriter/Structure/SpatialInfo.ts");



class SpriterBone {
    // -------------------------------------------------------------------------
    constructor() {
        this.timeline = -1;
        this.timelineKey = -1;
        this.transformed = new _Structure_SpatialInfo__WEBPACK_IMPORTED_MODULE_2__.SpatialInfo();
    }
    // -------------------------------------------------------------------------
    setOn(on) {
        this._on = on;
    }
    // -------------------------------------------------------------------------
    get on() {
        return this._on;
    }
    // -------------------------------------------------------------------------
    setKey(entity, animation, timelineId, keyId) {
        this.timeline = timelineId;
        this.timelineKey = keyId;
        var timeline = animation.getTimelineById(timelineId);
        this.name = timeline.name;
        this.objectInfo = (timeline.objectRef === -1) ? null : entity.getObjectInfoById(timeline.objectRef);
        var keyFrom = timeline.at(keyId);
        // in the end loop to first key. If animation is not looping, then repeat last key
        var keyTo = (timeline.at(keyId + 1, animation.loopType !== _Structure_Animation__WEBPACK_IMPORTED_MODULE_1__.eAnimationLooping.NO_LOOPING));
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
    }
    // -------------------------------------------------------------------------
    tween(time) {
        // calculate normalized time
        //var t = Phaser.Math.clamp((time - this.timeFrom) / (this.timeTo - this.timeFrom), 0, 1);
        var t = (this.updateMask > 0) ? this.getTweenTime(time) : 0;
        this.transformed.x = (this.updateMask & SpriterBone.UPDATE_X) > 0 ?
            (0,_Math__WEBPACK_IMPORTED_MODULE_0__.linear)(this.from.x, this.to.x, t) : this.from.x;
        this.transformed.y = (this.updateMask & SpriterBone.UPDATE_Y) > 0 ?
            (0,_Math__WEBPACK_IMPORTED_MODULE_0__.linear)(this.from.y, this.to.y, t) : this.from.y;
        this.transformed.scaleX = (this.updateMask & SpriterBone.UPDATE_SCALE_X) > 0 ?
            (0,_Math__WEBPACK_IMPORTED_MODULE_0__.linear)(this.from.scaleX, this.to.scaleX, t) : this.from.scaleX;
        this.transformed.scaleY = (this.updateMask & SpriterBone.UPDATE_SCALE_Y) > 0 ?
            (0,_Math__WEBPACK_IMPORTED_MODULE_0__.linear)(this.from.scaleY, this.to.scaleY, t) : this.from.scaleY;
        this.transformed.pivotX = (this.updateMask & SpriterBone.UPDATE_PIVOT_X) > 0 ?
            (0,_Math__WEBPACK_IMPORTED_MODULE_0__.linear)(this.from.pivotX, this.to.pivotX, t) : this.from.pivotX;
        this.transformed.pivotY = (this.updateMask & SpriterBone.UPDATE_PIVOT_Y) > 0 ?
            (0,_Math__WEBPACK_IMPORTED_MODULE_0__.linear)(this.from.pivotY, this.to.pivotY, t) : this.from.pivotY;
        this.transformed.alpha = (this.updateMask & SpriterBone.UPDATE_ALPHA) > 0 ?
            (0,_Math__WEBPACK_IMPORTED_MODULE_0__.linear)(this.from.alpha, this.to.alpha, t) : this.from.alpha;
        this.transformed.angle = (this.updateMask & SpriterBone.UPDATE_ANGLE) > 0 ?
            (0,_Math__WEBPACK_IMPORTED_MODULE_0__.angleLinear)(this.from.angle, this.to.angle, this.key.spin, t) : this.from.angle;
    }
    // -------------------------------------------------------------------------
    update(parent) {
        this.transformed.angle *= Phaser.Math.sign(parent.scaleX) * Phaser.Math.sign(parent.scaleY);
        this.transformed.angle += parent.angle;
        this.transformed.scaleX *= parent.scaleX;
        this.transformed.scaleY *= parent.scaleY;
        this.scalePosition(parent.scaleX, parent.scaleY);
        this.rotatePosition(parent.angle);
        this.translatePosition(parent.x, parent.y);
        this.transformed.alpha *= parent.alpha;
    }
    // -------------------------------------------------------------------------
    scalePosition(parentScaleX, parentScaleY) {
        this.transformed.x *= parentScaleX;
        this.transformed.y *= parentScaleY;
    }
    // -------------------------------------------------------------------------
    rotatePosition(parentAngle) {
        var x = this.transformed.x;
        var y = this.transformed.y;
        if (x !== 0 || y !== 0) {
            var rads = parentAngle * (Math.PI / 180);
            var cos = Math.cos(rads);
            var sin = Math.sin(rads);
            this.transformed.x = x * cos - y * sin;
            this.transformed.y = x * sin + y * cos;
        }
    }
    // -------------------------------------------------------------------------
    translatePosition(parentX, parentY) {
        this.transformed.x += parentX;
        this.transformed.y += parentY;
    }
    // -------------------------------------------------------------------------
    getTweenTime(time) {
        if (this.key.curveType === 1 /* eCurveType.INSTANT */) {
            return 0;
        }
        var t = Phaser.Math.clamp((time - this.timeFrom) / (this.timeTo - this.timeFrom), 0, 1);
        switch (this.key.curveType) {
            case 0 /* eCurveType.LINEAR */:
                return t;
            case 2 /* eCurveType.QUADRATIC */:
                return (0,_Math__WEBPACK_IMPORTED_MODULE_0__.quadratic)(0, this.key.c1, 1, t);
            case 3 /* eCurveType.CUBIC */:
                return (0,_Math__WEBPACK_IMPORTED_MODULE_0__.cubic)(0, this.key.c1, this.key.c2, 1, t);
            case 4 /* eCurveType.QUARTIC */:
                return (0,_Math__WEBPACK_IMPORTED_MODULE_0__.quartic)(0, this.key.c1, this.key.c2, this.key.c3, 1, t);
            case 5 /* eCurveType.QUINTIC */:
                return (0,_Math__WEBPACK_IMPORTED_MODULE_0__.quintic)(0, this.key.c1, this.key.c2, this.key.c3, this.key.c4, 1, t);
            case 6 /* eCurveType.BEZIER */:
                return (0,_Math__WEBPACK_IMPORTED_MODULE_0__.bezier)(this.key.c1, this.key.c2, this.key.c3, this.key.c4, t);
        }
        return 0;
    }
}
SpriterBone.UPDATE_X = 1;
SpriterBone.UPDATE_Y = 2;
SpriterBone.UPDATE_SCALE_X = 4;
SpriterBone.UPDATE_SCALE_Y = 8;
SpriterBone.UPDATE_PIVOT_X = 16;
SpriterBone.UPDATE_PIVOT_Y = 32;
SpriterBone.UPDATE_ANGLE = 64;
SpriterBone.UPDATE_ALPHA = 128;


/***/ }),

/***/ "./src/Spriter/SpriterGroup.ts":
/*!*************************************!*\
  !*** ./src/Spriter/SpriterGroup.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpriterGroup": () => (/* binding */ SpriterGroup)
/* harmony export */ });
/* harmony import */ var _LineStepper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LineStepper */ "./src/Spriter/LineStepper.ts");
/* harmony import */ var _SpriterBone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpriterBone */ "./src/Spriter/SpriterBone.ts");
/* harmony import */ var _SpriterObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SpriterObject */ "./src/Spriter/SpriterObject.ts");
/* harmony import */ var _Structure_Animation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Structure/Animation */ "./src/Spriter/Structure/Animation.ts");
/* harmony import */ var _Structure_Baseline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Structure/Baseline */ "./src/Spriter/Structure/Baseline.ts");
/* harmony import */ var _Structure_CharMapStack__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Structure/CharMapStack */ "./src/Spriter/Structure/CharMapStack.ts");
/* harmony import */ var _Structure_SpatialInfo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Structure/SpatialInfo */ "./src/Spriter/Structure/SpatialInfo.ts");







class SpriterGroup extends Phaser.Group {
    // -------------------------------------------------------------------------
    constructor(game, spriter, texutreKey, entityName, animation, animationSpeedPercent) {
        super(game, null);
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
        // onBoxUpdated(SpriterGroup, SpriterObject);
        this.onBoxUpdated = new Phaser.Signal();
        // onPointUpdated(SpriterGroup, SpriterObject);
        this.onPointUpdated = new Phaser.Signal();
        this._mainlineStepper = new _LineStepper__WEBPACK_IMPORTED_MODULE_0__.LineStepper();
        this._lineSteppers = [];
        this._lineSteppersCount = 0;
        this._bones = [];
        this._objects = [];
        this._tags = 0; // up to 32 tags - 1 per bit
        this._vars = [];
        this._paused = false;
        this._spriter = spriter;
        this._entityName = entityName;
        this._entity = spriter.getEntityByName(entityName);
        this._textureKey = texutreKey;
        this._root = new _Structure_SpatialInfo__WEBPACK_IMPORTED_MODULE_6__.SpatialInfo();
        // clone variables
        for (var i = 0; i < this._entity.variablesLength; i++) {
            this._vars[i] = this._entity.getVariableById(i).clone();
        }
        // create charmap stack
        this._charMapStack = new _Structure_CharMapStack__WEBPACK_IMPORTED_MODULE_5__.CharMapStack(this._entity);
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
    // -------------------------------------------------------------------------
    get spriter() {
        return this._spriter;
    }
    // -------------------------------------------------------------------------
    get entity() {
        return this._entity;
    }
    // -------------------------------------------------------------------------
    get charMapStack() {
        return this._charMapStack;
    }
    // -------------------------------------------------------------------------
    get paused() {
        return this._paused;
    }
    // -------------------------------------------------------------------------
    set paused(paused) {
        this._paused = paused;
    }
    // -------------------------------------------------------------------------
    get animationsCount() {
        return this._entity.animationsLength;
    }
    // -------------------------------------------------------------------------
    get currentAnimationName() {
        return this._animationName;
    }
    // -------------------------------------------------------------------------
    pushCharMap(charMapName) {
        this._charMapStack.push(charMapName);
        this.resetSprites();
    }
    // -------------------------------------------------------------------------
    removeCharMap(charMapName) {
        this._charMapStack.remove(charMapName);
        this.resetSprites();
    }
    // -------------------------------------------------------------------------
    clearCharMaps() {
        this._charMapStack.reset();
        this.resetSprites();
    }
    // -------------------------------------------------------------------------
    resetSprites() {
        for (var i = 0; i < this._objects.length; i++) {
            this._objects[i].resetFile();
        }
    }
    // -------------------------------------------------------------------------
    isTagOn(tagName) {
        return this.isTagOnById(this._spriter.getTagByName(tagName).id);
    }
    // -------------------------------------------------------------------------
    isTagOnById(tagId) {
        return (this._tags & (1 << tagId)) > 0;
    }
    // -------------------------------------------------------------------------
    getVariable(varName) {
        return this.getVariableById(this._entity.getVariableByName(varName).id);
    }
    // -------------------------------------------------------------------------
    getVariableById(varId) {
        return this._vars[varId];
    }
    // -------------------------------------------------------------------------
    getObject(objectName) {
        for (var i = 0; i < this._objects.length; i++) {
            var object = this._objects[i];
            if (object.name === objectName) {
                return object;
            }
        }
        return null;
    }
    // -------------------------------------------------------------------------
    setAnimationSpeedPercent(animationSpeedPercent = 100) {
        this._animationSpeed = animationSpeedPercent / 100;
    }
    // -------------------------------------------------------------------------
    playAnimationById(animationId) {
        var animation = this._entity.getAnimationById(animationId);
        if (animation === undefined || animation === null) {
            console.warn("Animation " + animationId + " for entity " + this._entityName + " does not exist!");
            return;
        }
        this.playAnimation(animation);
    }
    // -------------------------------------------------------------------------
    playAnimationByName(animationName) {
        var animation = this._entity.getAnimationByName(animationName);
        if (animation === undefined || animation === null) {
            console.warn("Animation " + animationName + " for entity " + this._entityName + " does not exist!");
            return;
        }
        this.playAnimation(animation);
    }
    // -------------------------------------------------------------------------
    playAnimation(animation) {
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
    }
    // -------------------------------------------------------------------------
    resetLines() {
        // reset steppers
        this._lineSteppersCount = 0;
        // go through all lines (sounds, events, tags, vars)
        for (var i = 0; i < this._animation.linesLength; i++) {
            var line = this._animation.getLineById(i);
            // if not enough line steppers in array, add new one
            if (this._lineSteppersCount >= this._lineSteppers.length) {
                this._lineSteppers[this._lineSteppersCount] = new _LineStepper__WEBPACK_IMPORTED_MODULE_0__.LineStepper();
            }
            // get free stepper
            var stepper = this._lineSteppers[this._lineSteppersCount++];
            stepper.reset();
            stepper.line = line;
        }
    }
    // -------------------------------------------------------------------------
    setBones(bones, force = false) {
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
                var newBone = new _SpriterBone__WEBPACK_IMPORTED_MODULE_1__.SpriterBone();
                newBone.type = 1 /* eObjectType.BONE */;
                this._bones[ref.id] = newBone;
            }
            var bone = this._bones[ref.id];
            bone.setOn(true);
            bone.parent = ref.parent;
            if (bone.timelineKey !== ref.key || bone.timeline !== ref.timeline || force) {
                bone.setKey(this._entity, this._animation, ref.timeline, ref.key);
            }
        }
    }
    // -------------------------------------------------------------------------
    setObjects(objects, force = false) {
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
                object = new _SpriterObject__WEBPACK_IMPORTED_MODULE_2__.SpriterObject(this, sprite);
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
            if (object.type === 0 /* eObjectType.SPRITE */) {
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
    }
    // -------------------------------------------------------------------------
    loadKeys(keyMainline, force = false) {
        this.setBones(keyMainline.boneRefs, force);
        this.setObjects(keyMainline.objectRefs, force);
    }
    // -------------------------------------------------------------------------
    updateAnimation() {
        if (this._paused || this._finished) {
            return;
        }
        var mainlineStepper = this._mainlineStepper;
        // check if in the end of animation and whether to loop or not
        if (this._time > this._animation.length) {
            if (this._animation.loopType === _Structure_Animation__WEBPACK_IMPORTED_MODULE_3__.eAnimationLooping.NO_LOOPING) {
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
    }
    // -------------------------------------------------------------------------
    updateCharacter() {
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
                if (object.type === 0 /* eObjectType.SPRITE */) {
                    object.updateSprite();
                }
                else if (object.type === 2 /* eObjectType.BOX */) {
                    this.onBoxUpdated.dispatch(this, object);
                }
                else if (object.type === 3 /* eObjectType.POINT */) {
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
    }
    // -------------------------------------------------------------------------
    updateLines() {
        for (var i = this._lineSteppersCount - 1; i >= 0; i--) {
            var lineStepper = this._lineSteppers[i];
            var line = lineStepper.line;
            var key;
            while ((key = lineStepper.step(this._time)) !== null) {
                switch (line.type) {
                    case _Structure_Baseline__WEBPACK_IMPORTED_MODULE_4__.eTimelineType.SOUND_LINE:
                        //console.log("sound: " + line.name + " - key: " + key.id + ", time: " + key.time);
                        this.onSound.dispatch(this, line.name);
                        break;
                    case _Structure_Baseline__WEBPACK_IMPORTED_MODULE_4__.eTimelineType.EVENT_LINE:
                        //console.log("event: " + line.name + " - key: " + key.id + ", time: " + key.time);
                        this.onEvent.dispatch(this, line.name);
                        break;
                    case _Structure_Baseline__WEBPACK_IMPORTED_MODULE_4__.eTimelineType.TAG_LINE:
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
                    case _Structure_Baseline__WEBPACK_IMPORTED_MODULE_4__.eTimelineType.VAR_LINE:
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
    }
}


/***/ }),

/***/ "./src/Spriter/SpriterObject.ts":
/*!**************************************!*\
  !*** ./src/Spriter/SpriterObject.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpriterObject": () => (/* binding */ SpriterObject)
/* harmony export */ });
/* harmony import */ var _SpriterBone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriterBone */ "./src/Spriter/SpriterBone.ts");

class SpriterObject extends _SpriterBone__WEBPACK_IMPORTED_MODULE_0__.SpriterBone {
    // -------------------------------------------------------------------------
    constructor(parent, sprite) {
        super();
        this._spriter = parent.spriter;
        this._charMapStack = parent.charMapStack;
        this._sprite = sprite;
    }
    // -------------------------------------------------------------------------
    get sprite() {
        return this._sprite;
    }
    // -------------------------------------------------------------------------
    setOn(on, hideSprite = false) {
        super.setOn(on);
        // hide sprite for non-sprite objects
        this._sprite.exists = on && !hideSprite;
        this._sprite.visible = (on && !this._hide && !hideSprite);
    }
    // -------------------------------------------------------------------------
    setKey(entity, animation, timelineId, keyId) {
        super.setKey(entity, animation, timelineId, keyId);
        // set sprite - skip invisible objects - boxes, points
        if (this.type === 0 /* eObjectType.SPRITE */) {
            var spriteKey = this.key;
            var file = this._spriter.getFolderById(spriteKey.folder).getFileById(spriteKey.file);
            this._file = file;
            this.setFile(file);
        }
        else {
            this._file = null;
        }
    }
    // -------------------------------------------------------------------------
    resetFile() {
        if (this.type === 0 /* eObjectType.SPRITE */) {
            this.setFile(this._file);
        }
    }
    // -------------------------------------------------------------------------
    setFile(file) {
        file = this._charMapStack.getFile(file);
        if (file !== null) {
            this._hide = false;
            this._sprite.frameName = file.name;
        }
        else {
            this._hide = true;
            this._sprite.visible = false;
        }
    }
    // -------------------------------------------------------------------------
    updateSprite() {
        var t = this.transformed;
        var s = this.sprite;
        s.position.set(t.x, t.y);
        s.scale.set(t.scaleX, t.scaleY);
        s.anchor.set(t.pivotX, t.pivotY);
        s.alpha = t.alpha;
        s.angle = t.angle;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/Animation.ts":
/*!********************************************!*\
  !*** ./src/Spriter/Structure/Animation.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Animation": () => (/* binding */ Animation),
/* harmony export */   "eAnimationLooping": () => (/* binding */ eAnimationLooping)
/* harmony export */ });
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");
/* harmony import */ var _IdNameMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../IdNameMap */ "./src/Spriter/IdNameMap.ts");


var eAnimationLooping;
(function (eAnimationLooping) {
    eAnimationLooping[eAnimationLooping["NO_LOOPING"] = 0] = "NO_LOOPING";
    eAnimationLooping[eAnimationLooping["LOOPING"] = 1] = "LOOPING";
})(eAnimationLooping || (eAnimationLooping = {}));
;
class Animation extends _Item__WEBPACK_IMPORTED_MODULE_0__.Item {
    // -------------------------------------------------------------------------
    constructor(id, name, length, loopType) {
        super(id, name);
        this._length = length;
        this._loopType = loopType;
        this._timelines = new _IdNameMap__WEBPACK_IMPORTED_MODULE_1__.IdNameMap();
        this._lines = new _IdNameMap__WEBPACK_IMPORTED_MODULE_1__.IdNameMap();
    }
    // -------------------------------------------------------------------------
    get mainline() {
        return this._mainline;
    }
    // -------------------------------------------------------------------------
    set mainline(mainline) {
        this._mainline = mainline;
    }
    // -------------------------------------------------------------------------
    addTimeline(timeline) {
        this._timelines.add(timeline, timeline.id, timeline.name);
    }
    // -------------------------------------------------------------------------
    getTimelineById(id) {
        return this._timelines.getById(id);
    }
    // -------------------------------------------------------------------------
    getTimelineByName(name) {
        return this._timelines.getByName(name);
    }
    // -------------------------------------------------------------------------
    addLine(line) {
        this._lines.add(line, this._lines.length, line.name);
    }
    // -------------------------------------------------------------------------
    getLineById(id) {
        return this._lines.getById(id);
    }
    // -------------------------------------------------------------------------
    getLineByName(name) {
        return this._lines.getByName(name);
    }
    // -------------------------------------------------------------------------
    get linesLength() {
        return this._lines.length;
    }
    // -------------------------------------------------------------------------
    get length() {
        return this._length;
    }
    // -------------------------------------------------------------------------
    get loopType() {
        return this._loopType;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/Baseline.ts":
/*!*******************************************!*\
  !*** ./src/Spriter/Structure/Baseline.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Baseline": () => (/* binding */ Baseline),
/* harmony export */   "eTimelineType": () => (/* binding */ eTimelineType)
/* harmony export */ });
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");

var eTimelineType;
(function (eTimelineType) {
    eTimelineType[eTimelineType["UNKNOWN"] = 0] = "UNKNOWN";
    eTimelineType[eTimelineType["MAIN_LINE"] = 1] = "MAIN_LINE";
    eTimelineType[eTimelineType["TIME_LINE"] = 2] = "TIME_LINE";
    eTimelineType[eTimelineType["SOUND_LINE"] = 3] = "SOUND_LINE";
    eTimelineType[eTimelineType["EVENT_LINE"] = 4] = "EVENT_LINE";
    eTimelineType[eTimelineType["TAG_LINE"] = 5] = "TAG_LINE";
    eTimelineType[eTimelineType["VAR_LINE"] = 6] = "VAR_LINE";
})(eTimelineType || (eTimelineType = {}));
class Baseline extends _Item__WEBPACK_IMPORTED_MODULE_0__.Item {
    // -------------------------------------------------------------------------
    constructor(id, name = null) {
        super(id, name);
        this._type = eTimelineType.UNKNOWN;
    }
    // -------------------------------------------------------------------------
    get type() {
        return this._type;
    }
    // -------------------------------------------------------------------------
    set type(type) {
        this._type = type;
    }
    // -------------------------------------------------------------------------
    get keys() {
        return this._keys;
    }
    // -------------------------------------------------------------------------
    add(key) {
        if (this._keys === null || this._keys === undefined) {
            this._keys = [];
        }
        this._keys.push(key);
    }
    // -------------------------------------------------------------------------
    at(index, loop = true) {
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
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/CharMap.ts":
/*!******************************************!*\
  !*** ./src/Spriter/Structure/CharMap.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CharMap": () => (/* binding */ CharMap)
/* harmony export */ });
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");

class CharMap extends _Item__WEBPACK_IMPORTED_MODULE_0__.Item {
    // -------------------------------------------------------------------------
    put(key, value) {
        if (this._map === undefined) {
            this._map = {};
        }
        if (this._map[key] !== undefined) {
            console.error("Key with name " + key + " already exists");
        }
        this._map[key] = value;
    }
    // -------------------------------------------------------------------------
    value(key) {
        return this._map[key];
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/CharMapStack.ts":
/*!***********************************************!*\
  !*** ./src/Spriter/Structure/CharMapStack.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CharMapStack": () => (/* binding */ CharMapStack)
/* harmony export */ });
class CharMapStack {
    // -------------------------------------------------------------------------
    constructor(entity) {
        this._stack = [];
        this._length = 0;
        this._entity = entity;
    }
    // -------------------------------------------------------------------------
    reset() {
        this._length = 0;
    }
    // -------------------------------------------------------------------------
    push(charMapName) {
        var charMap = this.getCharMap(charMapName);
        this._stack[this._length++] = charMap;
    }
    // -------------------------------------------------------------------------
    remove(charMapName) {
        var charMap = this.getCharMap(charMapName);
        var index = this.findCharMap(charMap);
        // shift all items down
        if (index !== -1) {
            for (var i = index; i < this._length - 2; i++) {
                this._stack[i] = this._stack[i + 1];
            }
            this._stack[--this._length] = null;
        }
    }
    // -------------------------------------------------------------------------
    getFile(file) {
        for (var i = this._length - 1; i >= 0; i--) {
            var value = this._stack[i].value(file.name);
            if (value !== undefined) {
                return value;
            }
        }
        return file;
    }
    // -------------------------------------------------------------------------
    getCharMap(charMapName) {
        var charMap = this._entity.getCharMapByName(charMapName);
        if (charMapName === null) {
            console.error("charmap with name " + charMapName + " does not exist");
        }
        return charMap;
    }
    // -------------------------------------------------------------------------
    findCharMap(charMap) {
        for (var i = 0; i < this._length; i++) {
            if (this._stack[i] === charMap) {
                return i;
            }
        }
        return -1;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/Entity.ts":
/*!*****************************************!*\
  !*** ./src/Spriter/Structure/Entity.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Entity": () => (/* binding */ Entity)
/* harmony export */ });
/* harmony import */ var _IdNameMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../IdNameMap */ "./src/Spriter/IdNameMap.ts");
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");


class Entity extends _Item__WEBPACK_IMPORTED_MODULE_1__.Item {
    // -------------------------------------------------------------------------
    constructor(id, name) {
        super(id, name);
        this._objectInfos = new _IdNameMap__WEBPACK_IMPORTED_MODULE_0__.IdNameMap();
        this._charMaps = new _IdNameMap__WEBPACK_IMPORTED_MODULE_0__.IdNameMap();
        this._variables = new _IdNameMap__WEBPACK_IMPORTED_MODULE_0__.IdNameMap();
        this._animations = new _IdNameMap__WEBPACK_IMPORTED_MODULE_0__.IdNameMap();
    }
    // -------------------------------------------------------------------------
    addObjectInfo(objectInfo) {
        this._objectInfos.add(objectInfo, objectInfo.id, objectInfo.name);
    }
    // -------------------------------------------------------------------------
    getObjectInfoById(id) {
        return this._objectInfos.getById(id);
    }
    // -------------------------------------------------------------------------
    getObjectInfoByName(name) {
        return this._objectInfos.getByName(name);
    }
    // -------------------------------------------------------------------------
    addCharMap(charMap) {
        this._charMaps.add(charMap, charMap.id, charMap.name);
    }
    // -------------------------------------------------------------------------
    getCharMapById(id) {
        return this._charMaps.getById(id);
    }
    // -------------------------------------------------------------------------
    getCharMapByName(name) {
        return this._charMaps.getByName(name);
    }
    // -------------------------------------------------------------------------
    get charMapsLength() {
        return this._charMaps.length;
    }
    // -------------------------------------------------------------------------
    addVariable(variable) {
        this._variables.add(variable, variable.id, variable.name);
    }
    // -------------------------------------------------------------------------
    getVariableById(id) {
        return this._variables.getById(id);
    }
    // -------------------------------------------------------------------------
    getVariableByName(name) {
        return this._variables.getByName(name);
    }
    // -------------------------------------------------------------------------
    get variablesLength() {
        return this._variables.length;
    }
    // -------------------------------------------------------------------------
    addAnimation(animation) {
        this._animations.add(animation, animation.id, animation.name);
    }
    // -------------------------------------------------------------------------
    getAnimationById(id) {
        return this._animations.getById(id);
    }
    // -------------------------------------------------------------------------
    getAnimationByName(name) {
        return this._animations.getByName(name);
    }
    // -------------------------------------------------------------------------
    get animationsLength() {
        return this._animations.length;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/File.ts":
/*!***************************************!*\
  !*** ./src/Spriter/Structure/File.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "File": () => (/* binding */ File)
/* harmony export */ });
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");

class File extends _Item__WEBPACK_IMPORTED_MODULE_0__.Item {
    // -------------------------------------------------------------------------
    constructor(id, name, pivotX, pivotY) {
        super(id, name);
        this._pivotX = pivotX;
        this._pivotY = pivotY;
    }
    // -------------------------------------------------------------------------
    get pivotX() {
        return this._pivotX;
    }
    // -------------------------------------------------------------------------
    get pivotY() {
        return this._pivotY;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/Folder.ts":
/*!*****************************************!*\
  !*** ./src/Spriter/Structure/Folder.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Folder": () => (/* binding */ Folder)
/* harmony export */ });
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");
/* harmony import */ var _IdNameMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../IdNameMap */ "./src/Spriter/IdNameMap.ts");


class Folder extends _Item__WEBPACK_IMPORTED_MODULE_0__.Item {
    // -------------------------------------------------------------------------
    constructor(id, name) {
        super(id, name);
        this._files = new _IdNameMap__WEBPACK_IMPORTED_MODULE_1__.IdNameMap();
    }
    // -------------------------------------------------------------------------
    addFile(file) {
        this._files.add(file, file.id, file.name);
    }
    // -------------------------------------------------------------------------
    getFileById(id) {
        return this._files.getById(id);
    }
    // -------------------------------------------------------------------------
    getFileByName(name) {
        return this._files.getByName(name);
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/Item.ts":
/*!***************************************!*\
  !*** ./src/Spriter/Structure/Item.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Item": () => (/* binding */ Item)
/* harmony export */ });
class Item {
    // -------------------------------------------------------------------------
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }
    // -------------------------------------------------------------------------
    get id() {
        return this._id;
    }
    // -------------------------------------------------------------------------
    get name() {
        return this._name;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/Key.ts":
/*!**************************************!*\
  !*** ./src/Spriter/Structure/Key.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Key": () => (/* binding */ Key)
/* harmony export */ });
class Key {
    // -------------------------------------------------------------------------
    constructor(id, time) {
        this._id = id;
        this._time = time;
    }
    // -------------------------------------------------------------------------
    get id() {
        return this._id;
    }
    // -------------------------------------------------------------------------
    get time() {
        return this._time;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/KeyBone.ts":
/*!******************************************!*\
  !*** ./src/Spriter/Structure/KeyBone.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyBone": () => (/* binding */ KeyBone)
/* harmony export */ });
/* harmony import */ var _KeyTimeline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KeyTimeline */ "./src/Spriter/Structure/KeyTimeline.ts");

class KeyBone extends _KeyTimeline__WEBPACK_IMPORTED_MODULE_0__.KeyTimeline {
}


/***/ }),

/***/ "./src/Spriter/Structure/KeyMainline.ts":
/*!**********************************************!*\
  !*** ./src/Spriter/Structure/KeyMainline.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyMainline": () => (/* binding */ KeyMainline)
/* harmony export */ });
/* harmony import */ var _Key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Key */ "./src/Spriter/Structure/Key.ts");

class KeyMainline extends _Key__WEBPACK_IMPORTED_MODULE_0__.Key {
    constructor() {
        super(...arguments);
        this._boneRefs = [];
        this._objectRefs = [];
    }
    // -------------------------------------------------------------------------
    get boneRefs() {
        return this._boneRefs;
    }
    // -------------------------------------------------------------------------
    addBoneRef(boneRef) {
        this._boneRefs.push(boneRef);
    }
    // -------------------------------------------------------------------------
    get objectRefs() {
        return this._objectRefs;
    }
    // -------------------------------------------------------------------------
    addObjectRef(objectRef) {
        this._objectRefs.push(objectRef);
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/KeyObject.ts":
/*!********************************************!*\
  !*** ./src/Spriter/Structure/KeyObject.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyObject": () => (/* binding */ KeyObject)
/* harmony export */ });
/* harmony import */ var _KeyTimeline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KeyTimeline */ "./src/Spriter/Structure/KeyTimeline.ts");

class KeyObject extends _KeyTimeline__WEBPACK_IMPORTED_MODULE_0__.KeyTimeline {
    // -------------------------------------------------------------------------
    setFolderAndFile(folder, file) {
        this._folder = folder;
        this._file = file;
    }
    // -------------------------------------------------------------------------
    get folder() {
        return this._folder;
    }
    // -------------------------------------------------------------------------
    get file() {
        return this._file;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/KeyTag.ts":
/*!*****************************************!*\
  !*** ./src/Spriter/Structure/KeyTag.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyTag": () => (/* binding */ KeyTag)
/* harmony export */ });
/* harmony import */ var _Key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Key */ "./src/Spriter/Structure/Key.ts");

class KeyTag extends _Key__WEBPACK_IMPORTED_MODULE_0__.Key {
    // -------------------------------------------------------------------------
    get tagsOn() {
        return this._tagsOn;
    }
    // -------------------------------------------------------------------------
    set tagsOn(tagsOn) {
        this._tagsOn = tagsOn;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/KeyTimeline.ts":
/*!**********************************************!*\
  !*** ./src/Spriter/Structure/KeyTimeline.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyTimeline": () => (/* binding */ KeyTimeline)
/* harmony export */ });
/* harmony import */ var _Key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Key */ "./src/Spriter/Structure/Key.ts");
/* harmony import */ var _SpatialInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpatialInfo */ "./src/Spriter/Structure/SpatialInfo.ts");


class KeyTimeline extends _Key__WEBPACK_IMPORTED_MODULE_0__.Key {
    // -------------------------------------------------------------------------
    constructor(id, time, spin) {
        super(id, time);
        this._info = new _SpatialInfo__WEBPACK_IMPORTED_MODULE_1__.SpatialInfo();
        this._spin = spin;
        this.setCurve(0 /* eCurveType.LINEAR */);
    }
    // -------------------------------------------------------------------------
    setCurve(curveType, c1 = 0, c2 = 0, c3 = 0, c4 = 0) {
        this._curveType = curveType;
        this._c1 = c1;
        this._c2 = c2;
        this._c3 = c3;
        this._c4 = c4;
    }
    // -------------------------------------------------------------------------
    get spin() {
        return this._spin;
    }
    // -------------------------------------------------------------------------
    get curveType() {
        return this._curveType;
    }
    // -------------------------------------------------------------------------
    get c1() {
        return this._c1;
    }
    // -------------------------------------------------------------------------
    get c2() {
        return this._c2;
    }
    // -------------------------------------------------------------------------
    get c3() {
        return this._c3;
    }
    // -------------------------------------------------------------------------
    get c4() {
        return this._c4;
    }
    // -------------------------------------------------------------------------
    get info() {
        return this._info;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/KeyVariable.ts":
/*!**********************************************!*\
  !*** ./src/Spriter/Structure/KeyVariable.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyVariable": () => (/* binding */ KeyVariable)
/* harmony export */ });
/* harmony import */ var _Key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Key */ "./src/Spriter/Structure/Key.ts");

class KeyVariable extends _Key__WEBPACK_IMPORTED_MODULE_0__.Key {
    // -------------------------------------------------------------------------
    constructor(id, time, value) {
        super(id, time);
        this._value = value;
    }
    // -------------------------------------------------------------------------
    get value() {
        return this._value;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/ObjectInfo.ts":
/*!*********************************************!*\
  !*** ./src/Spriter/Structure/ObjectInfo.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectInfo": () => (/* binding */ ObjectInfo)
/* harmony export */ });
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");

class ObjectInfo extends _Item__WEBPACK_IMPORTED_MODULE_0__.Item {
    // -------------------------------------------------------------------------
    constructor(id, name, type, width, height, pivotX, pivotY) {
        super(id, name);
        this._type = type;
        this._width = width;
        this._height = height;
        this._pivotX = pivotX;
        this._pivotY = pivotY;
    }
    // -------------------------------------------------------------------------
    get type() {
        return this._type;
    }
    // -------------------------------------------------------------------------
    get width() {
        return this._width;
    }
    // -------------------------------------------------------------------------
    get height() {
        return this._height;
    }
    // -------------------------------------------------------------------------
    get pivotX() {
        return this._pivotX;
    }
    // -------------------------------------------------------------------------
    get pivotY() {
        return this._pivotY;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/Ref.ts":
/*!**************************************!*\
  !*** ./src/Spriter/Structure/Ref.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ref": () => (/* binding */ Ref)
/* harmony export */ });
class Ref {
    // -------------------------------------------------------------------------
    constructor(id, parent, timeline, key, z = 0) {
        this.id = id;
        this.parent = parent;
        this.timeline = timeline;
        this.key = key;
        this.z = z;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/SpatialInfo.ts":
/*!**********************************************!*\
  !*** ./src/Spriter/Structure/SpatialInfo.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpatialInfo": () => (/* binding */ SpatialInfo)
/* harmony export */ });
class SpatialInfo {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.pivotX = 0;
        this.pivotY = 0;
        this.alpha = 1;
        this.angle = 0;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/Timeline.ts":
/*!*******************************************!*\
  !*** ./src/Spriter/Structure/Timeline.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Timeline": () => (/* binding */ Timeline)
/* harmony export */ });
/* harmony import */ var _Baseline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Baseline */ "./src/Spriter/Structure/Baseline.ts");

class Timeline extends _Baseline__WEBPACK_IMPORTED_MODULE_0__.Baseline {
    // -------------------------------------------------------------------------
    constructor(id, name, type = 0 /* eObjectType.SPRITE */, objectRef = -1) {
        super(id, name);
        this.type = _Baseline__WEBPACK_IMPORTED_MODULE_0__.eTimelineType.TIME_LINE;
        this._objectType = type;
        this._objectRef = objectRef;
    }
    // -------------------------------------------------------------------------
    get objectType() {
        return this._objectType;
    }
    // -------------------------------------------------------------------------
    get objectRef() {
        return this._objectRef;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/Types.ts":
/*!****************************************!*\
  !*** ./src/Spriter/Structure/Types.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Types": () => (/* binding */ Types)
/* harmony export */ });
class Types {
    // -------------------------------------------------------------------------
    static getObjectTypeForName(typeName) {
        var type = Types.nameToObjectType[typeName];
        if (type === undefined) {
            console.error("Unknown type of object: " + typeName);
        }
        return type;
    }
    // -------------------------------------------------------------------------
    static getCurveTypeForName(typeName) {
        var type = Types.nameToCurveType[typeName];
        if (type === undefined) {
            console.error("Unknown type of curve: " + typeName);
        }
        return type;
    }
    // -------------------------------------------------------------------------
    static getVariableTypeForName(typeName) {
        var type = Types.nameToVariableType[typeName];
        if (type === undefined) {
            console.error("Unknown type of variable: " + typeName);
        }
        return type;
    }
}
Types.nameToObjectType = {
    "sprite": 0 /* eObjectType.SPRITE */,
    "bone": 1 /* eObjectType.BONE */,
    "box": 2 /* eObjectType.BOX */,
    "point": 3 /* eObjectType.POINT */,
    "sound": 4 /* eObjectType.SOUND */
};
Types.nameToCurveType = {
    "instant": 1 /* eCurveType.INSTANT */,
    "linear": 0 /* eCurveType.LINEAR */,
    "quadratic": 2 /* eCurveType.QUADRATIC */,
    "cubic": 3 /* eCurveType.CUBIC */,
    "quartic": 4 /* eCurveType.QUARTIC */,
    "quintic": 5 /* eCurveType.QUINTIC */,
    "bezier": 6 /* eCurveType.BEZIER */
};
Types.nameToVariableType = {
    "int": 0 /* eVariableType.INT */,
    "float": 1 /* eVariableType.FLOAT */,
    "string": 2 /* eVariableType.STRING */
};


/***/ }),

/***/ "./src/Spriter/Structure/Variable.ts":
/*!*******************************************!*\
  !*** ./src/Spriter/Structure/Variable.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Variable": () => (/* binding */ Variable)
/* harmony export */ });
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Item */ "./src/Spriter/Structure/Item.ts");

class Variable extends _Item__WEBPACK_IMPORTED_MODULE_0__.Item {
    // -------------------------------------------------------------------------
    constructor(id, name, type, defaultValue) {
        super(id, name);
        this._type = type;
        this._default = defaultValue;
        this.reset();
    }
    // -------------------------------------------------------------------------
    clone() {
        return new Variable(this.id, this.name, this.type, this._default);
    }
    // -------------------------------------------------------------------------
    reset() {
        this.value = this._default;
    }
    // -------------------------------------------------------------------------
    get type() {
        return this._type;
    }
    // -------------------------------------------------------------------------
    get value() {
        return this._value;
    }
    // -------------------------------------------------------------------------
    set value(value) {
        if (this._type === 0 /* eVariableType.INT */) {
            this._value = Math.floor(value);
        }
        else {
            this._value = value;
        }
    }
    // -------------------------------------------------------------------------
    get int() {
        return this._value;
    }
    // -------------------------------------------------------------------------
    get float() {
        return this._value;
    }
    // -------------------------------------------------------------------------
    get string() {
        return this._value;
    }
}


/***/ }),

/***/ "./src/Spriter/Structure/Varline.ts":
/*!******************************************!*\
  !*** ./src/Spriter/Structure/Varline.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Varline": () => (/* binding */ Varline)
/* harmony export */ });
/* harmony import */ var _Baseline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Baseline */ "./src/Spriter/Structure/Baseline.ts");

class Varline extends _Baseline__WEBPACK_IMPORTED_MODULE_0__.Baseline {
    // -------------------------------------------------------------------------
    constructor(id, varDefId) {
        super(id, null);
        this._varDefId = varDefId;
        this.type = _Baseline__WEBPACK_IMPORTED_MODULE_0__.eTimelineType.VAR_LINE;
    }
    // -------------------------------------------------------------------------
    get varDefId() {
        return this._varDefId;
    }
}


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/Spriter/index.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Loader": () => (/* reexport safe */ _Loader_Loader__WEBPACK_IMPORTED_MODULE_2__.Loader),
/* harmony export */   "Spriter": () => (/* reexport safe */ _Spriter__WEBPACK_IMPORTED_MODULE_0__.Spriter),
/* harmony export */   "SpriterFile": () => (/* reexport safe */ _Loader_SpriterFile__WEBPACK_IMPORTED_MODULE_3__.SpriterFile),
/* harmony export */   "SpriterGroup": () => (/* reexport safe */ _SpriterGroup__WEBPACK_IMPORTED_MODULE_1__.SpriterGroup),
/* harmony export */   "SpriterJSON": () => (/* reexport safe */ _Loader_SpriterJSON__WEBPACK_IMPORTED_MODULE_4__.SpriterJSON),
/* harmony export */   "SpriterXml": () => (/* reexport safe */ _Loader_SpriterXml__WEBPACK_IMPORTED_MODULE_5__.SpriterXml),
/* harmony export */   "eFileType": () => (/* reexport safe */ _Loader_SpriterFile__WEBPACK_IMPORTED_MODULE_3__.eFileType),
/* harmony export */   "eImageNameType": () => (/* reexport safe */ _Loader_SpriterFile__WEBPACK_IMPORTED_MODULE_3__.eImageNameType)
/* harmony export */ });
/* harmony import */ var _Spriter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Spriter */ "./src/Spriter/Spriter.ts");
/* harmony import */ var _SpriterGroup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpriterGroup */ "./src/Spriter/SpriterGroup.ts");
/* harmony import */ var _Loader_Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Loader/Loader */ "./src/Spriter/Loader/Loader.ts");
/* harmony import */ var _Loader_SpriterFile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Loader/SpriterFile */ "./src/Spriter/Loader/SpriterFile.ts");
/* harmony import */ var _Loader_SpriterJSON__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Loader/SpriterJSON */ "./src/Spriter/Loader/SpriterJSON.ts");
/* harmony import */ var _Loader_SpriterXml__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Loader/SpriterXml */ "./src/Spriter/Loader/SpriterXml.ts");






//export * from "./Loader/SpriterBin";

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=spriter.js.map