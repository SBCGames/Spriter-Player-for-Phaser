
export declare enum eVariableType {
    INT, FLOAT, STRING
}


export declare enum eImageNameType {
    NAME_ONLY,
    NAME_AND_EXTENSION,
    FULL_PATH_NO_EXTENSION,
    ORIGINAL
}


export declare interface IFileOptions {
    imageNameType?: eImageNameType;
    minDefs?: any;
}


export declare class Spriter {

}


export declare class Loader {
    load(file: SpriterFile): Spriter;
}


export declare abstract class SpriterFile {

}


export declare class SpriterJSON extends SpriterFile {
    constructor(JSONData: any, options?: IFileOptions);
}


export declare class SpriterXml extends SpriterFile {
    constructor(xmlData: XMLDocument, options?: IFileOptions);
}


export declare class SpriterBin extends SpriterFile {
    constructor(binData: ArrayBuffer);
}


export declare class SpriterGroup extends Phaser.Group {
    constructor(game: Phaser.Game, spriter: Spriter, texutreKey: string, entityName: string,
        animation?: string | number, animationSpeedPercent?: number);

    // onLoop(SpriterGroup);
    onLoop: Phaser.Signal;
    // onFinish(SpriterGroup);
    onFinish: Phaser.Signal;

    // onSound(SpriterGroup, string); // string for line name which equals soud name without extension
    onSound: Phaser.Signal;
    // onEvent(SpriterGroup, string); // string for line name which equals event name
    onEvent: Phaser.Signal;
    // onTagChange(SpriterGroup, string, boolean); // string for tag name, boolean for change (true = set / false = unset)
    onTagChange: Phaser.Signal;
    // onVariableSet(SpriterGroup, Variable); // Variable is Spriter variable def with access to value
    onVariableSet: Phaser.Signal;
    // onBoxUpdated(SpriterGroup, SpriterObject);
    onBoxUpdated: Phaser.Signal;
    // onPointUpdated(SpriterGroup, SpriterObject);
    onPointUpdated: Phaser.Signal;

    // get loaded Spriter structure
    spriter: Spriter;
    // get Spriter entity
    entity: Entity;
    // get stack of charmaps - used internally
    // charMapStack: CharMapStack;
    // is anim paused?
    paused: boolean;
    // number of animations for current entity
    animationsCount: number;
    // name of current animation
    currentAnimationName: string;

    // add charmap on top of charmap stacky by name
    pushCharMap(charMapName: string): void;
    // remove charmap from stack by name
    removeCharMap(charMapName: string): void;
    // remove all charmaps from charmap stack
    clearCharMaps(): void;
    // check if animation tag with given name is on or off
    isTagOn(tagName: string): boolean;
    // check if animation tag with given id is on or off
    isTagOnById(tagId: number): boolean;
    // get animation variable by name
    getVariable(varName: string): Variable;
    // get animation variable by id
    getVariableById(varId: number): Variable;
    // get Spriter object by name - Spriter object contain actual Phaser.Sprite
    getObject(objectName: string): SpriterObject;
    // set speed of animation in percent (default = 100)
    setAnimationSpeedPercent(animationSpeedPercent: number): void;
    // play animation by Spriter animation id
    playAnimationById(aAnimationId: number): void;
    // play animation by name
    playAnimationByName(aAnimationName: string): void;
    // call this on every frame to tick animation
    updateAnimation(): void;
}


export declare class Item {
    constructor(id: number, name: string);

    id(): number;
    name(): string;
}


export declare class Entity extends Item {

}


export declare class Variable extends Item {

    // get type of variable - see eVariableType
    type: eVariableType;
    // get vlaue of variable - use int, float, string for specific type
    value: string | number;
    // get integer value
    int(): number;
    // get float value
    float(): number;
    // get string value
    string(): string;
}


export declare class SpatialInfo {
    // position
    x: number;
    y: number;

    // scale
    scaleX: number;
    scaleY: number;

    // pivot (anchor)
    pivotX: number;
    pivotY: number;

    // alpha
    alpha: number;

    // angle
    angle: number;
}


export declare class SpriterBone {
    // name of bone / object
    name: string;
    // info on transformation
    transformed: SpatialInfo;
}


export declare class SpriterObject extends SpriterBone {
    sprite(): Phaser.Sprite;
}
