/// <reference path="../../lib/phaser.d.ts" />
module SpriterExample {
    export class Boot extends Phaser.State {

        // -------------------------------------------------------------------------
        constructor() {
            super();
        }

        // -------------------------------------------------------------------------
        init() {
            this.input.maxPointers = 1;
            // pause game when not focused
            this.stage.disableVisibilityChange = false;
        } 

        // -------------------------------------------------------------------------
        create() {
            this.game.state.start("Preloader", true, false);
        }
    }
}
