module Spriter {

    export interface ISpriterGroupListener {
        onAnimationFinished(aSpriterGroup: SpriterGroup): void;
    }
}
