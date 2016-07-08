var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SpriterExample;
(function (SpriterExample) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.call(this);
        }
        Preloader.prototype.preload = function () {
            var path = SpriterExample.Global.assetsPath;
            this.load.atlas("TEST", path + "Atlas.png", path + "Atlas.json");
            this.load.xml("TESTXml", path + "TEST.xml");
            this.load.json("TESTJson", path + "TEST.json");
        };
        Preloader.prototype.onBinaryLoaded = function (key, data) {
            return data;
        };
        Preloader.prototype.create = function () {
            this.game.state.start("Test");
        };
        return Preloader;
    }(Phaser.State));
    SpriterExample.Preloader = Preloader;
})(SpriterExample || (SpriterExample = {}));
