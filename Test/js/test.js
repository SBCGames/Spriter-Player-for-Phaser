(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Game", [], factory);
	else if(typeof exports === 'object')
		exports["Game"] = factory();
	else
		root["Game"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.ts":
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Global = void 0;
var Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
var Global = /** @class */ (function () {
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
}());
exports.Global = Global;
// -------------------------------------------------------------------------
window.onload = function () {
    Global.game = new Game_1.Game();
};


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
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
exports.Game = void 0;
var App_1 = __webpack_require__(/*! ./App */ "./src/App.ts");
var Boot_1 = __webpack_require__(/*! ./States/Boot */ "./src/States/Boot.ts");
var Preloader_1 = __webpack_require__(/*! ./States/Preloader */ "./src/States/Preloader.ts");
var Test_1 = __webpack_require__(/*! ./States/Test */ "./src/States/Test.ts");
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    // -------------------------------------------------------------------------
    function Game() {
        var _this = 
        // init game
        _super.call(this, App_1.Global.GAME_WIDTH, App_1.Global.GAME_HEIGHT, Phaser.AUTO, "content", null /* , transparent, antialias, physicsConfig */) || this;
        Game.game = _this;
        // states
        _this.state.add("Boot", Boot_1.Boot);
        _this.state.add("Preloader", Preloader_1.Preloader);
        _this.state.add("Test", Test_1.Test);
        // start
        _this.state.start("Boot");
        return _this;
    }
    return Game;
}(Phaser.Game));
exports.Game = Game;


/***/ }),

/***/ "./src/States/Boot.ts":
/*!****************************!*\
  !*** ./src/States/Boot.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports) {


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
exports.Boot = void 0;
var Boot = /** @class */ (function (_super) {
    __extends(Boot, _super);
    // -------------------------------------------------------------------------
    function Boot() {
        return _super.call(this) || this;
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
}(Phaser.State));
exports.Boot = Boot;


/***/ }),

/***/ "./src/States/Preloader.ts":
/*!*********************************!*\
  !*** ./src/States/Preloader.ts ***!
  \*********************************/
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
exports.Preloader = void 0;
var App_1 = __webpack_require__(/*! ./../App */ "./src/App.ts");
var Preloader = /** @class */ (function (_super) {
    __extends(Preloader, _super);
    // -------------------------------------------------------------------------
    function Preloader() {
        return _super.call(this) || this;
    }
    // -------------------------------------------------------------------------
    Preloader.prototype.preload = function () {
        // load assets
        var path = App_1.Global.assetsPath;
        //this.load.atlas("Hero", path + "Atlas.png", path + "Atlas.json");
        //this.load.xml("HeroDataXml", path + "Hero.xml");
        //this.load.json("HeroDataJSON", path + "Hero.json");
        //this.load.binary("HeroDataBin", path + "Hero.bin", this.onBinaryLoaded, this);
        // test
        this.load.atlas("TEST", path + "Atlas.png", path + "Atlas.json");
        this.load.xml("TESTXml", path + "TEST.xml");
        this.load.json("TESTJson", path + "TEST.json");
        // item (book) image
        this.load.image("Item", path + "Item.png");
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
}(Phaser.State));
exports.Preloader = Preloader;


/***/ }),

/***/ "./src/States/Test.ts":
/*!****************************!*\
  !*** ./src/States/Test.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports) {


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
exports.Test = void 0;
var Test = /** @class */ (function (_super) {
    __extends(Test, _super);
    // -------------------------------------------------------------------------
    function Test() {
        var _this = _super.call(this) || this;
        _this._text = "";
        return _this;
    }
    // -------------------------------------------------------------------------
    Test.prototype.create = function () {
        this.stage.backgroundColor = 0x527F68;
        // ===============================================================
        // HELP ITEM (book image)
        // ===============================================================
        this._item = new Phaser.Sprite(this.game, 0, 0, "Item");
        this._item.anchor.set(0.5, 0.95);
        this._item.exists = false;
        this.world.add(this._item);
        // ===============================================================
        // BASIC SETUP
        // ===============================================================
        // create Spriter loader - class that can change Spriter file into internal structure
        var spriterLoader = new Spriter.Loader();
        // create Spriter file object - it wraps XML/JSON loaded with Phaser Loader
        //var spriterFile = new Spriter.SpriterXml(this.cache.getXML("TESTXml"));
        var spriterFile = new Spriter.SpriterJSON(this.cache.getJSON("TESTJson"), /* optional parameters */ { imageNameType: Spriter.eImageNameType.NAME_ONLY });
        // proces Spriter file (XML/JSON) with Spriter loader - outputs Spriter animation which you can instantiate multiple times with SpriterGroup
        var spriterData = spriterLoader.load(spriterFile);
        // create actual renderable object - it is extension of Phaser.Group
        this._spriterGroup = new Spriter.SpriterGroup(this.game, spriterData, "TEST", "Hero", 0, 100);
        this._spriterGroup.position.setTo(420, 400);
        // adds SpriterGroup to Phaser.World to appear on screen
        this.world.add(this._spriterGroup);
        // ===============================================================
        // LISTENING TO SIGNALS
        // ===============================================================
        // Spriter animation can send info on when sounds, events, tags, variable - here we are listening to Phaser.Signals when animation variable is set
        this._spriterGroup.onVariableSet.add(function (spriter, variable) {
            this._text = variable.string;
        }, this);
        // add point update callback
        this._spriterGroup.onPointUpdated.add(function (spriter, pointObj) {
            if (this._item.exists) {
                var transformed = pointObj.transformed;
                // add SpriterGroups position and angle, bacause _item is in world space, but transformed values are in SpriterGroup local space
                this._item.position.set(spriter.x + transformed.x, spriter.y + transformed.y);
                // magic number 62.477 is initial angle of hand image in spriter animation. Compensate here to keep _item (book) more or less vertical
                // if _item was something like gun or sword, it would look good without this compensation
                this._item.angle = spriter.angle - 62.447 + transformed.angle;
            }
        }, this);
        // ===============================================================
        // REST OF THE EXAMPLE - change animations, change charmaps
        // ===============================================================
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
        // on C key cycle through all charmaps
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
        // on I key show / hide item attached to point
        key = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
        key.onDown.add(function () {
            this._item.exists = !this._item.exists;
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
        this.game.debug.text("Press I to show / hide attached item (book)", 50, 62, "rgb(255, 255, 255)");
        this.game.debug.text(this._text, 80, 232, "rgb(255, 255, 255)");
    };
    return Test;
}(Phaser.State));
exports.Test = Test;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/App.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=test.js.map