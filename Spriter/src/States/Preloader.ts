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

            //this.load.atlas("Hero", path + "Atlas.png", path + "Atlas.json");

            //this.load.xml("HeroDataXml", path + "Hero.xml");
            //this.load.json("HeroDataJSON", path + "Hero.json");

            //this.load.binary("HeroDataBin", path + "Hero.bin", this.onBinaryLoaded, this);


            // test
            this.load.atlas("TEST", path + "Atlas.png", path + "Atlas.json");
            this.load.xml("TESTXml", path + "TEST.xml");
            this.load.json("TESTJson", path + "TEST.json");
        }

        // -------------------------------------------------------------------------
        public onBinaryLoaded(key: string, data: ArrayBuffer) {
            return data;
        }

        // -------------------------------------------------------------------------
        create() {
            this.game.state.start("Test");
        }
    }
}
