var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    }());
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
            // init game
            _super.call(this, SpriterExample.Global.GAME_WIDTH, SpriterExample.Global.GAME_HEIGHT, Phaser.AUTO, "content", null /* , transparent, antialias, physicsConfig */);
            Game.game = this;
            // states
            this.state.add("Boot", SpriterExample.Boot);
            this.state.add("Preloader", SpriterExample.Preloader);
            this.state.add("Test", SpriterExample.Test);
            // start
            this.state.start("Boot");
        }
        return Game;
    }(Phaser.Game));
    SpriterExample.Game = Game;
})(SpriterExample || (SpriterExample = {}));
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
    }(Phaser.State));
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
    SpriterExample.Test = Test;
})(SpriterExample || (SpriterExample = {}));
//# sourceMappingURL=test.js.map