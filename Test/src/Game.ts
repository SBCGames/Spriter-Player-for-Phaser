import { Global } from "./App";
import { Boot } from "./States/Boot";
import { Preloader } from "./States/Preloader";
import { Test } from "./States/Test";

export class Game extends Phaser.Game {
    public static game: Phaser.Game;

    // -------------------------------------------------------------------------
    constructor() {
        // init game
        super(Global.GAME_WIDTH, Global.GAME_HEIGHT, Phaser.AUTO, "content", null /* , transparent, antialias, physicsConfig */);

        Game.game = this;

        // states
        this.state.add("Boot", Boot);
        this.state.add("Preloader", Preloader);
        this.state.add("Test", Test);

        // start
        this.state.start("Boot");
    }
}
