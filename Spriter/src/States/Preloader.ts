/// <reference path="../../lib/phaser.d.ts" />
module SpriterExample {
    export class Preloader extends Phaser.State {

        // -------------------------------------------------------------------------
        constructor() {
            super();
        }

        // -------------------------------------------------------------------------
        preload() {
            // load assets
            var path: string = Global.assetsPath;

            this.load.atlas("Hero", path + "Atlas.png", path + "Atlas.json");

            this.load.xml("HeroDataXml", path + "Hero.xml");
            this.load.json("HeroDataJSON", path + "Hero.json");

            this.load.binary("HeroDataBin", path + "Hero.bin", this.onBinaryLoaded, this);
        }

        // -------------------------------------------------------------------------
        public onBinaryLoaded(aKey: string, aData: ArrayBuffer) {
            return aData;
        }

        // -------------------------------------------------------------------------
        create() {
            this.game.state.start("Test");
        }
    }
}
