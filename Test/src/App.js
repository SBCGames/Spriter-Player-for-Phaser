var SpriterExample;
(function (SpriterExample) {
    var Global = (function () {
        function Global() {
        }
        Global.game = null;
        Global.GAME_WIDTH = 640;
        Global.GAME_HEIGHT = 640;
        Global.assetsPath = "assets/";
        return Global;
    }());
    SpriterExample.Global = Global;
})(SpriterExample || (SpriterExample = {}));
var PhaserGlobal = {
    stopFocus: true
};
window.onload = function () {
    SpriterExample.Global.game = new SpriterExample.Game();
};
