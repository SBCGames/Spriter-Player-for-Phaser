import { Game } from "./Game";

export class Global {
    // game derived from Phaser.Game
    static game: Game = null;

    // game size
    static GAME_WIDTH: number = 640;
    static GAME_HEIGHT: number = 640;

    // assets path
    static assetsPath: string = "assets/";
}

// -------------------------------------------------------------------------
window.onload = () => {
    Global.game = new Game();
};

